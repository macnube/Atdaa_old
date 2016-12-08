import React, { Component } from 'react'
import api from '../../Utils/api'
import Login from './Login'

class LoginContainer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			user: null,
			email: '',
			password: '',
			isLoading: false,
			error: '',
		}
	}

	handleLogIn() {
		console.log("Handling Log In");
		this.setState({
			isLoading: true
		})
		api.signIn(this.state.email, this.state.password)
			.then((data) => {
				console.log('data from signIn', data);
				var userInfo = {
					id: data.user.uid,
					email: data.user.email,
				};
				api.getFirebaseUserPlaces(userInfo.id)
					.then( (snapshot) => {
						if (snapshot.value) {
							console.log('snapshot value from snapshot', snapshot.value)
							userInfo = {
								...userInfo,
								myPlaces: {...snapshot.value.myPlaces}
							}
						} else {
							console.log('no data on server')
						}
						console.log("UserInfo before local write", userInfo);
						api.setLocalUserInfo(userInfo)
						this.props.setUserInfo(userInfo);
						this.setState({
							isLoading: false
						});
						this.props.toDashboard();
					})
					.catch( (error) => {
						console.log("error fetching data from server", error);
					})
				
			})
			.catch((error) => {
				this.setState({
					error: error.message,
					isLoading: false
				})
			})
	}

	onFacebookLogin(data) {
		console.log("LOGGING IN WITH FACEBOOK");
		this.setState({
			isLoading: true,
		})
		let token = data.credentials.token
		api.signInFacebook(token)
			.then( (user) => {
				console.log('user from firestack', user);
				const userInfo = {
					id: user.uid,
					email: user.email,
				}
				api.setLocalUserInfo(userInfo)
				this.props.setUserInfo(userInfo);
				this.setState({
					isLoading: false
				});
				this.props.toDashboard();
			})
			.catch( (error) => {
				console.log("Facebook login failed with", error);
				this.setState({
					isLoading: false,
					error: error.description
				})
			})
	}

	onFacebookLogout() {
  	console.log("logout successful");
	}

	render() {
		return (
			<Login
				email={this.state.email}
				password={this.state.password}
				error={this.state.error}
				isLoading={this.state.isLoading}
				setEmail={(email) => this.setState({email: email})}
				setPass={(password) => this.setState({password: password})}
				handleLogIn={this.handleLogIn.bind(this)}
				onFacebookLogin={this.onFacebookLogin.bind(this)}
				onFacebookLogout={this.onFacebookLogout.bind(this)} />
		)
	}
}

export default LoginContainer
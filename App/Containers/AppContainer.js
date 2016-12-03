import React, { Component } from 'react';
import App from '../Components/App'
import dashboard from '../dashboard';
import SignUpContainer from './SignUpContainer';

const { DashboardContainer } = dashboard

class AppContainer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			email: '',
			pass: '',
			success: false,
			error: ''
		}
	}

	toSignUp() {
		this.props.navigator.push({
			title: "Create Account",
			component: SignUpContainer
		})
	}
	/*
	handleLogIn() {
		this.setState({
			isLoading: true
		})
		/*
		api.signIn(this.state.email, this.state.password)
			.then((data) => {
				console.log(data);
				this.setState({
					isLoading: false
				});
				this.props.navigator.push({
					title: "SatisFI",
					component: Dashboard
				})
			})
			.catch((error) => {
				this.setState({
					error: error.message,
					isLoading: false
				})
			})
		var userID = "SVNn7krFgqdsUw2g9OGK48Vgy0s2"
		this.props.navigator.push({
			title: "SatisFI",
			component: Dashboard,
			passProps: {userID}
		})
	
		
	}
	*/

	handleLogIn() {
		this.setState({isLoading: true})
		setTimeout( () => {
				this.setState({isLoading: false})
				//const userId = "SVNn7krFgqdsUw2g9OGK48Vgy0s2"
				//this.props.setUserInfo(userId, this.state.email)
				this.props.navigator.push({
				title: "SatisFI",
				component: DashboardContainer
			})
		}, 2000)
		
	}

	render() {
		console.log("These are the props into AppContainer", this.props);
		return (
			<App
				onLogIn={this.handleLogIn.bind(this)}
				toSignUp={this.toSignUp.bind(this)}
				setEmail={ (email) => this.setState({email: email}) }
				setPass={ (pass) => this.setState({pass: pass}) }
				{...this.state} />
		)
	}

}

export default AppContainer

import React, { Component } from 'react'
import api from '../../Utils/api'
import CreateEmail from './CreateEmail'
import { Keyboard } from 'react-native'
import dismissKeyboard from 'dismissKeyboard'

class CreateEmailContainer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			isLoading: false,
			error: '',
			keyboard: false,
		}
	}

	componentWillMount () {
		const keyboardOpen = () => {
			console.log("toggling Keyboard");
			this.setState({
				keyboard: true
			})
		}
		const keyboardClosed = () => {
			console.log("toggling Keyboard");
			this.setState({
				keyboard: false
			})
		}
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardOpen);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardClosed);
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

	handleCreateUser() {
		console.log("Handling Create User");
		dismissKeyboard();
		this.setState({
			isLoading: true
		})
		api.createUser(this.state.email, this.state.password)
			.then((data) => {
				console.log('data from signIn', data);
				const userInfo = {
					id: data.uid,
					email: data.email,
				};
				api.setLocalUserInfo(userInfo)
				this.props.setUserInfo(userInfo);
				this.setState({
					isLoading: false
				});
				this.props.toDashboard();
			})
			.catch((error) => {
				console.log("error frm CreateEmail", error);
				this.setState({
					error: error.description,
					isLoading: false
				})
			})
	}

	render() {
		return (
			<CreateEmail
				email={this.state.email}
				password={this.state.password}
				error={this.state.error}
				isLoading={this.state.isLoading}
				setEmail={(email) => this.setState({email: email})}
				setPass={(password) => this.setState({password: password})}
				handleCreateUser={this.handleCreateUser.bind(this)}
				keyboard={this.state.keyboard} />
		)
	}
}

export default CreateEmailContainer
import React, { Component } from 'react';

import AppContainer from './AppContainer';
import SignUp from '../Components/SignUp';
import api from '../Utils/api';

export default class SignUpContainer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			email: '',
			pass: '',
			confirm: '',
			success: false,
			error: ''
		}
	}

	handleSignUp() {
		this.setState({isLoading: true});
		const { email, pass, confirm } = this.state
		if (pass === confirm) {
			api.createUser(email, pass)
			.then(() => this.setState({success: true, isLoading: false}))
			.catch((error) => this.setState({error, isLoading: false}));
		} else {
			this.setState({error: "Passwords did not match", isLoading: false})
		}
	}

	handleBack() {
		this.props.navigator.push({
			title: "SatisFI",
			component: AppContainer
		})
	}

	render() {
		console.log("Props going into SignUpContainer", this.props); 
		return (
			<SignUp 
				onBack={this.handleBack.bind(this)}
				onSignUp={this.handleSignUp.bind(this)}
				setEmail={ (email) => this.setState({email: email}) }
				setPass={ (pass) => this.setState({pass: pass}) }
				setConfirm={ (confirm) => this.setState({confirm: confirm}) }
				{...this.state}/>
		)
	}
}
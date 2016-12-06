import React, { Component } from 'react'
import { connect } from 'react-redux';

import { setUserId } from '../actions'
import api from '../../Utils/api'
import Login from './Login'
import dashboard from '../../dashboard'

const { DashboardContainer } = dashboard

class LoginContainer extends Component {

	constructor(props) {
		super(props);
		this.state = {
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
				const userId = data.uid;
				this.props.setUserId(userId);
				this.setState({
					isLoading: false
				});
				this.props.navigator.push({
					title: "SatisFI",
					component: DashboardContainer,
					passProps: { userId }
				})
			})
			.catch((error) => {
				this.setState({
					error: error.message,
					isLoading: false
				})
			})
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
				handleLogIn={this.handleLogIn.bind(this)} />
		)
	}
}

export default connect(null, { setUserId })(LoginContainer);
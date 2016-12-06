import React, { Component } from 'react'
import { connect } from 'react-redux';

import { setUserInfo } from '../actions'
import api from '../../Utils/api'
import dashboard from '../../dashboard'
import CreateEmail from './CreateEmail'

const { DashboardContainer } = dashboard

class CreateEmailContainer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			isLoading: false,
			error: '',
		}
	}

	handleCreateUser() {
		console.log("Handling Create User");
		this.setState({
			isLoading: true
		})
		api.createUser(this.state.email, this.state.password)
			.then((data) => {
				console.log('data from signIn', data);
				const userInfo = {
					lastUpdated: new Date().getTime() / 1000,
					id: data.uid,
					email: data.email,
					myPlaces: null,
					toolbar: null
				};
				api.setLocalUserInfo(userInfo)
				this.props.setUserInfo(userInfo);
				this.setState({
					isLoading: false
				});
				this.props.navigator.push({
					title: "SatisFI",
					component: DashboardContainer
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
			<CreateEmail
				email={this.state.email}
				password={this.state.password}
				error={this.state.error}
				isLoading={this.state.isLoading}
				setEmail={(email) => this.setState({email: email})}
				setPass={(password) => this.setState({password: password})}
				handleCreateUser={this.handleCreateUser.bind(this)} />
		)
	}
}

export default connect(null, { setUserInfo })(CreateEmailContainer);
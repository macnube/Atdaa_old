import React, { Component } from 'react';
import { connect } from 'react-redux';


import { setUserInfo } from '../actions'
import api from '../../Utils/api'
import dashboard from '../../dashboard';
import LoginContainer from './LoginContainer'
import CreateAccount from './CreateAccount'
import CreateEmailContainer from './CreateEmailContainer'

import Splash from './Splash'

const { DashboardContainer } = dashboard


class SplashContainer extends Component {

	toLogIn() {
		this.props.navigator.push({
			title: "Login",
			component: LoginContainer
		})
	}

	toCreateAccount() {
		this.props.navigator.push({
			title: 'Sign Up',
			component: CreateAccount,
			passProps: { toCreateEmail: this.toCreateEmail.bind(this)}
		})
	}

	toCreateEmail() {
		this.props.navigator.push({
			title: 'Sign Up',
			component: CreateEmailContainer
		})
	}

	componentDidMount() {
		api.getLocalUserInfo()
			.then( (userInfo) => {
				if (userInfo) {
					console.log("This is user from SplashContainer", userInfo);
					this._onUser(userInfo);
				}
			})
			.catch( (error) => {
				console.log("Error", error);
			})
		
		
		/*
		getLocalUserInfo
		compareLocalInfo with firebase info
		if local is stale, update local
		if firebase is stale, update firebase
		set global store with most information
		go to dashboard
		*/
	}

	_onUser(info) {
		this.props.setUserInfo(info);
		this.props.navigator.push({
			title: 'Dashboard',
			component: DashboardContainer,
		})
	}
	/*
	componentDidMount() {
		api.getLocalUserInfo('localInfo')
		.then( (userData) => {
			if (userData) {
				userInfo = api.updateInfo(userData);
				setUserInfo(userInfo)
				this.props.navigator.push({
					title: "SatisFI",
					component: DashboardContainer,
				})
			}
		})
	}
	*/


	render() {
		return (
			<Splash 
				toLogIn={this.toLogIn.bind(this)}
				toCreateAccount={this.toCreateAccount.bind(this)}
				/>
		)
	}
}

export default connect(null, { setUserInfo })(SplashContainer);


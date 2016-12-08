import React, { Component } from 'react';
import { connect } from 'react-redux';


import { setUserInfo } from '../actions'
import api from '../../Utils/api'
import { getLatestPlaces } from '../../Utils/helpers'
import dashboard from '../../dashboard';
import LoginContainer from './LoginContainer'
import CreateAccountContainer from './CreateAccountContainer'
import CreateEmailContainer from './CreateEmailContainer'

import Splash from './Splash'


class SplashContainer extends Component {

	toLogIn() {
		this.props.navigator.push({
			title: "Login",
			component: LoginContainer,
			passProps: { 
				toDashboard: this.toDashboard.bind(this),
				setUserInfo: this.props.setUserInfo.bind(this)
			}
		})
	}

	toDashboard() {
		const { DashboardContainer } = dashboard
		this.props.navigator.push({
			title: 'Dashboard',
			component: DashboardContainer
		})
	}

	toCreateAccount() {
		this.props.navigator.push({
			title: 'Sign Up',
			component: CreateAccountContainer,
			passProps: { 
				toDashboard: this.toDashboard.bind(this),
				setUserInfo: this.props.setUserInfo.bind(this)
			}
		})
	}

	componentDidMount() {
		api.getLocalUserInfo()
			.then( (userInfo) => {
				if (userInfo) {
					console.log("This is user from SplashContainer", userInfo);
					api.getFirebaseUserPlaces(userInfo.id)
						.then( (snapshot) => {
							if (snapshot.value) {
								console.log("Info on server, checking which one is most recent");
								var places = getLatestPlaces(userInfo.myPlaces, snapshot.value)
								userInfo = {
									...userInfo,
									...places
								}
							}
							this.props.setUserInfo(userInfo);
							this.toDashboard()
						})
						.catch( (error) => {
							console.log("error getting server info", error);
							this.props.setUserInfo(userInfo);
							this.toDashboard()
						})
					
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


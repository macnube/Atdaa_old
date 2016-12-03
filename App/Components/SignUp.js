import React, { Component } from 'react';

import {
	View,
	Text,
	TextInput,
	StyleSheet, 
	TouchableHighlight,
	ActivityIndicator
} from 'react-native';

import App from './App';
import api from '../Utils/api';

const SignUp = (props) => {
	console.log("Props going into SignUp", props);
	const { email, pass, confirm, error, success, isLoading } = props;
	const emailPlaceholder = email ? "" : "Email";
	const passPlaceholder = pass ? "" : "Password";
	const confirmPlaceholder = confirm ? "" : "Confirm Password";
	var showSuccess;
	if (success || error) {
		const text = success ? "User Created! Go back to Login" : error
		showSuccess = <Text style={styles.resultText}>{text}</Text>
	} else {
		showSuccess = <View />
	}
	return (
		<View style={styles.mainContainer}>
			<Text style={styles.title}> Create Account </Text>
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.emailInput}
					value={email}
					placeholder= {emailPlaceholder}
					placeholderTextColor="white"
					onChangeText={ (email) => props.setEmail(email)} />
			</View>
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.passwordInput}
					value={pass}
					secureTextEntry={true}
					placeholder={passPlaceholder}
					placeholderTextColor="white"
					onChangeText={ (pass) => props.setPass(pass)} />
			</View>
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.passwordInput}
					value={confirm}
					secureTextEntry={true}
					placeholder={confirmPlaceholder}
					placeholderTextColor="white"
					onChangeText={ (confirm) => props.setConfirm(confirm)} />
			</View>
			<TouchableHighlight
				style={styles.button}
				onPress={props.onSignUp}>
				<Text style={styles.buttonText}>Submit</Text>
			</TouchableHighlight>
			<TouchableHighlight
				style={styles.signupButton}
				onPress={props.onBack}>
				<Text style={styles.signupButtonText}>Already have an account?</Text>
			</TouchableHighlight>
			<ActivityIndicator
				animating={isLoading}
				color="white"
				size="large" />
			{showSuccess}
		</View>

	)
}

export default SignUp;

var styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		padding: 30,
		flexDirection: 'column',
		marginTop: 40,
		justifyContent: 'center',
		backgroundColor: '#292E37'
	},
	emailInput: {
		height: 50,
		padding: 4,
		marginRight: 5,
		fontSize: 23,
		color: "white",
	},
	passwordInput: {
		height: 50,
		padding: 4,
		marginRight: 5,
		fontSize: 23,
		color: "white",
		borderBottomWidth: 1,
		borderBottomColor: 'white'
	},
	inputContainer: {
		borderBottomWidth: 1,
		borderBottomColor: 'white'
	},
	title: {
		marginBottom: 20,
		fontSize: 35,
		textAlign: 'center',
		color: 'white'
	},
	button: {
		height: 40,
		backgroundColor: 'blue',
		borderColor: 'white',
		borderWidth: 1,
		borderRadius: 5,
		marginBottom: 50,
		marginTop: 10,
		alignSelf: 'stretch',
		justifyContent: 'center'
	},
	buttonText: {
		fontSize: 20,
		color: 'white',
		alignSelf: 'center'
	},
	signupButton: {
		height: 30,
		justifyContent: 'center',
		marginTop: 10,
		alignSelf: 'center'
	},
	signupButtonText: {
		color: 'white',
		fontSize: 15,
	},
	resultText: {
		color: 'white',
		fontSize: 20,
		alignSelf: 'center'
	}

})
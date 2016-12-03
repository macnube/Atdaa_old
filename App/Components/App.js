import React, { Component } from 'react';

import {
	View,
	Text,
	TextInput,
	TouchableHighlight,
	StyleSheet,
	ActivityIndicator,
} from 'react-native'

const App = (props) => {
	console.log("These are props going into App", props);
	const { email, password, isLoading } = props
	const emailPlaceholder = email ? "" : "Email"
	const passwordPlaceholder = password ? "" : "Password"
	return (
		<View style={styles.mainContainer}>
				<Text style={styles.title}> SatisFI </Text>
				<View style={styles.inputContainer}>
					<TextInput
						style={styles.emailInput}
						value={email}
						placeholder={emailPlaceholder}
						placeholderTextColor="white"
						onChangeText={(text) => props.setEmail(text)} />
				</View>
				<View style={styles.inputContainer}>
					<TextInput
						style={styles.passwordInput}
						value={password}
						secureTextEntry={true}
						placeholder={passwordPlaceholder}
						placeholderTextColor="white"
						onChangeText={(text) => props.setPass(text)} />
				</View>
				<TouchableHighlight
					style={styles.button}
					onPress={props.onLogIn}>
					<Text style={styles.buttonText}>Log In</Text>
				</TouchableHighlight>

				<TouchableHighlight
					style={styles.signupButton}
					onPress={props.toSignUp}>
					<Text style={styles.signupButtonText}>New here?</Text>
				</TouchableHighlight>

				<ActivityIndicator
					animating={isLoading}
					color="white"
					size="large" />
		</View>
	)
}

export default App;

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

/*
export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			email: '',
			emailPlaceholder: 'Email Address',
			password: '',
			passwordPlaceholder: 'Password',
			error: false
		}
	}
	
		
	}

	render() {
		var showErr = (
			this.state.error 
			? <Text style={styles.resultText}> {this.state.error} </Text> 
			: <View></View>

		);
		return (
			<View style={styles.mainContainer}>
				<Text style={styles.title}> SatisFI </Text>
				<View style={styles.inputContainer}>
					<TextInput
						style={styles.emailInput}
						value={this.state.email}
						placeholder= {this.state.emailPlaceholder}
						placeholderTextColor="white"
						onChangeText={(text) => this.setState({email: text})}
						onFocus={() => this.setState({emailPlaceholder: ''})} />
				</View>
				<View style={styles.inputContainer}>
					<TextInput
						style={styles.passwordInput}
						value={this.state.password}
						secureTextEntry={true}
						placeholder={this.state.passwordPlaceholder}
						placeholderTextColor="white"
						onChangeText={(text) => this.setState({password: text})}
						onFocus={() => this.setState({passwordPlaceholder: ''})} />
				</View>
				<TouchableHighlight
					style={styles.button}
					onPress={this.handleLogIn.bind(this)}>
					<Text style={styles.buttonText}>Log In</Text>
				</TouchableHighlight>

				<TouchableHighlight
					style={styles.signupButton}
					onPress={this.goToSignUp.bind(this)}>
					<Text style={styles.signupButtonText}>New here?</Text>
				</TouchableHighlight>


				<ActivityIndicator
					animating={this.state.isLoading}
					color="white"
					size="large" />

				{showErr}

			</View>
		)
	}
}

*/
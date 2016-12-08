import React from 'react'

import {
	View, 
	Text,
	Image,
	TouchableOpacity,
	StyleSheet,
	ActivityIndicator,
	TextInput,
	KeyboardAvoidingView
} from 'react-native'

import * as colors from '../../resources/Colors'
import FacebookButton from './FacebookButton'
import Input from './Input'
import SubmitButton from './SubmitButton'

const Login = (props) => {
	const {email, password, setEmail, 
		setPass, isLoading, error, handleLogIn } = props;
	const buttonText = isLoading ? "Signing in..." : "Sign In"
	const containerPadding = props.keyboard ? 50 : 100
	const atdaaStyle = props.keyboard ? styles.atdaaOrangeSmall : styles.atdaaOrangeBig
	const loginTextTop = props.keyboard ? 15 : 0
	return (
		<KeyboardAvoidingView 
			style={[styles.container, {paddingVertical: containerPadding}]}
			behavior="padding">
			<Image source={{uri: 'atdaaOrangeLarge'}} resizeMode='contain' style={atdaaStyle} />
			<View style={styles.buttonContainer}>
				<View style={styles.textContainer}>
					<Text style={[styles.plainText, {top: loginTextTop}]}>Login</Text>
				</View>
				<FacebookButton 
					onLogin={props.onFacebookLogin}
					onLogout={props.onFacebookLogout} 
					user={null}
					isLoading={props.isLoading}/>
				<View style={styles.textContainer}>
					<Text style={styles.plainText}>OR</Text>
				</View>
				<Input
						value={email}
						imageURI='user'
						placeholder='Email'
						setText={props.setEmail} />
				<Input
						value={password}
						imageURI='lock'
						placeholder='Password'
						setText={props.setPass} />
				<SubmitButton 
					text={buttonText}
					active={props.email && props.password}
					handlePress={handleLogIn} />
				<Text style={styles.errorMessage}>{error}</Text>
			</View>
		</KeyboardAvoidingView>
	)
}

export default Login;

var styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-around'
	},
	atdaaOrangeBig: {
		width: 137,
		height: 56,
	},
	atdaaOrangeSmall: {
		width: 116,
		height: 48,
	},
	buttonContainer: {
		height: 320,
		marginTop: 30,
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	plainText: {
		fontSize: 14,
		color: 'rgb(155,155,155)',
		textAlign: 'center',
	},
	textContainer: {
		width: 219,
		height: 44,
		justifyContent: 'center',
		alignItems: 'center',
	},
	errorMessage: {
		color: 'red',
		fontSize: 16,
		marginTop: 20
	}

})
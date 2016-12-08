import React from 'react'

import {
	View, 
	Text,
	Image,
	TouchableOpacity,
	StyleSheet,
	ActivityIndicator,
	TextInput
} from 'react-native'

import * as colors from '../../resources/Colors'
import FacebookButton from './FacebookButton'
import Input from './Input'
import SubmitButton from './SubmitButton'

const Login = (props) => {
	const {email, password, setEmail, 
		setPass, isLoading, error, handleLogIn } = props;
	const buttonContainerHeight = isLoading ? 0 : 320
	return (
		<View style={styles.container}>
			<Image source={{uri: 'atdaaOrangeLarge'}} resizeMode='contain' style={styles.atdaaOrange} />
			<ActivityIndicator
					animating={isLoading}
					color="black"
					size="large" />
			<View style={[styles.buttonContainer, {height: buttonContainerHeight}]}>
				<View style={styles.textContainer}>
					<Text style={styles.plainText}>Login</Text>
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
					text="Sign In"
					active={props.email && props.password}
					handlePress={handleLogIn} />
				<Text style={styles.errorMessage}>{error}</Text>
			</View>
		</View>
	)
}

export default Login;

var styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},
	atdaaOrange: {
		marginTop: 100,
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
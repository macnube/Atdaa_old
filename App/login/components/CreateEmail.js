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
import Input from './Input'
import SubmitButton from './SubmitButton'

const CreateEmail = (props) => {
	const {email, password, setEmail, 
		setPass, isLoading, error, handleCreateUser } = props;
	const buttonText = isLoading ? "Creating..." : "Create Account"
	const containerPadding = props.keyboard ? 30 : 100
	const atdaaStyle = props.keyboard ? styles.atdaaOrangeSmall : styles.atdaaOrangeBig
	return (
		<KeyboardAvoidingView
			behavior='padding' 
			style={[styles.container, {paddingVertical: containerPadding}]}>
			<Image source={{uri: 'atdaaOrangeLarge'}} resizeMode='contain' style={atdaaStyle} />
			<View style={styles.buttonContainer}>
				<View style={styles.textContainer}>
					<Text style={styles.plainText}>Create Account</Text>
				</View>
				<Input
						value={email}
						imageURI='emailOutline'
						placeholder='E-mail'
						setText={props.setEmail} />
				<Input
						value={password}
						imageURI='lock'
						placeholder='Password'
						setText={props.setPass} />
				<SubmitButton 
					text={buttonText}
					active={props.email && props.password}
					handlePress={handleCreateUser} />
				<Text style={styles.errorMessage}>{error}</Text>
			</View>
			
		</KeyboardAvoidingView>
	)
}

export default CreateEmail;

var styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-around',
		alignItems: 'center',
		paddingVertical: 70,
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
		height: 240,
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
	},
	indicatorContainer: {
		height: 40
	}

})
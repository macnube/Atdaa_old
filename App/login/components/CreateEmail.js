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
import Input from './Input'
import SubmitButton from './SubmitButton'

const CreateEmail = (props) => {
	const {email, password, setEmail, 
		setPass, isLoading, error, handleCreateUser } = props;
	const buttonContainerHeight = isLoading ? 0 : 260
	return (
		<View style={styles.container}>
			<Image source={{uri: 'atdaaOrangeLarge'}} resizeMode='contain' style={styles.atdaaOrange} />
			<ActivityIndicator
					animating={isLoading}
					color="black"
					size="large" />
			<View style={[styles.buttonContainer, {height: buttonContainerHeight}]}>
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
					text="Create Account"
					active={props.email && props.password}
					handlePress={handleCreateUser} />
				<Text style={styles.errorMessage}>{error}</Text>
			</View>
		</View>
	)
}

export default CreateEmail;

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
		height: 260,
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
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


import FacebookButton from './FacebookButton'
import EmailButton from './EmailButton'


const CreateAccount = (props) => {
	return (
		<View style={styles.container}>
			<Image source={{uri: 'atdaaOrangeLarge'}} resizeMode='contain' style={styles.atdaaOrange} />
			<View style={styles.buttonContainer}>
				<View style={styles.textContainer}>
					<Text style={styles.plainText}>Create Account</Text>
				</View>
				<FacebookButton handlePress={() => console.log("Facebook button")}/>
				<View style={styles.textContainer}>
					<Text style={styles.plainText}>OR</Text>
				</View>
				<EmailButton handlePress={() => props.toCreateEmail()}/>
			</View>
		</View>
	)
}

export default CreateAccount;

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
		height: 200,
		marginTop: 50,
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

})
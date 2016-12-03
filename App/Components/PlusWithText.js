import React, { Component } from 'React';

import {
	View,
	Text,
	StyleSheet,
	TouchableHighlight,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons'

var styles = StyleSheet.create({
	plusIconSmall: {
		fontSize: 28,
		color: "white",
		alignSelf: 'center',
	},
	plusIconText: {
		color: 'white',
		textAlign: 'center',
		fontSize: 10,
		marginTop: -5
	}
})

const PlusWithText = (props) => {
	const { text, handlePress, style, height } = props;
	const iconContainerStyle = {
		position: "absolute",
		height: height,
		width: height,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#292E37',
		borderRadius: height / 2
	}	
	return (
		<TouchableHighlight
			style={[iconContainerStyle, style]}
			onPress={() => handlePress()}>
			<View>
				<Ionicons 
					name="md-add" style={styles.plusIconSmall}/>
				<Text style={styles.plusIconText}>{text}</Text>
			</View>
		</TouchableHighlight>
	)
}

export default PlusWithText;
import React from 'react'

import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableHighlight
} from 'react-native';

const FooterCancel = ({ handlePress }) => {

	return (
		<TouchableHighlight
			onPress={handlePress}>
			<Text style={styles.Text}>Cancel</Text>
		</TouchableHighlight>
	)
}

export default FooterCancel;

var styles = StyleSheet.create({
	text: {
		fontSize: 12,
	},
})
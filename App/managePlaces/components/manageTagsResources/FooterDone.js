import React from 'react'

import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableHighlight
} from 'react-native';

const FooterDone = ({ visible, handlePress }) => {
	return visible ?
		<TouchableHighlight
			onPress={handlePress}>
			<Text style={styles.Text}>Done</Text>
		</TouchableHighlight>
		: <Text style={styles.textGrey}>Done</Text>
}

export default FooterDone;

var styles = StyleSheet.create({
	text: {
		fontSize: 12,
	},
	textGrey: {
		fontSize: 14,
		color: 'grey'
	}
})
import React from 'react'

import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableHighlight
} from 'react-native';

const FooterAddMore = ({ visible, handlePress }) => {
	const addMore = visible ?
		<TouchableHighlight
			onPress={handlePress}>
			<View style={styles.textContainer}>
				<Text style={styles.Text}>Add More</Text>
			</View>
		</TouchableHighlight>
		: <View style={styles.addMorePlaceholder} />

	return addMore
}

export default FooterAddMore;

var styles = StyleSheet.create({
	text: {
		fontSize: 12,
		alignSelf: 'center',
	},
	textContainer: {
		width: 150,
		alignItems: "center",
	},
	addMorePlaceholder: {
		width: 150
	}
})
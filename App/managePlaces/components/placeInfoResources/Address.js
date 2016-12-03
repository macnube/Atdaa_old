import React from 'react'

import {
	View,
	Image,	
	Text,
	StyleSheet
} from 'react-native';

const Address = (props) => {
	return (
		<View style={styles.container}>
			<Image source={{uri: 'address'}} style={styles.image} />
			<Text style={styles.text} numberOfLines={1}>{props.address}</Text>
		</View>
	)
}

export default Address;

var styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginLeft: 32,
	},
	image: {
		width: 17,
		height: 20,
	},
	text: {
		fontSize: 12,
		marginLeft: 15,
	}
})
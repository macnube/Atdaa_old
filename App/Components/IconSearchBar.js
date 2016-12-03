import React, { Component } from 'React'

import {
	View,
	StyleSheet,
	Text,
	TextInput
} from 'react-native'

function IconSearchBar(props) {
	console.log("props going into IconSearchBar", props);
	return (
		<View style={props.style}>
			<TextInput
				style={styles.input}
				placeholder="Search..."
				placeholderTextColor="black"
				onChangeText={(text) => props.onTextChange(text)} 
			/>
		</View>
	)
}

module.exports = IconSearchBar;

var styles = StyleSheet.create({
	input: {
		height: 30,
		flex: 1,
		paddingHorizontal: 8,
		fontSize: 15,
		backgroundColor: "white",
		borderBottomWidth: 2,
		borderColor: "grey"
	}
});
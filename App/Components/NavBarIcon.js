import React, { Component } from 'react';

import {
	View,
	Text,
	StyleSheet,
	TouchableHighlight
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const NavBarIcon = (props) => {
	var iconStyle = props.selected 
		? {color: props.tintColor, textAlign: "center"} 
		: {color: props.unselectedTintColor, textAlign: "center"};
	var textColor = props.selected ? props.tintColor : props.unselectedTintColor;
	var icon = props.iconType === "FontAwesome" 
		? <FontAwesome style={iconStyle} size={props.height * .6} name={props.iconName} />
		: <Ionicons style={iconStyle} size={props.height * .6} name={props.iconName} />
	return (
		<TouchableHighlight 
			style={[styles.containerStyle, {height: props.height}]}
			onPress={props.onPress}>
			<View>
				{icon}
				<Text style={[styles.textStyle, {color: textColor}]}>{props.title}</Text>
			</View>
		</TouchableHighlight>
	)
}

NavBarIcon.propTypes = {
	title: React.PropTypes.string,
	iconName: React.PropTypes.string.isRequired,
	onPress: React.PropTypes.func.isRequired,
	selected: React.PropTypes.bool.isRequired,
	tintColor: React.PropTypes.string.isRequired,
	unselectedTintColor: React.PropTypes.string.isRequired,
	iconType: React.PropTypes.string.isRequired
}

NavBarIcon.defaultProps = {
	tintColor: "white",
	unselectedTintColor: "grey"
}

var styles = StyleSheet.create({
	container: {
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "transparent"
	},
	textStyle: {
		fontSize: 10,
		textAlign: 'center'
	}
})

export default NavBarIcon;
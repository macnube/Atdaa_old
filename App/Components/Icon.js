import React, { Component } from 'react';

import {
	View,
	Image,
	Animated
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

function Icon(props) {
	var panHandlers = props.panHandlers ? props.panHandlers : {};
		var styleTrash = {
			color: "black",
			fontSize: 50,
			backgroundColor: "transparent",
		}
		var styleContainer = {
			flex: 1,
			height: props.layoutInfo.icon.height,
			width: props.layoutInfo.icon.height,
			justifyContent: "center",
			alignItems: "center"
		}
	var icon = props.icon.name === "trash"
			? <Ionicons name="ios-trash-outline" style={styleTrash} />
			: <Animated.Image {...panHandlers} source={{uri: props.icon.imageURI}} style={[props.animatedStyle, props.style]}/>
	return(
		<View style={styleContainer}>
			{icon}
		</View>
	)
}

Icon.propTypes = {
	icon: React.PropTypes.object.isRequired,
	panHandlers: React.PropTypes.object,
	layoutInfo: React.PropTypes.object.isRequired,
}

Icon.defaultProps = {
	panHandlers: {}
}

module.exports = Icon;
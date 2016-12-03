import React, { Component } from 'react';

import {
	View,
	Image,
	Animated,
	TouchableWithoutFeedback,
	StyleSheet
} from 'react-native';

import * as colors from '../resources/Colors'

function Icon(props) {
	var panHandlers = props.panHandlers || {};
	const size = {
		height: props.style.height,
		width: props.style.height,
	}
	const shadow = props.shadow && props.icon.id !== 'trash' ? 
		{
		shadowColor: props.selected ? colors.activeIcon : 'rgb(0,0,0)',
		shadowOffset: {width: 0, height: 2},
		shadowRadius: 2,
		shadowOpacity: .5,
		borderRadius: 50
		} : {}
	var icon = props.icon.id === "trash"
			? <View style={[styles.trashContainer, size]}><Image source={{uri: 'trash'}} style={{flex: 1}} resizeMode='contain' /></View>
			: <Image  source={{uri: props.icon.imageURI}} resizeMode='contain' style={{flex: 1}}/>
	return(
		<Animated.View {...panHandlers} style={[props.animatedStyle, size, shadow]}>
				{icon}
		</Animated.View>
	)
}

Icon.propTypes = {
	icon: React.PropTypes.object.isRequired,
	panHandlers: React.PropTypes.object,
}

Icon.defaultProps = {
	panHandlers: {},
	shadow: false,
	handlePress: null
}

var styles = StyleSheet.create({
	trashContainer: {
		padding: 5,
	},
})

module.exports = Icon;
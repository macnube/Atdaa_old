import React, { Component } from 'React';

import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';

const GPSButton = (props) => {
	const style = {
		bottom: props.layoutInfo.toolbar.height - 10,
		left: props.layoutInfo.dropZones[4].xmin, 
		height: props.layoutInfo.icon.height,
		width: props.layoutInfo.icon.height,
		borderRadius: props.layoutInfo.icon.height / 2,
	}

	return (
		<TouchableOpacity 
			style={[styles.container, style]} 
			onPress={() => props.getLocation()}/>
	)
}

export default GPSButton;

var styles = StyleSheet.create({
	container: {
		position: 'absolute',
		backgroundColor: 'red'
	}
})
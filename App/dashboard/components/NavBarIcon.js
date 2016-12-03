import React, { Component } from 'react';

import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableWithoutFeedback
} from 'react-native';

import * as colors from '../../resources/Colors'

const NavBarIcon = (props) => {

	var iconURI = props.selected ? props.imageURI : props.imageURI + 'Inactive'
	return (
		<TouchableWithoutFeedback 
			onPress={props.onPress}>
			<View style={styles.container}>
				<Image style={{flex: 1}} source={{uri: iconURI}}  resizeMode='contain'/>
			</View>
		</TouchableWithoutFeedback>
	)
}

NavBarIcon.propTypes = {
	imageURI: React.PropTypes.string.isRequired,
	onPress: React.PropTypes.func.isRequired,
	selected: React.PropTypes.bool.isRequired,
}

var styles = StyleSheet.create({
	container: {
		height: 20,
		width: 50,
		marginTop: 15,
	},
})

export default NavBarIcon;
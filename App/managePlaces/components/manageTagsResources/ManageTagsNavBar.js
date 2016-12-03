import React, { Component } from 'React'

import {
	Image,
	View,
	StyleSheet,
	TouchableHighlight,
	TextInput
} from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import * as colors from '../../../resources/Colors'


const ManageTagsNavBar = ({ categoryIcon, width, handlePress }) => {
	const backgroundColor = categoryIcon ? colors.lightMustard : 'rgb(255,255,255)'
	const shadow = {
		shadowColor: colors.navBoxShadowColor,
		shadowOffset: {width: 0, height: 2},
		shadowRadius: 4,
		shadowOpacity: .5,
	}
	const extraStyle= categoryIcon ? 
		{width: width, backgroundColor: backgroundColor} : 
		{width: width, ...shadow, backgroundColor: backgroundColor, marginBottom: 30};
	const iconColor = categoryIcon ? 'white' : 'rgb(74,74,74)'
	const atdaaURI = categoryIcon ? 'atdaaWhite' : 'atdaa'
	return (
		<View style={[styles.navBar, extraStyle]}>
			<TouchableHighlight
				onPress={() => handlePress()}>
				<View style={styles.nav}>
					<Ionicons style={{color: iconColor}} size={24} name={"md-arrow-back"} />
				</View>
			</TouchableHighlight>
			<Image source={{uri: atdaaURI}} style={styles.atdaa} />
			<TouchableHighlight>
				<View style={styles.nav}>
					<Ionicons style={{color: iconColor}} size={24} name={"ios-search"} />
				</View>
			</TouchableHighlight>
		</View>
	)
}

export default ManageTagsNavBar

var styles = StyleSheet.create({
	navBar: {
		height: 66,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
	},
	atdaa: {
		height: 24,
		width: 58
	},
	nav: {
		marginTop: 15,
		width: 60,
		alignItems: 'center',
	}
});
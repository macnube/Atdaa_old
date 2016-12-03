import React, { Component } from 'React'

import {
	View,
	StyleSheet,
	Text,
} from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import * as colors from '../../../resources/Colors'

import Icon from '../../../shared/Icon';
import ManageTagsNavBar from './ManageTagsNavBar';


const HeaderTags = ({ layoutInfo, icon, onBack }) => {
	const iconStyle = {
		height: layoutInfo.searchIcon.height,
		width: layoutInfo.searchIcon.height,
		alignSelf: 'center',
	}
	return (
		<View style={styles.container}>
			<ManageTagsNavBar 
				categoryIcon={icon}
				width={layoutInfo.toolbar.width}
				handlePress={onBack} />
			<View style={[styles.iconContainer, {height: layoutInfo.searchIcon.height * 1.4}]}>
				<Icon
					style={iconStyle}
					shadow={true}
					icon={icon}
					layoutInfo={layoutInfo} />
				<Text style={styles.iconText}>{icon.name}</Text>
			</View>
		</View>
	)
}

export default HeaderTags;

var styles = StyleSheet.create({
	container: {
		height: 100,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: colors.lightMustard,
		marginBottom: 70,
	},
	iconText: {
		fontSize: 14,
		color: 'rgb(74,74,74)',
		backgroundColor: 'transparent',
	},
	iconContainer: {
		top: 10,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-between',
	}
});
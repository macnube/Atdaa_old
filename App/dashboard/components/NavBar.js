import React, { Component } from 'react'

import {
	View,
	StyleSheet,
	Image

} from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import NavBarIcon from './NavBarIcon';

import * as colors from '../../resources/Colors'


const NavBar = ({ selectedTab, setSelectedTab, layoutInfo, isVisible }) => {
	const height = isVisible ? 66 : 0;
	return (
		<View
			style={[styles.navBar, {height: height}]}>
			<NavBarIcon
				imageURI="mapView"
				selected={selectedTab === "map"}
				onPress={ () => setSelectedTab("map")} />
			<Image source={{uri: 'atdaaOrange'}} style={styles.atdaa}/>
			<NavBarIcon
				imageURI="listView"
				selected={selectedTab === "iconSearch"}
				onPress={ () => console.log("Doing nothing")} />
		</View>
	)
}

NavBar.propTypes = {
	selectedTab: React.PropTypes.string.isRequired,
	setSelectedTab: React.PropTypes.func,
	layoutInfo: React.PropTypes.object.isRequired,
	isVisible: React.PropTypes.bool.isRequired
}

NavBar.defaultProps = {
	isVisible: true,
	selectedTab: 'map',
}

var styles = StyleSheet.create({
	navBar: {
		flexDirection: "row",
		justifyContent: 'space-around',
		alignItems: 'center',
		height: 66,
		backgroundColor: 'rgb(255,255,255)',
		shadowColor: colors.navBoxShadowColor,
		shadowOffset: {width: 0, height: 2},
		shadowRadius: 4,
		shadowOpacity: .5,			
	},
	atdaa: {
		height: 24,
		width: 58,
		marginTop: 15,
	}
})

export default NavBar;
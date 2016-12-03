import React, { Component } from 'react'

import {
	View,
	StyleSheet,

} from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import NavBarIcon from './NavBarIcon';

const NavBar = ({ selectedTab, setSelectedTab, layoutInfo }) => {
	return (
		<View
			style={[styles.navBar, {height: layoutInfo.navbar.height}]}>
			<NavBarIcon
				title="Map"
				iconName="md-globe"
				selected={selectedTab === "map"}
				iconType="Ionicons"
				onPress={ () => setSelectedTab("map")}
				/>
			<NavBarIcon
				title="Icon Search"
				iconName="ios-search"
				selected={selectedTab === "iconSearch"}
				iconType="Ionicons"
				onPress={ () => setSelectedTab("iconSearch")} />
		</View>
	)
}

NavBar.propTypes = {
	selectedTab: React.PropTypes.string.isRequired,
	setSelectedTab: React.PropTypes.func,
	layoutInfo: React.PropTypes.object.isRequired,
}

var styles = StyleSheet.create({
	navBar: {
		flexDirection: "row",
		justifyContent: 'space-around',
		alignItems: 'center',
		backgroundColor: "#292E37"
	}
})

export default NavBar;
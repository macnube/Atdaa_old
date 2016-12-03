import React, { Component } from 'React';

import {
	View,
	Text,
	TouchableOpacity,
	Image,
	StyleSheet,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import Add from './Add';
import OpenClose from './OpenClose';

/*
const SearchButton = (props) => {
	const { layoutInfo, searchButtonOpen, handleNavigate, selectedTab, handleOpenClose } = props;
	console.log("Props going into searchButton", props);

	function getContainerStyle() {
		var dropZones = layoutInfo.dropZones;
		return {
			position: 'absolute',
			top: dropZones[4].ymin,
			left: dropZones[4].xmin,
		}
	}
	const multiplier = searchButtonOpen ? -1 : 0
	return (
		<View
			style={getContainerStyle()}>
			<OpenClose
				style={{zIndex: 10}}
				height={layoutInfo.icon.height}
				handlePress={() => handleOpenClose() }
				selectedTab={selectedTab}
				searchButtonOpen={searchButtonOpen} />
			<Add
				style={{zIndex: 8, top: 80 * multiplier}}
				height={layoutInfo.icon.height}
				handlePress={() => handleNavigate("iconSearch")}
				type="Filter"
				searchButtonOpen={searchButtonOpen}
				selectedTab={selectedTab} />
			<Add
				style={{zIndex: 5, top: 160 * multiplier}}
				height={layoutInfo.icon.height}
				handlePress={() => handleNavigate("placeSearch")}
				type="Place"
				searchButtonOpen={searchButtonOpen}
				selectedTab={selectedTab} />
		</View>
	)
}
*/

const SearchButton = (props) => {
	const { layoutInfo, searchButtonOpen, handleNavigate, selectedTab, handleOpenClose } = props;
	const containerStyle = {
		position: 'absolute',
		top: layoutInfo.dropZones[4].ymin,
		left: layoutInfo.dropZones[4].xmin,
		borderRadius: layoutInfo.icon.height / 2,
		shadowColor: 'rgb(0,0,0)',
		shadowOffset: {width: 0, height: 2},
		shadowRadius: 2,
		shadowOpacity: .5,
	}
	var buttonURI = selectedTab === "iconSearch" ? 'closeButtonLight' : 'addPlace'
	var navigateTo = selectedTab === "iconSearch" ? 'map' : 'placeSearch'
	return (
		<TouchableOpacity
			style={containerStyle}
			activeOpacity={1}
			onPress={() => handleNavigate(navigateTo)}>
			<View style={{height: layoutInfo.icon.height, width: layoutInfo.icon.height}}>
				<Image source={{uri: buttonURI}} resizeMode='contain' style={{flex: 1}}/>
			</View>
		</TouchableOpacity>
	)
}
export default SearchButton;

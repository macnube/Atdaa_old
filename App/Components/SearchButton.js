import React, { Component } from 'React';

import {
	View,
	Text,
	StyleSheet,
	TouchableHighlight,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import PlusWithText from './PlusWithText';
import Plus from './Plus';

var styles = StyleSheet.create({
	plusIcon: {
		fontSize: 30,
		alignSelf: 'center',
		color: "white",
	},
	plusIconSmall: {
		fontSize: 28,
		color: "white",
		alignSelf: 'center',
	},
	plusIconText: {
		color: 'white',
		textAlign: 'center',
		fontSize: 10,
		marginTop: -5

	}
})

const SearchButton = (props) => {
	const { layoutInfo, open, setSelectedTab, togglePlus } = props;
	console.log("Props going into searchButton", props);

	function getContainerStyle() {
		var dropZones = layoutInfo.dropZones;
		return {
			position: 'absolute',
			top: dropZones[4].ymin,
			left: dropZones[4].xmin,
		}
	}
	const multiplier = open ? -1 : 0
	return (
		<View
			style={getContainerStyle()}>
			<Plus
				style={{zIndex: 10}}
				height={layoutInfo.icon.height}
				handlePress={() => togglePlus()}
				open={open} />
			<PlusWithText
				style={{zIndex: 8, top: 80 * multiplier}}
				height={layoutInfo.icon.height}
				handlePress={() => setSelectedTab("iconSearch")}
				text="Icon" />
			<PlusWithText
				style={{zIndex: 5, top: 160 * multiplier}}
				height={layoutInfo.icon.height}
				handlePress={() => setSelectedTab("placeSearch")}
				text="Place" />
		</View>
	)
}

export default SearchButton;
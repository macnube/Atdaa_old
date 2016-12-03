import React, { Component } from 'react'

import {
	View,
	StyleSheet,

} from 'react-native'

import MapView from 'react-native-maps';

import IconSearch from '../Containers/IconSearch';
import ProfileContainer from '../Containers/ProfileContainer';
import MapContainer from '../Containers/MapContainer';
import PlaceSearch from '../Components/PlaceSearch';
import POIcard from '../Components/POIcard';

var styles = StyleSheet.create({
	mainComponent: {
		flex: 1,
	},
	iconSearch: {
		flex: 1,
		backgroundColor: "#292E37",
		borderBottomWidth: 5,
		borderColor: "white",
	},
	map: {
		...StyleSheet.absoluteFillObject,
	},
	profile: {
		flex: 1,
		backgroundColor: "#292E37"
	}
})

function Main(props) {
	var component;
	console.log("props from Main", props);
	if (props.selectedTab === "iconSearch") {
		component =
			<IconSearch
				layoutInfo={props.layoutInfo}
				style={styles.iconSearch}
				scrollEnabled={props.searchScrollEnabled}
				{...props} />
	}
	else if (props.selectedTab === "map") {
		component =
			<MapContainer 
				style={styles.map}
				searchMarker={props.searchMarker}
				handleComponentChange={props.handleComponentChange}/>
	}
	else if (props.selectedTab === "placeSearch") {
		component =
			<PlaceSearch
				onPlaceSearch={props.handleComponentChange} />
	}
	else if (props.selectedTab === "POICard") {
		console.log("Rendering POI Card");
		component = 
			<POIcard
				marker={props.poiMarker} />
	}
	return (
		<View style={styles.mainComponent}>
			{component}
		</View>
	) 
}

Main.propTypes = {
	layoutInfo: React.PropTypes.object.isRequired,
	searchScrollEnabled: React.PropTypes.bool.isRequired,
	dashboard: React.PropTypes.object.isRequired,
	selectedTab: React.PropTypes.string.isRequired
}

module.exports = Main;


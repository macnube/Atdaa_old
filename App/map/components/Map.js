import React, { Component } from 'react';

import {
	View,
	TouchableHighlight,
	StyleSheet,
	Text, 
	TextInput,
	Dimensions,
	TouchableOpacity
} from 'react-native';

import MapView from 'react-native-maps';
import POICards from './POICards';
import MapMarker from './MapMarker'
import MapStyle from './MapStyle'
import GPSButton from './GPSButton'

const Map = (props) => {
	console.log("Props going into map", props);

	const renderPlaces = () => {
		return props.visiblePlaces.placeIds.map( (id, index) => {
			const place = props.visiblePlaces.places[id];
			const selected = place.place_id === props.POICardId
			console.log("rendering visible place", place);
			return (
				<MapView.Marker
					coordinate={place.latlng}
					key={index}
					onPress={() => props.handleSetPOIId(place.place_id)}>
					<MapMarker place={place} selected={selected} />
				</MapView.Marker>
			)
		})
	}
	const renderSearchMarker = () => {
  	var marker = props.searchMarker;
  	if (marker) {
  		return (
	  		<MapView.Marker
					coordinate={marker.latlng}
					title={marker.name}
					pinColor={"blue"}>
				</MapView.Marker>
			)
  	}
  }

  const renderPOI = () => {
  	if (props.POICardId) {
  		return (
  			<POICards 
  				POICardId={props.POICardId} 
  				visiblePlaces={props.visiblePlaces}
  				setPOIId={props.handleSetPOIId}
  				setPlaceInfo={props.setPlaceInfo}
  				region={props.region}/>
			)
  	} else return <View />
  }

  const renderGPS = () => {
  	if (props.showGPS) {
  		return (
  			<GPSButton 
  				getLocation={props.getLocation} 
  				layoutInfo={props.layoutInfo} />
			)
  	} else {
  		return <View />
  	}
  }

	return (
		<View style={{flex: 1}}>
			{renderPOI()}
			<MapView
				provider={"google"}
				style={styles.map}
				region={props.region}
				onRegionChangeComplete={props.handleRegionChange}
				loadingEnabled={true}
				showsUserLocation={true}
				showsPointsOfInterest={false}>
				{renderPlaces()}
				{renderSearchMarker()}
			</MapView>
			{renderGPS()}
		</View>
	)
}

export default Map;

var styles = StyleSheet.create({
	addButton: {
		position: "absolute",
		bottom: 0,
		width: 50,
		height: 20,
		backgroundColor: "#292E37",
		borderTopLeftRadius: 5,
		borderTopRightRadius: 5,
		zIndex: 10
	},
	map: {
		...StyleSheet.absoluteFillObject,
	},
	buttonText: {
		color: "white",
		fontSize: 13,
		textAlign: "center",
	},
	searchContainer: {
		position: "absolute",
		flexDirection: "row",
		width: 200,
		height: 40,
		alignItems: "center",
		backgroundColor: "rgba(41,46,55,.7)",
		borderRadius: 5
	},
	input: {
		height: 30,
		flex: 1,
		paddingHorizontal: 8,
		fontSize: 15,
		color: "white",
	},
	searchButton: {
		borderWidth: 2,
		borderColor: "white",
		backgroundColor: "transparent"
	},
	searchButtonText: {
		color: "white",
		padding: 10
	},
	callout: {
		width: 140,
	},
	calloutText: {
		color: "white"
	},
	moreInfoButton: {
		backgroundColor: "transparent",
	},
	moreInfoText: {
		color: "blue",
		padding: 5
	},
	POIcard: {
		height: 250,
		flexDirection: "column",
		backgroundColor: "#292E37",
		alignItems: "center",
		justifyContent: "space-between",
		zIndex: 100
	}
})	
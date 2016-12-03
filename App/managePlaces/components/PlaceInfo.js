import React from 'react';

import {
	View,
	Image,
	Text,
	StyleSheet,
} from 'react-native';

import PlaceDetails from './placeInfoResources/PlaceDetails'
import PlaceInfoNavBar from './placeInfoResources/PlaceInfoNavBar'
import PlaceTagsContainer from './PlaceTagsContainer'
import map from '../../map'
import { getPrimaryIcon } from '../../Utils/helpers'

const { MapContainer } = map;

const PlaceInfo = (props) => {
	console.log("Props in PlaceInfo", props);
	var bottom;
	var icon;
	if (props.placeInfo.isNew) {
		icon = {id:'addTagLight', imageURI: 'addTagLight'}
		bottom = (
			<View style={styles.mapContainer}>
				<MapContainer showGPS={false} searchMarker={props.placeInfo} />
			</View>
		)
	} else {
		icon = props.placeInfo.primaryIcon
		bottom = <PlaceTagsContainer place={props.placeInfo}/>
	}
	const placeImage = props.placeInfo.photoURI ? 
		<Image style={styles.imageContainer} source={{uri: props.placeInfo.photoURI}}/> :
		<View style={[styles.imageContainer, {backgroundColor: 'black'}]} />
	return (	
		<View style={styles.container}>
			<PlaceInfoNavBar handleToMap={props.handleToMap}/>
			{placeImage}
			<PlaceDetails 
				placeInfo={props.placeInfo} 
				distance={props.distance}
				hours={props.hours}
				icon={icon}
				handleAddTag={props.handleAddTag}/>
			{bottom}
		</View>
	)
}

export default PlaceInfo;

PlaceInfo.propTypes = {
	placeInfo: React.PropTypes.object.isRequired,
	handleToMap: React.PropTypes.func.isRequired,
	handleAddTag: React.PropTypes.func.isRequired,
}

var styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'stretch',
		backgroundColor: 'rgb(250,250,250)'
	},
	imageContainer: {
		height: 180,
	},
	mapContainer: {
		flex: 1,
	}
})
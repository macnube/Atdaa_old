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

import CustomCallout from '../Components/CustomCallout';
import POIcard from '../Components/POIcard';

import api from '../Utils/api';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 34.6037;
const LONGITUDE = 58.3816;
const LATITUDE_DELTA = 0.2;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class MapContainer extends Component {
	constructor(props) {
		super(props);
		this.watchID = (null: ?number);
		this._lastRegion = null;
		this._imageURI = null;
		this.state = {
			region: {
	      latitude: LATITUDE,
	      longitude: LONGITUDE,
	      latitudeDelta: LATITUDE_DELTA,
	      longitudeDelta: LONGITUDE_DELTA,
			},
			markers: [],
			showCard: false,
			haveImageURI: false
		}
	}

	componentDidMount() {
		var geo = navigator.geolocation;
		console.log("Mounting map again");
		if (this.props.searchMarker) {
			this.setState({
      	region: {
	        latitude: this.props.searchMarker.latlng.lat,
	        longitude: this.props.searchMarker.latlng.lng,
	        latitudeDelta: LATITUDE_DELTA / 5,
	        longitudeDelta: LONGITUDE_DELTA / 5,
      	}
    	})
		} else {
			geo.getCurrentPosition(
	      (position) => {
		      console.log(position);
		      this.setState({
		      	region: {
			        latitude: position.coords.latitude,
			        longitude: position.coords.longitude,
			        latitudeDelta: LATITUDE_DELTA,
			        longitudeDelta: LONGITUDE_DELTA,
		      	}
		    	});
	      }
	    );
		}
	}

	componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  saveRegion(event) {
  	var lastRegion = this._lastRegion || this.state.region;
  	this.setState({
  		searchPlace: true,
  		region: lastRegion
  	})
  }

  onRegionChange(region) {
  	this._lastRegion = region;
  }

  renderSearchMarker() {
  	var marker = this.props.searchMarker;
  	console.log("marker from renderSearchMarker", marker);
  	if (marker) {
  		return (
	  		<MapView.Marker
					coordinate={{latitude: marker.latlng.lat, longitude: marker.latlng.lng}}
					title={marker.name}
					pinColor={"blue"}>
					<MapView.Callout 
						tooltip 
						style={styles.callout}
						onPress={() => {this.props.handleComponentChange("POICard", null, marker)}}>
						<CustomCallout {...marker}>
							<View>
								<Text style={styles.calloutText}>{marker.name}</Text>
							</View>
						</CustomCallout>
					</MapView.Callout>
				</MapView.Marker>
			)
  	}
  }

  renderMarkers() {
  	return this.state.markers.map( (marker, index) => {
	  		return (
	  			<MapView.Marker
		  			key={index}
						coordinate={{latitude: marker.latlng.latitude, longitude: marker.latlng.longitude}}
						title={marker.name}
						pinColor={"blue"}>
						<MapView.Callout 
							tooltip 
							style={styles.callout}
							onPress={() => {
								this.setState({
									region: this._lastRegion,
									POICardIndex: index,
									markers: this.state.markers
								})
							}}>
							<CustomCallout {...marker}>
								<View>
									<Text style={styles.calloutText}>{marker.name}</Text>
								</View>
							</CustomCallout>
						</MapView.Callout>
					</MapView.Marker>
				)
	  	})
  }

  renderPOICard() {
  	var imageWidth = 150;
  	var imageHeight = 150;
  	if (this.state.POICardIndex > -1 && !this.state.haveImageURI) {
  		var marker = this.state.markers[this.state.POICardIndex];
  		api.getPlacePhoto(marker.photos[0].photo_reference, imageWidth, imageHeight).
				then((data) => {
					this._imageURI = data.url
					this.setState({
						haveImageURI: true
					})
				});
  	}
  	else if (this.state.POICardIndex > -1 && this.state.haveImageURI) {
  		console.log("Rendering POI Card");
  		return (
  			<POIcard
  				style={styles.POIcard}
  				marker={this.state.markers[this.state.POICardIndex]}
  				imageURI={this._imageURI}
  				imageWidth={imageWidth}
  				imageHeight={imageHeight}
  				onHide={() => {
  					this.setState({
  						POICardIndex: -1,
  						haveImageURI: false
						})
					}}
  			/>
			)
  	}
  }

	render() {
		return (
			<View style={{flex: 1}}>
				{this.renderPOICard()}
				<MapView
					provider={"google"}
					style={this.props.style}
					region={this.state.region}
					onRegionChange={this.onRegionChange.bind(this)}
					onPress={() => {
						if (this.state.searchPlace) {
							this.setState({searchPlace: false})
						}
					}}	
					loadingEnabled>
					{this.renderSearchMarker()}
				</MapView>
			</View>
			)
	}
}

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
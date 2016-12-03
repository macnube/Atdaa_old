import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
	Dimensions
} from 'react-native';

import placeSearch from '../../placeSearch'
import dashboard from '../../dashboard'
import { getTagIdsByCategoryId, getVisiblePlaces } from '../../Utils/helpers'
import toolbar from '../../toolbar'
import searchButton from '../../searchButton'
import Map from './Map';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = -34.5885;
const LONGITUDE = -58.4316;
const LATITUDE_DELTA = 0.025;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class MapContainer extends Component {
	constructor(props) {
		super(props);
		this.watchID = (null: ?number);
		this._lastRegion = null;
		this._visiblePlaces = {placeIds: [], places: {}};
		this._imageURI = null;
		this.state = {
			region: {
	      latitude: LATITUDE,
	      longitude: LONGITUDE,
	      latitudeDelta: LATITUDE_DELTA,
	      longitudeDelta: LONGITUDE_DELTA,
			},
			POICardId: null
		}
	}


	componentDidMount() {
		if (this.props.searchMarker) {
			this.setState({
      	region: {
	        latitude: this.props.searchMarker.latlng.latitude,
	        longitude: this.props.searchMarker.latlng.longitude,
	        latitudeDelta: LATITUDE_DELTA / 30,
	        longitudeDelta: LONGITUDE_DELTA / 30,
      	}
    	})
		} else {
			this.getCurrentLocation();
		}
	}

	componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  componentWillUpdate(nextProps, nextState) {
  	const { myPlaces, filters } = nextProps;
  	const { region } = nextState
  	console.log("calculating new visiblePlaces")
  	this._visiblePlaces = getVisiblePlaces(myPlaces, filters, region )
  }

  saveRegion(event) {
  	var lastRegion = this._lastRegion || this.state.region;
  	this.setState({
  		region: lastRegion
  	})
  }

  onRegionChange(region) {
  	console.log("On region change", region);
  	this.setState({
  		region: region,
  		POICardId: null
  	})
  }

  getCurrentLocation() {
  	var geo = navigator.geolocation;
  	geo.getCurrentPosition(
      (position) => {
	      this.setState({
	      	region: {
		        latitude: position.coords.latitude,
		        longitude: position.coords.longitude,
		        latitudeDelta: LATITUDE_DELTA,
		        longitudeDelta: LONGITUDE_DELTA,
	      	}
	    	});
      },
      (positionErr) => {
      	console.log("Couldn't get current position", positionErr)
      }
    )
  }

	render() {
		console.log("FilterIds from mapContainer", this.props.filters)
		return (
			<Map
				showGPS={this.props.showGPS} 
				region={this.state.region} 
				handleRegionChange={this.onRegionChange.bind(this)}
				searchMarker={this.props.searchMarker}
				handleSetPOIId={(placeId) => this.setState({POICardId: placeId})}
				POICardId={this.state.POICardId}
				visiblePlaces={this._visiblePlaces}
				setPlaceInfo={this.props.setPlaceInfo}
				getLocation={this.getCurrentLocation.bind(this)}
				layoutInfo={this.props.layoutInfo} />
			)
	}
}

MapContainer.defaultProps = {
	showGPS: true,
}

const mapStateToProps = (state) => {
	return {
		layoutInfo: dashboard.selectors.getLayoutInfo(state.dashboard),
		myPlaces: state.myPlaces,
		filters: toolbar.selectors.getFilters(state.toolbar)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setPlaceInfo(place) {
			dispatch(placeSearch.actions.setPlaceInfo(place))
		}
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(MapContainer)
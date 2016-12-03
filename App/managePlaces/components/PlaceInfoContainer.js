import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPlace, updatePlace } from '../actions';

import dashboard from '../../dashboard'
import api from '../../Utils/api'
import { getDistanceFromLatLonInKm } from '../../Utils/helpers'
import PlaceInfo from './PlaceInfo';


class PlaceInfoContainer extends Component {

	constructor(props){
		super(props);
		this.state = {
			distance: 0,
		}
	}

	componentDidMount() {
		const place = this.props.placeInfo
		if (!place.photoURI) {
			console.log("Here")
			api.getPlacePhoto(place.photos[0].photo_reference, 180)
				.then( (res) => {
					const updatedPlace = {...place, photoURI: res.url}
					this.props.updatePlace(updatedPlace)
				})
				.catch( (err) => console.log("error with photoURL fetch", err) )
		}
		var geo = navigator.geolocation;
		geo.getCurrentPosition( (position) => {
			console.log("user position is", position)
			this.setState({
				distance: getDistanceFromLatLonInKm(
					position.coords.latitude,position.coords.longitude, 
					place.latlng.latitude, place.latlng.longitude)
			})
		})
	}

	getHours() {
		var d = new Date();
		var today = d.getDay();
		return this.props.placeInfo.open.weekday[today].split("y: ")[1]
	}

	render() {
		console.log("Props from PlaceInfoContainer", this.props);
		return (
			<PlaceInfo 
			 placeInfo={this.props.placeInfo}
			 distance={this.state.distance}
			 hours={this.getHours()}
			 handleAddTag={() => this.props.setSelectedTab("manageTags")}
			 handleToMap={() => this.props.setSelectedTab("map")}/>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		placeInfo: state.placeInfo
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setSelectedTab(tab) {
			dispatch(dashboard.actions.setSelectedTab(tab))
		},
		updatePlace(id, newValues) {
			dispatch(updatePlace(id, newValues))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceInfoContainer)
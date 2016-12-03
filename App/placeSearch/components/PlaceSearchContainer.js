import React, { Component } from 'react'
import { connect } from 'react-redux';
import { setPlaceInfo } from '../actions'

import { formatPlaceDetails } from '../../Utils/helpers';
import api from '../../Utils/api'
import PlaceSearch from './PlaceSearch';

class PlaceSearchContainer extends Component {

	constructor(props){
		super(props);
		this.state = {
			location: '0,0'
		}
	}

	componentDidMount() {
		var geo = navigator.geolocation;
		geo.getCurrentPosition( (position) => {
			console.log("user position is", position)
			this.setState({
				location: position.coords.latitude + ',' + position.coords.longitude
			})
		})
	}

	handleSetPlace(data, details) {
		console.log("data from handleSetPlace", data);
		if (details) {
			var place = formatPlaceDetails(details, this.props.myPlaces);
			api.getPlacePhoto(place.photos[0].photo_reference, 180)
				.then( (res) => {
					place.photoURI = res.url;
					this.props.setPlaceInfo(place);
				})
				.catch( (err) => {
					console.log("error with photoURL fetch", err)
					this.props.setPlaceInfo(place);
				})
			
		} else {
			console.log("Data from placeSearchContianer", data)
		}
		
	}

	render() {
		return (
			<PlaceSearch 
				handleSetPlace={this.handleSetPlace.bind(this)} 
				location={this.state.location}
				{...this.props}/>

		)
	}
}

const mapStateToProps = (state) => {
	return {
		myPlaces: state.myPlaces
	}
}

export default connect(mapStateToProps, { setPlaceInfo })(PlaceSearchContainer);
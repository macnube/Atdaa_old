import React, { Component} from 'react';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import helpers from '../../Utils/helpers';

const googleAPI = "AIzaSyDB5joq7sdR3vnzKOWAkL7xvN64tIhx9wk";


const PlaceSearch = (props) => {
  console.log("Props going into PlaceSearch", props)
	return (
		<GooglePlacesAutocomplete
        placeholder='Search'
        minLength={2} // minimum length of text to search
        autoFocus={true}
        listViewDisplayed='auto'    // true/false/undefined
        fetchDetails={true}
        renderDescription={(row) => row.terms[0].value + ', ' + row.terms[1].value} // display street only
        onPress={(data, details = null) => props.handleSetPlace(data, details)}
        getDefaultValue={() => {
          return ''; // text input default value
        }}
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: googleAPI,
          language: 'en', // language of the results
          location: props.location,
          radius: "5000",
        }}
        styles={{
          description: {
            fontWeight: 'bold',
          },
          predefinedPlacesDescription: {
            color: '#1faadb',
          },
        }}

        currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
        currentLocationLabel="Current location"
        nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        GooglePlacesSearchQuery={{
          // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
          rankby: 'distance',
        }}


        filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
      />
	)
}

export default PlaceSearch;
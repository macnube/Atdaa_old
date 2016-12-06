import {
	Dimensions,
	AsyncStorage
} 
from 'react-native';


import Firestack from 'react-native-firestack'
import firebase from 'firebase';
import Qs from 'qs';

var config = {
    apiKey: "AIzaSyDXQSzQZaky0nlx9DCwcNm9c7XWXbn9Co8",
    authDomain: "atdaa-5ad3a.firebaseapp.com",
    databaseURL: "https://atdaa-5ad3a.firebaseio.com/",
    storageBucket: "atdaa-5ad3a.appspot.com",
  };

var googleAPI = "AIzaSyChab7O6hfps-mXbk-DDtsdThWongFboZA";

firebase.initializeApp(config);

var database = firebase.database();

var provider = new firebase.auth.FacebookAuthProvider();

var firestackConfig = {
	debug: true
}
const firestack = new Firestack(firestackConfig);
firestack.on('debug', msg => console.log('Received debug message', msg))

var api = {

	getCenter() {
		return {
			top: Dimensions.get('window').height / 2,
			left: Dimensions.get('window').width / 2
		}
	},


	//Google API calls
	getPlacePhoto(reference, maxHeight) {
		var width = Dimensions.get('window').width;
		var url = `https://maps.googleapis.com/maps/api/place/photo?&maxwidth=${600}&photoreference=${reference}&key=${googleAPI}`
		return fetch(url);
	},

	getPlaces(search, currentLocation) {
		var latlng = currentLocation.latitude + ',' + currentLocation.longitude;
		var radius = 1000;
		var url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${googleAPI}&location=${latlng}&radius=${radius}&keyword=${search}`
		console.log("this is the request url", url);
		return fetch(url).then((res) => res.json());
	},


	//Firestack API calls
	createUser(email,password) {
		return firestack.auth.createUserWithEmail(email,password)
	},

	getUser() {
		firestack.auth.listenForAuth( (evt) => {
			if (!evt.authenticated) {
				console.log("There is no user")
			} else {
				console.log("User details", evt.user);
			}
		})
		.then(() => console.log('Listening for authentication changes'))
	},

	signIn(email, password) {
		return firestack.auth.signInWithEmail(email, password)
	},

	signInFacebook(token) {
		return firestack.auth.signInWithProvider('facebook', token, '')
	},

	//Async Data calls

	async getLocalUserInfo() {
		try {
			var userInfo = JSON.parse(await AsyncStorage.getItem('userInfo'));
			//Use below to clear local data
			//var userInfo = {};
			if (Object.keys(userInfo).length !== 0) {
				console.log("Successfully read local userInfo", userInfo)
				return userInfo
			} else {
				console.log("No local userInfo on disk")
				return null
				}
		}
		catch (error) {
			console.log("Error trying to read local userInfo", error);
		}
	},

	async setLocalUserInfo(userInfo) {
		try {
		  await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
		  console.log("Local UserInfo Successfully Updated");
		} catch (error) {
		  console.log("Unable to set local user info:", error);
		}
	},

	async updateLocalToolbar(toolbar) {
		var delta = {
			toolbar: {
				toolbarIcons: toolbar 
			}
		}
		try {
			await AsyncStorage.mergeItem('userInfo', JSON.stringify(delta))
			console.log("Local toolbar updated successfully");
		} catch (error) {
		  console.log("Unable to update local user toolbar:", error);
		}
	},

	async updateLocalMyPlaces(currentPlaces, newPlace, currentTime) {
		var id = newPlace.place_id;
		const placeIds = currentPlaces.placeIds.indexOf(id) === -1 ?
			[...currentPlaces.placeIds, id] :
			[...currentPlaces.placeIds]
		var delta = {
			myPlaces: {
				lastUpdated: currentTime,
				placeIds: placeIds,
				myPlacesById: {...currentPlaces.myPlacesById, [id]: newPlace}
			}
		}
		console.log("value of delta from updateLocalMyPlaces", delta);
		try {
			await AsyncStorage.mergeItem('userInfo', JSON.stringify(delta))
			console.log("Local map updated successfully");
		} catch (error) {
		  console.log("Unable to update local user map:", error);
		}
	}
}

module.exports = api;
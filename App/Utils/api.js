import {
	Dimensions,
	AsyncStorage
} 
from 'react-native';

import firebase from 'firebase';
import Qs from 'qs';

var config = {
    apiKey: "AIzaSyB_H75q3ErIQrdrWMHngw_YrbzifXHWTL4",
    authDomain: "satisfy-ae0ef.firebaseapp.com",
    databaseURL: "https://satisfy-ae0ef.firebaseio.com",
    storageBucket: "satisfy-ae0ef.appspot.com",
    messagingSenderId: "810248671987"
  };

var googleAPI = "AIzaSyDB5joq7sdR3vnzKOWAkL7xvN64tIhx9wk";

firebase.initializeApp(config);

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


	//Firebase API calls
	createUser(email,password) {
		return firebase.auth().createUserWithEmailAndPassword(email,password)		
	},

	signIn(email, password) {
		return firebase.auth().signInWithEmailAndPassword(email, password);
	},

	//Async Data calls

	async getLocalUserInfo(userId) {
		try {
			var userInfo = JSON.parse(await AsyncStorage.getItem(userId));
			//Use below to clear local data
			//var userInfo = {};
			if (Object.keys(userInfo).length !== 0) {
				console.log("Successfully read local userInfo", userInfo)
				return userInfo
			} else {
				console.log("No local userInfo on disk")
				await AsyncStorage.setItem(userId, JSON.stringify({}))
				return null
				}
			}
		catch (error) {
			console.log("Error trying to read local userInfo", error);
		}
	},

	async setLocalUserInfo(userId, userInfo) {
		try {
		  await AsyncStorage.setItem(userId, userInfo);
		  console.log("Local UserInfo Successfully Updated");
		} catch (error) {
		  console.log("Unable to set local user info:", error);
		}
	},

	async updateLocalToolbar(userId, toolbar) {
		var delta = {
			toolbar: {
				toolbarIcons: toolbar 
			}
		}
		try {
			await AsyncStorage.mergeItem(userId, JSON.stringify(delta))
			console.log("Local toolbar updated successfully");
		} catch (error) {
		  console.log("Unable to update local user toolbar:", error);
		}
	},

	async updateLocalMyPlaces(userId, currentPlaces, newPlace) {
		var currentTime = new Date().getTime() / 1000;
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
			await AsyncStorage.mergeItem(userId, JSON.stringify(delta))
			console.log("Local map updated successfully");
		} catch (error) {
		  console.log("Unable to update local user map:", error);
		}
	}
}

module.exports = api;
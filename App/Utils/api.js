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



var provider = new firebase.auth.FacebookAuthProvider();

var firestackConfig = {
	debug: true
}
const firestack = new Firestack(firestackConfig);
firestack.on('debug', msg => console.log('Received debug message', msg))

var database = firestack.database;

export const getCenter = () => {
	return {
		top: Dimensions.get('window').height / 2,
		left: Dimensions.get('window').width / 2
	}
}


//Google API calls
export const getPlacePhoto = (reference, maxHeight) => {
	var width = Dimensions.get('window').width;
	var url = `https://maps.googleapis.com/maps/api/place/photo?&maxwidth=${600}&photoreference=${reference}&key=${googleAPI}`
	return fetch(url);
}

export const getPlaces = (search, currentLocation) => {
	var latlng = currentLocation.latitude + ',' + currentLocation.longitude;
	var radius = 1000;
	var url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${googleAPI}&location=${latlng}&radius=${radius}&keyword=${search}`
	console.log("this is the request url", url);
	return fetch(url).then((res) => res.json());
}


	//Firestack API calls
export const createUser = (email,password) => {
	return firestack.auth.createUserWithEmail(email,password)
}

export const getUser = () => {
	firestack.auth.listenForAuth( (evt) => {
		if (!evt.authenticated) {
			console.log("There is no user")
		} else {
			console.log("User details", evt.user);
		}
	})
	.then(() => console.log('Listening for authentication changes'))
}

export const signIn = (email, password) => {
	return firestack.auth.signInWithEmail(email, password)
}

export const signInFacebook = (token) => {
	return firestack.auth.signInWithProvider('facebook', token, '')
}

export const signOut = () => {
	return firestack.auth.signOut()
}

export const setFirebaseUserPlaces = (userId, myPlaces) => {
	return database.ref('users/' + userId).set({...myPlaces})
}

export const getFirebaseUserPlaces = (userId) => {
	return database.ref('users/' + userId).once('myPlaces')
}

	//Async Data calls

export const updateMyPlaces = (userId, currentPlaces, newPlace, currentTime) => {
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
	setFirebaseUserPlaces(userId, delta)
		.then( () => console.log("successfully wrote to database"));
	updateLocalMyPlaces(delta)
}

export async function getLocalUserInfo() {
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
}

export async function deleteLocalUserInfo() {
	try {
		await AsyncStorage.removeItem('userInfo')
		console.log("successfully cleared local info");
	}
	catch (error) {
		console.log("Error clearing local info", error);
	}
}

export async function setLocalUserInfo(userInfo) {
	try {
	  await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
	  console.log("Local UserInfo Successfully Updated");
	} catch (error) {
	  console.log("Unable to set local user info:", error);
	}
}

export async function updateLocalToolbar(toolbar) {
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
}

export async function updateLocalMyPlaces(delta) {
		console.log("value of delta from updateLocalMyPlaces", delta);
		try {
			await AsyncStorage.mergeItem('userInfo', JSON.stringify(delta))
			console.log("Local map updated successfully");
		} catch (error) {
		  console.log("Unable to update local user map:", error);
		}
	}

const api = {
	getCenter,
	getPlacePhoto,
	getPlaces,
	createUser,
	getUser,
	signIn,
	signInFacebook,
	signOut,
	setFirebaseUserPlaces,
	updateMyPlaces,
	getLocalUserInfo,
	deleteLocalUserInfo,
	setLocalUserInfo,
	updateLocalToolbar,
	updateLocalMyPlaces,
	getFirebaseUserPlaces
}

export default api
import React, { Component } from 'react'

import { FBLogin, FBLoginManager } from 'react-native-facebook-login'

import {
	TouchableOpacity,
	Text,
	Image,
	StyleSheet,
} from 'react-native'


import api from '../../Utils/api'
/*
const FacebookButton = (props) => {
	return (
		<TouchableOpacity 
			onPress={() => props.handlePress()}
			style={styles.container}>
			<Image source={{uri: 'facebook'}} resizeMode='contain' style={styles.facebook} />
			<Text style={styles.text}>Facebook</Text>
		</TouchableOpacity>
	)
}

export default FacebookButton;

*/

class FacebookButton extends Component {
  render() {
    return (
      <FBLogin 
        onLogin={function(data){
          console.log("Logged in!");
          console.log(data);
          let token = data.credentials.token
          api.signInFacebook(token) // facebook need only access token.
            .then((user)=>{
              console.log(user)
            })
            .catch( (error) => {
            	console.log("error in FB Login", error)
            })
        }}
      />
    );
  }
};

export default FacebookButton

var styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		backgroundColor: 'rgba(57,86,155,0.9)',
		borderRadius: 5,
		height: 44,
		width: 219,
		alignItems: 'center',
		justifyContent: 'space-around',
		paddingHorizontal: 50,
	},
	facebook: {
		height: 16,
		width: 16,
	},
	text: {
		fontSize: 14,
		color: 'white',
	}

})
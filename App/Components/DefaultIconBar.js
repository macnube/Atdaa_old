import React, { Component } from 'react';

import {
	View, 
	StyleSheet,
	TouchableHighlight,
	Text
} from 'react-native';

import ProfileHeader from './ProfileHeader';
import Icon from './Icon';

function DefaultIconBar(props) {
	var defaultToolbar = props.userInfo.defaultToolbar.map( (icon, index) => {
		if (icon.name !== "trash") {
			return (
				<Icon
					key={index}
					name={icon.name}
					style={styles.icon}
					layoutInfo={props.layoutInfo}/>
			)	
		}
	})
	return (
		<View>
			<ProfileHeader
					barColor={"#292E37"}
					text={"Default Icon Bar"} />
			<View style={props.style}>
				<View style={styles.toolbar}>
					{defaultToolbar}
				</View>
				<TouchableHighlight
					style={styles.button}
					onPress={props.onUpdate}>
					<Text style={styles.text}>Update</Text>
				</TouchableHighlight>
			</View>
		</View>

	)
}

DefaultIconBar.propTypes = {
	userInfo: React.PropTypes.object.isRequired,
	layoutInfo: React.PropTypes.object.isRequired
}

var styles = StyleSheet.create({
	icon: {
		height: 30,
		width: 30,
		alignSelf: "center",
		borderWidth: 2,
		borderColor: "white",
		borderRadius: 15
	},
	button: {
		borderColor: "white",
		borderWidth: 2,
		borderRadius: 5,
		width: 100
	},
	text: {
		fontSize: 15,
		color: "white",
		textAlign: "center"
		
	},
	toolbar: {
		flexDirection: "row",
		width: 200,
		justifyContent: "space-around",
		alignItems: "center"
	}
})

module.exports = DefaultIconBar;
import React from 'react'

import {
	View,
	Image,
	Text,
	StyleSheet
} from 'react-native'

import * as colors from '../../resources/Colors'


const MapMarker = ({ selected, place}) => {
	const defaultStyle = {
		height: 15 + place.score * 4,
		width: 15 + place.score * 4
	}
	const scorePosition = selected ? 19 : 7 + place.score * 3
	const selectedModifer = selected ? 2 : 0;
	const scoreStyle = {
		position: 'absolute',
		bottom: scorePosition,
		left: scorePosition,
		height: 12 + place.score + selectedModifer,
		width: 12 + place.score + selectedModifer,
		borderRadius: 20,
		borderColor: 'white',
		borderWidth: 1,
		backgroundColor: colors.activeIcon,
		alignItems: 'center',
		justifyContent: 'center',
	}
	const uri = place.score === 0 ? place.primaryIcon.imageURI + 'Inactive' : place.primaryIcon.imageURI
	const markerStyle = selected ? styles.selectedMarker : defaultStyle
	const score = place.score > 1 ? 
		(<View style={scoreStyle}>
			<Text style={{color: 'white', fontSize: 6 + place.score}}>{place.score}</Text>
		</View>) : 
		<View />
	return (
		<View style={styles.container}>
			<Image source={{uri: uri}} style={markerStyle} />
			{score}
		</View>
	)
}

var styles = StyleSheet.create({
	selectedMarker: {
		height: 35,
		width: 35
	},
	container: {
		height: 40,
		width: 40,
		alignItems: 'flex-start',
		justifyContent: 'flex-end'
	}
})

export default MapMarker;
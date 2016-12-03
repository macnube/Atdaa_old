import React, { Component } from 'React'

import {
	Image,
	View,
	StyleSheet,
	TouchableHighlight,
	TextInput,
	Dimensions
} from 'react-native'


const PlaceInfoNavBar = (props) => {
	return (
		<View style={styles.navBar}>
			<TouchableHighlight
				onPress={() => props.handleToMap()}>
				<View style={styles.nav}>
					<Image style={styles.back} source={{uri: 'backArrowLight'}} />
				</View>
			</TouchableHighlight>
			<View style={styles.filler} />
			<TouchableHighlight>
				<View style={styles.nav}>
					<Image style={styles.search} source={{uri: 'searchLight'}} />
				</View>
			</TouchableHighlight>
		</View>
	)
}

export default PlaceInfoNavBar

PlaceInfoNavBar.propTypes = {
	handleToMap: React.PropTypes.func.isRequired,
}

var styles = StyleSheet.create({
	navBar: {
		height: 44,
		width: Dimensions.get('window').width,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		backgroundColor: 'transparent',
		position: 'absolute',
		top: 15,
		zIndex: 10,
	},
	filler: {
		width: 58
	},
	search: {
		height: 18,
		width: 18
	},
	back: {
		height: 22,
		width: 13
	},
	nav: {
		width: 60,
		alignItems: 'center',
	}
});
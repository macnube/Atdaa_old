import React, { Component } from 'React'

import {
	Image,
	View,
	StyleSheet,
	TouchableHighlight,
	TextInput
} from 'react-native'

import * as colors from '../../resources/Colors'


const IconSearchNavBar = ({ categoryIcon, width, handlePress }) => {
	const backgroundColor = categoryIcon ? colors.lightMustard : 'rgb(255,255,255)'
	const extraStyle= categoryIcon ? 
		{width: width, backgroundColor: backgroundColor} : 
		[styles.navBarShadow, {width: width, backgroundColor: backgroundColor, marginBottom: 30}];
	const atdaaURI = categoryIcon ? 'atdaaLight' : 'atdaaOrange'
	const backURI = categoryIcon ? 'backArrowLight' : 'backArrowDark'
	const searchURI = categoryIcon ? 'searchLight' : 'searchDark'
	return (
		<View style={[styles.navBar, extraStyle]}>
			<TouchableHighlight
				onPress={() => handlePress()}>
				<View style={styles.nav}>
					<Image style={styles.back} source={{uri: backURI}} />
				</View>
			</TouchableHighlight>
			<Image source={{uri: atdaaURI}} style={styles.atdaa} />
			<TouchableHighlight>
				<View style={styles.nav}>
					<Image style={styles.search} source={{uri: searchURI}} />
				</View>
			</TouchableHighlight>
		</View>
	)
}

export default IconSearchNavBar

IconSearchNavBar.propTypes = {
	categoryIcon: React.PropTypes.object,
	width: React.PropTypes.number.isRequired,
	handlePress: React.PropTypes.func.isRequired,
}

IconSearchNavBar.defaultProps = {
	categoryIcon: null,
}

var styles = StyleSheet.create({
	navBar: {
		height: 66,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
	},
	navBarShadow: {
		shadowColor: colors.navBoxShadowColor,
		shadowOffset: {width: 0, height: 2},
		shadowRadius: 4,
		shadowOpacity: .5,
	},
	atdaa: {
		height: 24,
		width: 58,
		marginTop: 15
	},
	back: {
		width: 12,
		height: 22
	},
	search: {
		height: 17,
		width: 17
	},
	nav: {
		marginTop: 15,
		width: 60,
		alignItems: 'center',
	}
});
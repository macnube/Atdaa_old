import React from 'React'

import {
	View,
	StyleSheet,
	Text,
	TouchableWithoutFeedback
} from 'react-native'

import Icon from '../../shared/Icon';


const IconSearchRow = ({ layoutInfo, icon, handleNewIcon, handleShowTags }) => {

	const styleIcon = {
		height: layoutInfo.searchIcon.height,
		width: layoutInfo.searchIcon.height,
		alignSelf: 'center',
		opacity: .95
	}
	const styleRow = {
		height: layoutInfo.searchIcon.height * 1.6,
		width: layoutInfo.searchIcon.height * 1.4,
	}
	console.log("Icon going into IconSearchRow", icon);
	const shadow = icon.imageURI.search("inactive") === -1
	return (
		<View style={[styles.iconRow, styleRow]}>
			<TouchableWithoutFeedback
				onPress={() => handleShowTags(icon)}
				onLongPress={(e) => handleNewIcon(icon, e)}>
				<View>
					<Icon
						icon={icon}
						shadow={shadow}
						layoutInfo={layoutInfo}
						style={styleIcon} />
				</View>
			</TouchableWithoutFeedback>
			<Text style={styles.text}>{icon.name}</Text>
		</View>
	)
}

export default IconSearchRow;

IconSearchRow.propTypes = {
	layoutInfo: React.PropTypes.object.isRequired,
	icon: React.PropTypes.object.isRequired,
	handleNewIcon: React.PropTypes.func.isRequired,
	handleShowTags: React.PropTypes.func.isRequired,
}

var styles = StyleSheet.create({
	iconRow: {
		margin: 5,
		marginBottom: 10,
		flexDirection: "column",
		justifyContent: "space-between",
		alignItems: "center",
		zIndex: 10
	},
	text: {
		color: "rgb(74,74,74)",
		fontSize: 14,
		textAlign: "center"
	},
	button: {
		backgroundColor: "transparent",
		borderWidth: 2,
		borderRadius: 5,
		borderColor: "white",
		height: 30,
		width: 30,
		alignSelf: "center"
	},
	buttonTextStyle: {
		color: "white",
		paddingLeft: 5,
		paddingRight: 5,
		paddingTop: 5
	},
})
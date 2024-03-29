import React, { Component } from 'React'

import {
	View,
	StyleSheet,
	Text,
	ScrollView,
	Image,
} from 'react-native'

import Icon from '../../../shared/Icon'

const PlaceTagsRow = (props) => {
	const color = props.icon.iconColor
	const createTags = () => {
		return props.tags.map( (tag, index) => {
			console.log("tag from PlaceTagsRow", tag);
			return (
				<View key={index} style={[styles.tagContainer, {borderColor: color}]}>
					<Text style={[styles.tagText, {color: color}]}>{tag.name}</Text>
				</View>

			)
		})
	}

	return (
		<View style={styles.container}>
			<Icon style={{height: 26}} icon={{...props.icon, imageURI: props.icon.imageURI+'Clean'}} shadow={false} />
			<ScrollView
				style={styles.scrollContainer}
				horizontal={true}
				scrollEnabled={true}
				showsHorizontalScrollIndicator={true}>
				{createTags()}
			</ScrollView>
		</View>

	)
}

export default PlaceTagsRow;

var styles = StyleSheet.create({
	container: {
		height: 80,
		flexDirection: 'row',
		alignItems: 'center',
		borderColor: 'rgb(238,238,238)',
		borderBottomWidth: StyleSheet.hairlineWidth,
	},
	scrollContainer: {
		marginLeft: 20,
		height: 80,
	},
	tagText: {
		fontSize: 12,
		textAlign: 'center',
	},
	tagContainer: {
		padding: 5,
		height: 30,
		alignSelf: 'center',
		borderWidth: 2,
		marginRight: 15,
		borderRadius: 2
	},
})
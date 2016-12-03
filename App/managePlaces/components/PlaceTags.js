import React from 'react';

import {
	View,
	Text,
	Image,
	StyleSheet,
	ListView
} from 'react-native';

import { getIconById } from '../../Utils/helpers'

import PlaceTagsRow from './placeTagsResources/PlaceTagsRow'

const PlaceTags = (props) => {
	const renderRow = (data) => {
		const icon = getIconById(data.category);
		console.log("Cateogry Icon from PlaceTags", icon);
		const tags = data.tags.map( (tag) => getIconById(tag))
		return <PlaceTagsRow icon={icon} tags={tags} />
	}
	console.log('props going into PlaceTags', props);
	return (
		<View style={styles.container}>
			<ListView
				contentContainerStyle={styles.listView}
				dataSource={props.dataSource}
				renderRow={renderRow} />
		</View>
	)
}

export default PlaceTags;

var styles = StyleSheet.create({
	container: {
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderTopWidth: StyleSheet.hairlineWidth,
		borderColor: 'rgb(238,238,238)',
		marginHorizontal: 30,
		flex: 1,
		height: 320,
	},
	listView: {
		flex: 1,
	}
})
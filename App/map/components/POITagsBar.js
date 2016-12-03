import React, { Component } from 'React';

import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableHighlight,
} from 'react-native';

import { getIconById, getCategoryIdByTagId } from '../../Utils/helpers'

import Icon from '../../shared/Icon'

const POITagsBar = (props) => {
	const primaryIconId = props.placeInfo.primaryIcon.id
	var tagIds = props.placeInfo.tags.reduce( (acc, tagId) => {
		var smallIconId = getCategoryIdByTagId(tagId)
		if (acc.indexOf(smallIconId) === -1 && primaryIconId !== smallIconId) {
			return acc.concat([smallIconId]);
		} else return acc

	}, [])
	const tags = tagIds.map( (tagId, index) => {
		var smallIcon = getIconById(tagId)
		var icon = {...smallIcon, imageURI: smallIcon.imageURI + 'Clean'}
		console.log("smallIcon from POITagsBar", smallIcon);
		return <View key={index} style={{marginLeft: 10}}><Icon icon={icon} style={{height: 26}} /></View>
	})
	return (
		<View style={styles.container}>
			{tags}
		</View>
	)
}

export default POITagsBar;

var styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'flex-end',
		paddingBottom: 3,
		justifyContent: 'space-between',
	}
})



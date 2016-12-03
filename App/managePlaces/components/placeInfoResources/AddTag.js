import React from 'react'

import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableHighlight
} from 'react-native';

import Icon from '../../../shared/Icon'

const AddTag = (props) => {
	const icon = {id: 'addTag', imageURI: 'addTag'}
	return (
		<TouchableHighlight
			onPress={() => props.handlePress()}>
			<View style={styles.container}>
				<Icon icon={icon} style={{height: 30}} shadow={false} />
				<Text style={styles.text}>Edit Tags</Text>
			</View>
		</TouchableHighlight>
	)
}

export default AddTag;

AddTag.propTypes = {
	handlePress: React.PropTypes.func.isRequired,
}

var styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: 45,
	},
	text: {
		fontSize: 12,
	}
})
import React from 'react';

import {
	View,
	Text,
	TouchableWithoutFeedback,
	StyleSheet
} from 'react-native';

import * as colors from '../../resources/Colors'
import { getDistanceFromLatLonInKm } from '../../Utils/helpers'
import Icon from '../../shared/Icon'
import POITagsBar from './POITagsBar'
import POIOpen from './POIOpen'


const POICard = ({ placeInfo, setPlaceInfo, width, margin, region }) => {
	const distance = getDistanceFromLatLonInKm(region.latitude, region.longitude,
		placeInfo.latlng.latitude, placeInfo.latlng.longitude)
	return (
		<TouchableWithoutFeedback
			onPress={() => setPlaceInfo(placeInfo)}>
			<View style={[styles.container, {width: width, margin: margin}]}>
				<View style={[styles.iconContainer, {backgroundColor: placeInfo.primaryIcon.iconColor}]}>
					<Icon
						icon={placeInfo.primaryIcon}
						shadow={true}
						style={{height: 43}} />
				</View>
				<View style={styles.mainContainer}>
					<Text numberOfLines={1} style={styles.nameText}>{placeInfo.name}</Text>
					<View style={styles.detailsContainer}>
						<View style={styles.infoContainer}>
							<POIOpen open={placeInfo.open.open_now} />
							<Text style={styles.distance}>{distance} Km</Text>
						</View>
						<POITagsBar placeInfo={placeInfo} />
					</View>
				</View>
			</View>
		</TouchableWithoutFeedback>	
	)
}

const styles = StyleSheet.create({
	container: {
		height: 95,
		flexDirection: 'row',
		zIndex: 10,
		backgroundColor: 'white',
		shadowColor: 'rgb(0,0,0)',
		shadowOffset: {width: 0, height: 2},
		shadowRadius: 2,
		shadowOpacity: .5,
		borderRadius: 6,
	},
	iconContainer: {
		width: 70,
		justifyContent: 'center',
		alignItems: 'center',
		borderBottomLeftRadius: 6,
		borderTopLeftRadius: 6,
		opacity: .7,
	},
	mainContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-around',
		backgroundColor: 'rgb(255,255,255)',
		borderColor: 'rgb(255,255,255)',
		borderWidth: 2,
		borderBottomRightRadius: 6,
		borderTopRightRadius: 6,
		paddingHorizontal: 10,
	},
	detailsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	nameText: {
		fontSize: 17	,
	},
	infoContainer: {
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		height: 40
	}
})

export default POICard;
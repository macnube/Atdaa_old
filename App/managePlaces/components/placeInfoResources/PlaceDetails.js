import React from 'react';

import {
	View,
	Text,
	Image,
	TouchableOpacity,
	StyleSheet
} from 'react-native';

import * as colors from '../../../resources/Colors'

import Icon from '../../../shared/Icon'

import Phone from './Phone';
import AddTag from './AddTag';
import Website from './Website';
import Address from './Address';
import OpenHours from './OpenHours';
import Open from './Open'


const PlaceDetails = ({ placeInfo, icon, handleAddTag, hours, distance }) => {
	return(
		<View style={styles.container}>
			<View style={styles.mainContainer}>
				<TouchableOpacity
					onPress={() => handleAddTag()}>
					<View style={[styles.iconContainer, {backgroundColor: icon.iconColor}]}>
						<Icon 
							style={{height: 50}} 
							icon={icon} 
							shadow={true} />
					</View>
				</TouchableOpacity>
				<View style={styles.mainInfo}>
					<View style={styles.nameInfo}>
						<Text style={styles.nameText}>{placeInfo.name}</Text>
						<Text style={styles.typeText}>{placeInfo.type}</Text>
					</View>
					<View style={styles.openInfo}>
						<Open open={placeInfo.open.open_now} />
						<Text style={styles.distanceText}>{distance} Km</Text>
					</View>
				</View>
			</View>
			<View style={styles.contactContainer}>
				<Phone />
				<AddTag handlePress={handleAddTag}/>
				<Website />
			</View>
			<View style={styles.locationContainer}>
				<Address address={placeInfo.address}/>
				<OpenHours hours={hours}/>
			</View>
		</View>
	)
}

PlaceDetails.propTypes = {
	placeInfo: React.PropTypes.object.isRequired,
	icon: React.PropTypes.object.isRequired,
	handleAddTag: React.PropTypes.func.isRequired
}

export default PlaceDetails;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		alignItems: 'stretch',
	},
	mainContainer: {
		flexDirection: 'row',
		height: 80,
	},
	iconContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 85,
		height: 80,
		backgroundColor: colors.pumpkinOrange,
		opacity: .7,
	},
	mainInfo: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'stretch',
		paddingTop: 10,
		paddingBottom: 10,
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderColor: 'rgb(238,238,238)'
	},
	nameInfo: {
		flexDirection: 'column',
		justifyContent: 'space-around',
	},
	openInfo: {
		flexDirection: 'column',
		justifyContent: 'space-around',
		alignItems: 'flex-end',	
	},
	contactContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderColor: 'rgb(238,238,238)',
		height: 80,
		paddingHorizontal: 30,
	},
	locationContainer: {
		flexDirection: 'column',
		height: 80,
		justifyContent: 'space-around',
		alignItems: 'flex-start',
		paddingBottom: 10,
		paddingTop: 10
	}
})
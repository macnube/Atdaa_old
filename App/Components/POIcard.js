import React, { Component } from 'react';

import {
	View,
	Text,
	Image,
	StyleSheet,
	ScrollView,
	TouchableOpacity
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import api from '../Utils/api';


export default class POIcard extends Component {

	constructor(props) {
		super(props);
		this.state = {
			imageURI: ''
		}
	}

	componentWillMount() {
		console.log("Props", this.props);
		api.getPlacePhoto(this.props.marker.photos[0].photo_reference, 350, 250).
			then( (data) => {
				console.log(data);
				this.setState({
					imageURI: data.url
				})
			})
	}

	render() {
		var open_now = this.props.marker.open_now ? "Open Now" : "Closed"
		var openTimes = this.props.marker.open_hours.map( (day, index) => {
			return (
				<Text 
					key={index}
					style={styles.openHoursText}>
					{day}
				</Text>
			)
		})

		return (
			<View style={styles.mainContainer}>
				<View style={styles.imageContainer}>
					<Image
						style={styles.mainImage} 
						source={{uri: this.state.imageURI}}/>
				</View>
				<ScrollView contentContainerStyle={styles.detailsContainer}>
					<Text style={styles.textName}>{this.props.marker.name}</Text>
					<View style={styles.typeContainer}>
						<View style={styles.lineSeparatorShort} />
						<Text style={styles.textType}>{this.props.marker.type}</Text>
						<View style={styles.lineSeparatorShort} />
					</View>
					<View style={styles.openNowContainer}>
						<View style={styles.openNowMainContainer}>
							<Image 
								source={{uri: "poi_clock"}}
								resizeMode="contain"
								style={styles.iconImage}/>
							<Text style={styles.openNowText}>{open_now}</Text>
						</View>
						<View style={styles.openNowDetailsContainer}>
							{openTimes}
						</View>
					</View>
					<View style={styles.lineSeparatorLong} />
					<View style={styles.contactInfoContainer}>
						<View style={styles.addressContainer}>
							<Image
								source={{uri: "poi_address"}}
								resizeMode="contain"
								style={styles.iconImage}/>
							<Text style={styles.addressText}>{this.props.marker.address}</Text>
						</View>
						<View style={styles.phoneContainer}>
							<Image
								source={{uri: "poi_phone"}}
								resizeMode="contain"
								style={styles.iconImage} />
							<Text style={styles.phoneText}>{this.props.marker.phone}</Text>
						</View>
					</View>
					<View style={styles.typeContainer}>
						<View style={styles.lineSeparatorShort} />
						<Text style={styles.textType}>Best Known For:</Text>
						<View style={styles.lineSeparatorShort} />
					</View>
					<View style={styles.bestIconContainer}>
					</View>
				</ScrollView>
			</View>
		)
	}
}



var styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		flexDirection: "column",
		paddingLeft: 30,
		paddingRight: 30
	},
	imageContainer: {
		height: 250,
		width: 350,
		alignItems: "center"
	},
	mainImage: {
		height: 250,
		width: 350,
		alignSelf: "center"
	},
	detailsContainer: {
		flex: 1,
		flexDirection: "column",
	},
	textName: {
		fontSize: 23,
		fontWeight: "bold",
		marginTop: 15,
		marginBottom: 15
	},
	typeContainer: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 15
	},
	lineSeparatorShort: {
		height: 10,
		width: 80,
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderColor: "black"
	},
	lineSeparatorLong: {
		height: 10,
		width: 200,
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderColor: "black",
		alignSelf: "center",
		marginBottom: 15
	},
	textType: {
		fontSize: 21
	},
	openNowContainer: {
		marginBottom: 15,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	openNowMainContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: -30,
		alignItems: "center"
	},
	iconImage: {
		height: 30,
		width: 30
	},
	openNowText: {
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "center",
		marginLeft: 10
	},
	openNowDetailsContainer: {
		flexDirection: "column",
	},
	openHoursText: {
		fontSize: 12
	},
	contactInfoContainer: {
		flexDirection: "column",
		marginBottom: 15
	},
	addressContainer: {
		marginTop: 10,
		marginBottom: 10,
		flexDirection: "row",
		alignItems: "center"
	},
	addressText: {
		fontSize: 15,
		fontWeight: "bold",
		marginLeft: 10,
	},
	phoneContainer: {
		marginTop: 10,
		marginBottom: 10,
		flexDirection: "row",
		alignItems: "center"
	},
	phoneText: {
		fontSize: 15,
		fontWeight: "bold",
		marginLeft: 10
	}

})
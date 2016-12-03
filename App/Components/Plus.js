import React, { Component } from 'React';

import {
	View,
	Text,
	StyleSheet,
	TouchableHighlight,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons'

var styles = StyleSheet.create({
	plusIcon: {
		fontSize: 30,
		alignSelf: 'center',
		color: "white",
	},
})

const Plus = (props) => {
	console.log("Props going into plus", props);
	const { open, handlePress, style, height } = props;
	const iconContainerStyle = {
		position: "absolute",
		height: height,
		width: height,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#292E37',
		borderRadius: height / 2
	}	
	const icon = open 
		? <Ionicons name="md-close" style={styles.plusIcon}/>
		: <Ionicons name="md-add" style={styles.plusIcon}/>

	return (
		<TouchableHighlight
			style={[iconContainerStyle, style]}
			onPress={() => handlePress()}>
			<View>
				{icon}
			</View>
		</TouchableHighlight>
	)
}

export default Plus;

/*
export default class Plus extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			shouldAnimate: Math.random()
		}
	}

	styleIconContainer() {
		return {
			position: "absolute",
			height: this.props.layoutInfo.icon.height,
			width: this.props.layoutInfo.icon.height,
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: '#292E37',
			borderRadius: this.props.layoutInfo.icon.height / 2
		}
	}

	styleContainer() {
		var dropZones = this.props.layoutInfo.dropZones;
		var left = dropZones[4].xmin;
		var top =  dropZones[4].ymin;
		return {
			position: 'absolute',
			top: top,
			left: left,
		}
	}

	handleOpenClose() {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
		this.setState({
			open: !this.state.open
		})
	}

	render() {
		var icon = this.state.open 
			? <Ionicons name="md-close" style={styles.plusIcon}/>
			: <Ionicons name="md-add" style={styles.plusIcon}/>
		var multiplier = this.state.open ? -1 : 0

		return (
				<View
					style={this.styleContainer()}>
					<TouchableHighlight
						style={[this.styleIconContainer(), {zIndex: 10}]}
						onPress={this.handleOpenClose.bind(this)}>
							{icon}
					</TouchableHighlight>
					<TouchableHighlight
						style={[this.styleIconContainer(), {zIndex: 8, top: 80 * multiplier}]}
						onPress={() => {
							this.props.onComponentChange("iconSearch")
							this.handleOpenClose();
					}}>
							<View>
								<Ionicons name="md-add" style={styles.plusIconSmall}/>
								<Text style={styles.plusIconText}>Icon</Text>
							</View>
					</TouchableHighlight>
					<TouchableHighlight
						style={[this.styleIconContainer(), {zIndex: 9, top: 160 * multiplier}]}
						onPress={() => {
							this.props.onComponentChange("placeSearch")
							this.handleOpenClose();
						}}>
							<View>
								<Ionicons name="md-add" style={styles.plusIconSmall}/>
								<Text style={styles.plusIconText}>Place</Text>
							</View>
					</TouchableHighlight>
				</View>
		)
	}
}

*/


	
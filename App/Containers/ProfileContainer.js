import React, { Component } from 'react'

import {
	View,
	Image,
	Text,
	StyleSheet,

} from 'react-native'

import Icon from '../Components/Icon'
import DefaultIconBar from '../Components/DefaultIconBar';

export default class ProfileContainer extends Component {

	constructor(props) {
		super(props);
		console.log("props from ProfileContainer", props)
		this.state = {
			updateDefault: Math.random()
		}
	}

	handleUpdate() {
		this.props.userInfo.defaultToolbar = this.props.userInfo.toolbar.map( (icon) => {return icon});
		this.setState({
			updateDefault: Math.random()
		})
	}

	renderDefaultToolbar() {
		console.log("Props from ProfileContainer", this.props)
		var styleIcon = {
			height: 30,
			width: 30,
			alignSelf: "center",
			borderWidth: 2,
			borderColor: "white",
			borderRadius: 15
		};
		return this.props.userInfo.toolbar.map( (icon, index) => {
			if (icon.name !== "trash") {
				return (
					<Icon
						key={index}
						name={icon.name}
						style={styleIcon}
						layoutInfo={this.props.layoutInfo}/>
				)	
			}
		})
	}

	
	render() {
		return (
			<View
				style={this.props.style}>
				<Image
					source={{uri: this.props.userInfo.profile.profileURI}}
					style={styles.image} />
				<Text style={styles.text}>{this.props.userInfo.user}</Text>
				<DefaultIconBar
					style={styles.defaultIconBar}
					userInfo={this.props.userInfo}
					layoutInfo={this.props.layoutInfo}
					onUpdate={this.handleUpdate.bind(this)} />
			</View>
		)
	}
}

var styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
	},
	image: {
		height: 150,
		width: 150,
		marginTop: 50,
		borderRadius: 75,
		borderWidth: 2,
		borderColor: "white",
		alignSelf: "center"
	},
	text: {
		fontSize: 20,
		color: "white",
		textAlign: "center",
		marginTop: 10
	},
	defaultIconBar: {
		flexDirection: "row",
		height: 50,
		marginLeft: 10,
		justifyContent: "space-around",
		alignItems: "center"
	}
})

ProfileContainer.propTypes = {
	userInfo: React.PropTypes.object.isRequired
}
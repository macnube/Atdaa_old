import React, { Component } from 'React'

import {
	View,
	StyleSheet,
	Text,
	TouchableHighlight,
	TouchableWithoutFeedback
} from 'react-native'

import Icon from './Icon';


export default class IconRow extends Component {

	constructor(props) {
		super(props);
		console.log("props going into IconRow", props);
		this.state = {
			iconLeft: 0
		}
	}

	styleContainer() {
		var extraStyle = {
			width: this.props.layoutInfo.toolbar.width,
			height: 90,
			borderBottomWidth: StyleSheet.hairlineWidth,
			borderBottomColor: "white",
			paddingBottom: 10
		}
		if (this.props.icon.parent) {
			return [this.props.style, extraStyle]
		} else {
			return this.props.style
		}
	}

	styleImage() {
		return {
			height: this.props.layoutInfo.icon.height,
			width: this.props.layoutInfo.icon.height,
			alignSelf: 'center'
		}
	}

	handleLongPress(e) {
		console.log("Handle Add Press event", e);
		var newIcon = {
			icon: this.props.icon,
			//left: this.state.iconLeft + this.props.layoutInfo.icon.height,
			left: e.nativeEvent.pageX,
			top: e.nativeEvent.pageY
		}
		this.props.handleNewIcon(newIcon);
	}

	measureView(event) {
		console.log("event properties", event);
		this.setState({
			iconLeft: event.nativeEvent.layout.x
		})
	}

	render() {
		console.log("Props from within IconRow", this.props);
		var styleIconContainer = {
			height: this.props.layoutInfo.toolbar.height * .8,
			width: this.props.layoutInfo.toolbar.height * .8,
			borderRadius: this.props.layoutInfo.toolbar.height * .4,
			borderColor: "white",
			borderWidth: this.props.layoutInfo.icon.borderWidth,
			alignSelf: "center"
		}
		var width = this.props.icon.parent ? this.props.layoutInfo.toolbar.width : 100
		return (
			<View
				style={this.styleContainer()}>
				<TouchableWithoutFeedback
					onLongPress={this.handleLongPress.bind(this)}
					onPress={() => this.props.handleShowChildren(this.props.icon.id)}>
					<View 
						style={styleIconContainer}
						onLayout={(event) => this.measureView(event)}
						>
						<Icon
							icon={this.props.icon}
							layoutInfo={this.props.layoutInfo}
							style={this.styleImage()} />
					</View>
				</TouchableWithoutFeedback>
				<Text style={styles.text}>{this.props.icon.name}</Text>
			</View>
		)
	}
}

/*
				<TouchableHighlight
					style={styles.button}
					onPress={this.handleAddPress.bind(this)}
					underlayColor={"green"}>
					<Text style={styles.buttonTextStyle}>+</Text>
				</TouchableHighlight>
*/

var styles = StyleSheet.create({
	text: {
		color: "white",
		fontSize: 10,
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
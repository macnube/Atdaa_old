import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';

import {
	View,
	PanResponder,
	LayoutAnimation,
	Animated,
	TouchableHighlight,
	Image,

} from 'react-native'

var PropTypes = React.PropTypes;

import Icon from '../Components/Icon';


class DraggableAnimatedSearchIcon extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pan: new Animated.ValueXY(),
		};
	}

	componentWillMount() {
		console.log("Creating new draggable icon with props", this.props);
		this.panResponder = PanResponder.create({
			onMoveShouldSetPanResponder: () => {
				this.props.onScrollSwitch()
				return true
			},
			onPanResponderMove: Animated.event([null,{
				dx : this.state.pan.x,
				dy : this.state.pan.y
			}]),
			onPanResponderRelease: this._handlePanResponderEnd.bind(this)
			});
	}

	_checkDropZone(gesture) {
		this.props.layoutInfo.dropZones.forEach((zone, index) => {
			var ymin = zone.ymin + this.props.layoutInfo.toolbar.yStart;
			var ymax = zone.ymax + this.props.layoutInfo.toolbar.yStart;
			if (
					(gesture.moveX > zone.xmin && gesture.moveX < zone.xmax) && 
					(gesture.moveY > ymin && gesture.moveY < ymax)
				) {
				if (index === 4) this.props.clearNewIcon()
				else this.props.updateToolbarIcon(this.props.icon.id, index)
				//this.props.onToolbarUpdate(this.props.icon, index);
			}
		});
	}

	_handlePanResponderEnd(e, gesture) {
		this._checkDropZone(gesture);
	}

	styleDraggableContainer() {
		return {
			position: 'absolute',
			top: this.props.top,
			left: this.props.left,
			zIndex: 1000
		}
	}

	styleImage() {
		return {
			height: this.props.layoutInfo.icon.height,
			width: this.props.layoutInfo.icon.height,
			alignSelf: 'center'
		}
	}

	render() {
		console.log("Moving draggable icon to new location");
		return (
			<View
				style={this.styleDraggableContainer()}
				ref={(container) => {
					this.container = container;
				}}	>
				<Icon
					icon={this.props.icon}
					style={this.styleImage()}
					layoutInfo={this.props.layoutInfo}
					animatedStyle={this.state.pan.getLayout()}
					panHandlers={this.panResponder.panHandlers} />
				
			</View>
		)
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(ActionCreators, dispatch);
}

export default connect(null, mapDispatchToProps)(DraggableAnimatedSearchIcon)


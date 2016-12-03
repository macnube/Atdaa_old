import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';

import {
	View,
	PanResponder,
	LayoutAnimation,
	Image,

} from 'react-native'

var PropTypes = React.PropTypes;

import Icon from '../Components/Icon';


class DraggableToolBarIcon extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pan: {},
		};
		this._containerStyles = {};
		this.container = (null : ?{ setNativeProps(props: Object): void });
	}

	componentWillMount() {
		this.panResponder = PanResponder.create({
			onStartShouldSetPanResponder: () => {
				this.props.toggleTrash();
				this._containerStyles.style.zIndex = 100;
				this._updateNativeStyles();
				return true;
			},
			onPanResponderMove: this._handlePanResponderMove.bind(this),
			onPanResponderRelease: this._handlePanResponderEnd.bind(this)
					
			});

		this._containerStyles = {
			style: {
				position: 'absolute',
				top: this._top,
				left: this._left,
				zIndex: 1
			}
		}
	}

	componentDidMount() {
		this._updateNativeStyles();
	}

	_updateNativeStyles() {
    this.container && this.container.setNativeProps(this._containerStyles);
  }

	_checkDropZone(gesture) {
		var icon = this._getIconInfo();
		icon.dropZones.forEach((zone, index) => {
			var ymin = zone.ymin + this.props.layoutInfo.toolbar.yStart;
			var ymax = zone.ymax + this.props.layoutInfo.toolbar.yStart;
			if (
					(gesture.moveX > zone.xmin && gesture.moveX < zone.xmax) && 
					(gesture.moveY > ymin && gesture.moveY < ymax)
				) {
				this.props.onDrop(icon, index);
			}
		});
	}

	_handlePanResponderMove(e, gesture) {
		var icon = this._getIconInfo();
		this._containerStyles.style.left = icon.left + gesture.dx;
		this._containerStyles.style.top = icon.top + gesture.dy;
		this._updateNativeStyles();
	}

	_handlePanResponderEnd(e, gesture) {
		this.props.toggleTrash();
		this._resetContainerStyles();
		this._checkDropZone(gesture);
		this._containerStyles.style.zIndex = 1;
		this._updateNativeStyles();
	}

	_resetContainerStyles() {
		var icon = this._getIconInfo();
		this._containerStyles.style.left = icon.left;
		this._containerStyles.style.top = icon.top;
		this._updateNativeStyles();
	}

	_getIconInfo() {
		var priority = this.props.icon.priority;
		var dropZones = this.props.layoutInfo.dropZones;
		return {
			priority: priority,
			dropZones: dropZones,
			left: dropZones[priority].xmin,
			top: dropZones[priority].ymin
		}
	}

	styleDraggableContainer() {
		var icon = this._getIconInfo();
		return {
			position: 'absolute',
			top: icon.top,
			left: icon.left
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
		return (
			<View 
				style={this.styleDraggableContainer()}
				ref={(container) => {
					this.container = container;
				}}>
				<Icon
					icon={this.props.icon}
					style={this.styleImage()}
					layoutInfo={this.props.layoutInfo}
					panHandlers={this.panResponder.panHandlers} />
				
			</View>
		)
	}
}

export default DraggableToolBarIcon


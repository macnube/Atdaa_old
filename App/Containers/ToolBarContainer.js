import React, { Component } from 'react'
import { connect } from 'react-redux';
import { toggleTrash, switchToolbarIcons, deleteToolbarIcon, setSelectedTab } from '../actions/dashboard';

import {
	LayoutAnimation
} from 'react-native'

import DraggableToolBarIcon from './DraggableToolBarIcon';
import Plus from '../Components/Plus';
import helpers from '../Utils/helpers';
import Toolbar from '../Components/Toolbar';

class ToolBarContainer extends Component {

	handleDrop(icon, index) {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
		console.log("HANDLING DROP FORM TOOLBARCONTAINER")
		//If the icon is dropped on the trash delete
		if (index === 4) this.props.deleteToolbarIcon(icon.priority)
		else this.props.switchToolbarIcons(icon.priority, index)
	}

	render() {
		const { toolbar, layoutInfo, setSelectedTab } = this.props.dashboard
		return (
			<Toolbar 
				layoutInfo={layoutInfo} 
				handleDrop={this.handleDrop.bind(this)}
				toggleTrash={this.props.toggleTrash}
				toolbar={toolbar}
				setSelectedTab={setSelectedTab} />
		)
	}
}


function mapStateToProps(state) {
	return {
		dashboard: state.dashboard
	}

}

export default connect(mapStateToProps, 
	{toggleTrash, switchToolbarIcons, deleteToolbarIcon, setSelectedTab})(ToolBarContainer)
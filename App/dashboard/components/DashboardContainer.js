import React, { Component } from 'react'
import { connect } from 'react-redux';
import { setSelectedTab, setLayout, clearNewIcon, loadLocalInfo } from '../actions';

import toolbar from '../../toolbar'
import iconSearch from '../../iconSearch'
import managePlaces from '../../managePlaces'
import searchButton from '../../searchButton'
import placeSearch from '../../placeSearch'

import Dashboard from './Dashboard'


import api from '../../Utils/api'
import { getLayout } from '../../Utils/helpers';

//Todo: 
//Create a loadState and saveState function
//Need to subscribe so that saveState is called every time new data is available.
//Don't want to save UI state, only data.
//Think about using 'node-uuid' library to create unique ids every time.
//import 'v4' from 'node-uuid'
//explore lodash library and throttle to ensure that the inner function isn't called more than specified 
//import throttle from 'lodash/throttle'

class DashboardContainer extends Component {

	handleLayout() {
		this.props.setLayout(getLayout());
	}

	navVisible() {
		const excludedTabs = ['iconSearch', 'manageTags', 'placeInfo'];
		return excludedTabs.indexOf(this.props.dashboard.selectedTab) === -1
	}

	render() {
		const shouldBlur = this.props.searchButtonOpen || this.props.toolbar.showingTrash
		return (
			<Dashboard
				navVisible={this.navVisible()}
				handleLayout={this.handleLayout.bind(this)} 
				shouldBlur={shouldBlur}
				{...this.props} />
		)
	}
}

const mapStateToProps = (state) => {
	return {
		dashboard: state.dashboard,
		toolbar: state.toolbar,
		newIcon: state.newIcon,
		placeInfo: placeSearch.selectors.getPlaceInfo(state.placeSearch),
		searchButtonOpen: searchButton.selectors.get(state.searchButton)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setSelectedTab(tab) {
			dispatch(setSelectedTab(tab))
		},
		setLayout(layoutInfo) {
			dispatch(setLayout(layoutInfo))
		},
		updateToolbarIcon(iconId, index) {
			dispatch(toolbar.actions.updateToolbarIcon(iconId, index))
		},
		clearNewIcon() {
			dispatch(iconSearch.actions.clearNewIcon())
		},
		loadLocalInfo(userInfo) {
			dispatch(loadLocalInfo(userInfo))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { LayoutAnimation } from 'react-native';

import { toggleSearchButton } from '../actions';
import dashboard from '../../dashboard'

import SearchButton from './SearchButton'

class SearchButtonContainer extends Component {

	handleOpenClose() {
		if (this.props.selectedTab === "map") {
			LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
			this.props.toggleSearchButton()
		} else {
			this.props.setSelectedTab("map")
		}
	}

	handleNavigate(tab) {
		this.props.setSelectedTab(tab)
	}

	render() {
		return (
			<SearchButton 
				handleOpenClose={this.handleOpenClose.bind(this)} 
				handleNavigate={this.handleNavigate.bind(this)}
				{...this.props} />
			)
	}
}

function mapStateToProps(state) {
	return {
		layoutInfo: state.dashboard.layoutInfo,
		searchButtonOpen: state.searchButtonOpen,
		selectedTab: state.dashboard.selectedTab
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		toggleSearchButton() {
			dispatch(toggleSearchButton())
		},
		setSelectedTab(tab) {
			dispatch(dashboard.actions.setSelectedTab(tab))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchButtonContainer)
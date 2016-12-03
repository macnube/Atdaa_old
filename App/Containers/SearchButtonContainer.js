import React, { Component } from 'react'
import { connect } from 'react-redux';
import { setSelectedTab, togglePlus } from '../actions/dashboard';

import SearchButton from '../Components/SearchButton'

class SearchButtonContainer extends Component {

	render() {
		return <SearchButton {...this.props} />
	}
}

function mapStateToProps(state) {
	return {
		layoutInfo: state.dashboard.layoutInfo,
		open: state.dashboard.plusOpen
	}
}

export default connect(mapStateToProps, { setSelectedTab, togglePlus })(SearchButtonContainer)
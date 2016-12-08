import React, { Component } from 'React';
import { connect } from 'react-redux';

import {
	ListView,
} from 'react-native'

import dashboard from '../../dashboard';
import login from '../../login'
import { addPlace } from '../actions'
import ManageTags from './ManageTags'
import api from '../../Utils/api'
import * as helpers from '../../Utils/helpers';



class ManageTagsContainer extends Component {

	constructor(props) {
		super(props);
		this.ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !==r2
		});
		var iconData = helpers.getAllCategories();
		this._data = [];
		this.state = {
			dataSource: this.ds.cloneWithRows(iconData),
			categoryIcon: null,
			scrollEnabled: true,
			selectedTags: [...this.props.placeInfo.tags],
		};
	}

	handleAddPlace() {
		const newPlace = {
			...this.props.placeInfo, 
			isNew: false,
			primaryIcon: helpers.getPrimaryIcon(this.state.selectedTags),
			tags: this.state.selectedTags
		}
		const currentTime = new Date().getTime() / 1000
		api.updateMyPlaces(this.props.userId, this.props.myPlaces, newPlace, currentTime)
		this.props.addPlace(newPlace, currentTime)
	}

	handleBackToCategory() {
		var iconData = helpers.getAllCategories();
		this.setState({
			dataSource: this.ds.cloneWithRows(iconData),
			categoryIcon: null
		})
	}

	handleAddRemoveTag(tag) {
		console.log("here in handleAddRemoveTag", tag);
		
		var selectedTags = this.state.selectedTags
		const index = selectedTags.indexOf(tag.id)
		if (index === -1 ) {
			selectedTags = [...selectedTags, tag.id]
		} else {
			selectedTags = [...selectedTags.slice(0, index), ...selectedTags.slice(index + 1)]
		}
		this.setState({
			selectedTags: selectedTags,
			dataSource: this.ds.cloneWithRows(this._setSelectedTags(this._data, selectedTags))
		})
	}
	
	handleShowTags(category) {
		console.log("category icon is:", category);
		this._data = this._setSelectedTags(helpers.getTagsByCategoryId(category.id), this.state.selectedTags);
		console.log("NewData from handleShowTags", this._data);
		this.setState({
			dataSource: this.ds.cloneWithRows(this._data),
			categoryIcon: category
		})
	}
	
	_setSelectedTags(tagData, selectedTags) {
		return tagData.map( (tag) => {
			if (selectedTags.indexOf(tag.id) > -1) {
				return {...tag, selected: true}
			} else return {...tag, selected: false}

		})
	}
	

	render () {
		console.log("Rerendering ManageTagsContainer with props", this.props);
		return (
			<ManageTags
				dataSource={this.state.dataSource}
				categoryIcon={this.state.categoryIcon}
				layoutInfo={this.props.layoutInfo}
				scrollEnabled={this.state.scrollEnabled}
				handleShowTags={this.handleShowTags.bind(this)}
				handleAddRemoveTag={this.handleAddRemoveTag.bind(this)}
				handleAddPlace={this.handleAddPlace.bind(this)}
				handleBackToCategory={this.handleBackToCategory.bind(this)}
				handleBackToPlaceInfo={() => this.props.setSelectedTab('placeInfo')}
				handleBackToMap={() => this.props.setSelectedTab('map')}
				selectedTags={this.state.selectedTags} />
		)
	}
}

const mapStateToProps = (state) => {
	return {
		layoutInfo: dashboard.selectors.getLayoutInfo(state.dashboard),
		placeInfo: state.placeInfo,
		myPlaces: state.myPlaces,
		userId: login.selectors.getUserId(state.user)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addPlace(place, currentTime) {
			dispatch(addPlace(place, currentTime))
		},
		setSelectedTab(tab) {
			dispatch(dashboard.actions.setSelectedTab(tab))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageTagsContainer)
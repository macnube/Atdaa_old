import React, { Component } from 'React';
import { connect } from 'react-redux';

import {
	ListView,
} from 'react-native'

import dashboard from '../../dashboard'
import toolbar from '../../toolbar'
import { setNewIcon } from '../actions'
import { getAllCategories, getIconById, getTagsByCategoryId, getCategoryIdByTagId } from '../../Utils/helpers'
import IconSearch from './IconSearch'



class IconSearchContainer extends Component {

	constructor(props) {
		super(props);
		this.ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !==r2
		});
		var data, categoryIcon;
		if (this.props.iconSelected.id === 'empty') {
			data = this._getData(this.props.toolbar);
			categoryIcon = null;
		} else {
			categoryId = getCategoryIdByTagId(this.props.iconSelected.id)
			categoryIcon = getIconById(categoryId)
			data = [categoryIcon, ...getTagsByCategoryId(categoryIcon.id)]
		}
		this.state = {
			dataSource: this.ds.cloneWithRows(data),
			categoryIcon: categoryIcon,
			scrollEnabled: true
		};
	}

	componentWillReceiveProps(nextProps) {
		console.log("NextProps are", nextProps);
		if (!this.state.categoryIcon || nextProps.iconSelected.id === 'empty') {
			const data = this._getData(nextProps.toolbar)
			this.setState({
				dataSource: this.ds.cloneWithRows(data),
				categoryIcon: null
			})
		}
	}

	handleBackToCategory() {
		var iconData = this._getData(this.props.toolbar, null);
		this.setState({
			dataSource: this.ds.cloneWithRows(iconData),
			categoryIcon: null
		})
	}

	
	handleShowTags(icon) {
		console.log("category icon is:", icon);
		var categoryIcon = {
			...icon,
			imageURI: icon.imageURI.split('_')[0]
		}
		var newData = [categoryIcon, ...getTagsByCategoryId(icon.id)];
		console.log("NewData from handleShowTags", newData);
		this.setState({
			dataSource: this.ds.cloneWithRows(newData),
			categoryIcon: categoryIcon
		})
	}
	
	handleNewIcon(icon, e) {
		icon = {
			...icon,
			imageURI: icon.imageURI.split('_')[0]
		}
		var newIcon = {
			info: icon,
			left: e.nativeEvent.pageX,
			top: e.nativeEvent.pageY
		}
		this.props.setNewIcon(newIcon);
	}

	handleUpdateToolbar(icon) {
		this.props.updateToolbarIcon(icon.id, this.props.iconSelected.priority);

	}

	_getData(toolbar) {
		var categories = getAllCategories();
		var filterCategories = toolbar.map( (filter) => getCategoryIdByTagId(filter.id))
		return categories.map( (category) => {
			if (filterCategories.indexOf(category.id) > -1) {
				return category
			} else {
				return {
					...category,
					imageURI: category.imageURI + "_inactive"
				}
			}
		})
	}

	render () {
		console.log("Rerendering IconSearchContainer with props", this.props);
		return (
			<IconSearch
				dataSource={this.state.dataSource}
				categoryIcon={this.state.categoryIcon}
				layoutInfo={this.props.layoutInfo}
				scrollEnabled={this.state.scrollEnabled}
				handleNewIcon={this.handleNewIcon.bind(this)}
				handleShowTags={this.handleShowTags.bind(this)}
				handleBackToCategory={this.handleBackToCategory.bind(this)}
				handleBackToMap={() => this.props.setSelectedTab("map")}
				handleUpdateToolbar={this.handleUpdateToolbar.bind(this)} />
		)
	}
}

const mapStateToProps = (state) => {
	return {
		layoutInfo: dashboard.selectors.getLayoutInfo(state.dashboard),
		toolbar: toolbar.selectors.getFilters(state.toolbar),
		iconSelected: state.toolbar.iconSelected
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setNewIcon(icon) {
			dispatch(setNewIcon(icon))
		},
		setSelectedTab(tab) {
			dispatch(dashboard.actions.setSelectedTab(tab))
		},
		updateToolbarIcon(icon, index) {
			dispatch(toolbar.actions.updateToolbarIcon(icon, index))
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(IconSearchContainer)
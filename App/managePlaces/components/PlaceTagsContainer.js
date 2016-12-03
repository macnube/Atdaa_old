import React, { Component } from 'react'
import { ListView } from 'react-native'

import { getCategoryTagCountArray } from '../../Utils/helpers'

import PlaceTags from './PlaceTags'

class PlaceTagsContainer extends Component {
	constructor(props) {
		super(props);
		const ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !==r2
		});
		console.log("Props from PlaceTagsContainer", props);
		const data = getCategoryTagCountArray(this.props.place.tags)
		this.state = {
			dataSource: ds.cloneWithRows(data)
		}
	}

	render() {
		return (
			<PlaceTags dataSource={this.state.dataSource}/>
		)
	}
}

PlaceTagsContainer.propTypes = {
	place: React.PropTypes.object.isRequired,
}

export default PlaceTagsContainer;
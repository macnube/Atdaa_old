import React, { Component } from 'React';

import {
	View,
	StyleSheet,
	ListView,
	Text,
	TouchableHighlight
	
} from 'react-native'

import DraggableAnimatedSearchIcon from './DraggableAnimatedSearchIcon';
import IconRow from '../Components/IconRow';
import IconSearchBar from '../Components/IconSearchBar'; 
import IconSearchSectionHeader from '../Components/IconSearchSectionHeader';

import helpers from '../Utils/helpers';

import Icons from '../Components/Resources/Icons';



//Think about having favorite category so that users can always see their favorites at the top of the search

var data = {
	icons: Icons
}

export default class IconSearch extends Component {

	constructor(props) {
		super(props);
		const ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !==r2
		});
		var iconData = Icons.filter( icon => icon.imageURI)
		this.state = {
			dataSource: ds.cloneWithRows(iconData),
			categoryView: true,
		};
	}
	/*
	handleShowChildren(id) {
		const ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !==r2
		});
		var newData = IconList[id];
		console.log("NewData from handleShowChildren", newData);
		this.setState({
			dataSource: ds.cloneWithRows(newData.children)
		})
	}
	*/

	renderRow(data) {
		var styleRow = {
			margin: 5,
			marginBottom: 10,
			width: 100,
			height: 80,
			flexDirection: "column",
			justifyContent: "space-between"
		}
		return (
			<IconRow
				style={styleRow}
				layoutInfo={this.props.layoutInfo}
				icon={data}
				handleNewIcon={this.props.setNewIcon}/>

		)
	}

	renderSearchComponent() {
		return (
			<View
				style={styles.listContainer}>
				<ListView
					contentContainerStyle={styles.contentContainer}
					dataSource={this.state.dataSource}
					renderRow={(data) => this.renderRow(data)}
					renderHeader={() => {
						return (
							<IconSearchBar
								style={[styles.searchBar, {width: this.props.layoutInfo.toolbar.width}]} />
						)
					}}
					scrollEnabled={this.props.scrollEnabled}
					enableEmptySections={true} />
			</View>
		)
	}

	render () {
		console.log("Rerendering IconSearch with props", this.props);
		return (
			<View
				style={this.props.style}>
				{this.renderSearchComponent()}
			</View>			
		)
	}
}

var styles = StyleSheet.create({
	listContainer: {
		flex: 1,
		backgroundColor: "#292E37"
	},
	contentContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		alignItems: "flex-start",
		justifyContent: "center",
		zIndex: -1
	},
	searchBar: {
		flex: 1,
		padding: 8,
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 10
	},
	sectionHeader: {
    flex: 1,
    padding: 8,
    flexDirection: "row",
    backgroundColor: 'white',
  },
	list: {
		flex: 1,
		marginTop: 30,
	},
	textClosed: {
		color: "white",
		fontSize: 15
	},
	textOpen: {
		alignSelf: "center",
		color: "white",
		fontSize: 15
	}
})
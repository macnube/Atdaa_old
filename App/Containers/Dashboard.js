import React, { Component } from 'react'
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import {
	View,
	StyleSheet,
	Dimensions,
	AsyncStorage
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MapView from 'react-native-maps';

import NavBar from '../Components/NavBar';
import ToolBarContainer from './ToolBarContainer';
import IconSearch from './IconSearch'
import DraggableAnimatedSearchIcon from './DraggableAnimatedSearchIcon';
import Main from '../Components/Main';

import helpers from '../Utils/helpers';
import api from '../Utils/api';
//Todo: 
//Create a loadState and saveState function
//Need to subscribe so that saveState is called every time new data is available.
//Don't want to save UI state, only data.
//Think about using 'node-uuid' library to create unique ids every time.
//import 'v4' from 'node-uuid'
//explore lodash library and throttle to ensure that the inner function isn't called more than specified 
//import throttle from 'lodash/throttle'

class Dashboard extends Component {

	constructor(props) {
		super(props);
		console.log("This is props from Dashboard", props);
		this.state = {
			searchScrollEnabled: true,
			searchMarker: null,
			poiMarker: null
		}
	}
	
	/*
	componentDidMount() {
		this._loadLocalUserInfo().done();
	}

	_loadLocalUserInfo = async() => {
		try {
			//var localUserInfo = await AsyncStorage.getItem(this.props.userID);
			var localUserInfo = null;
			if (localUserInfo !== null) {
				console.log("Successfully read local userInfo", localUserInfo)
			} else {
				console.log("No local userInfo on disk")
				api.setLocalUserInfo(this.props.userID, JSON.stringify(userInfo));
		} catch (error) {
			console.log("Error trying to read local userInfo", error);
		}
	}
	*/

	handleRotation() {
		this.props.setLayout(helpers.getLayout());
	}

	renderNewIcon() {
		const { newIcon } = this.props.dashboard
		if (newIcon) console.log("NewIcon has value of:", newIcon);
		var icon = newIcon
					? <DraggableAnimatedSearchIcon
							icon={newIcon.icon}
							top={newIcon.top}
							left={newIcon.left}
							layoutInfo={this.props.dashboard.layoutInfo}
							onScrollSwitch={() => {
								this.setState({
									searchScrollEnabled: !this.state.searchScrollEnabled
								});
							}}
							onToolbarUpdate={this.handleToolbarUpdate.bind(this)}/>
					: <View />
		return icon

	}

	render() {
		const { selectedTab, layoutInfo } = this.props.dashboard;
		return (
			<View 
				style={styles.container}
				onLayout={this.handleRotation.bind(this)}>
				<NavBar 
					layoutInfo={layoutInfo}
					selectedTab={selectedTab}
					setSelectedTab={this.props.setSelectedTab} />
				<Main
				layoutInfo={layoutInfo}
				searchScrollEnabled={this.state.searchScrollEnabled}
				selectedTab={selectedTab}
				searchMarker={this.state.searchMarker}
				poiMarker={this.state.poiMarker}
				handleComponentChange={(component, searchMarker=null, poiMarker=null) => {
					console.log("component from handleComponentChange on Dashboard", component)
					console.log("searchMarker from handleComponentChange on Dashboard", searchMarker)
					console.log("poiMarker from handleComponentChange on Dashboard", poiMarker)
					this.setState({
						selectedTab: component,
						searchMarker: searchMarker,
						poiMarker: poiMarker
					})
				}} 
				{...this.props} />
				<ToolBarContainer />
				{this.renderNewIcon()}
			</View>

		)
	}
}

var styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column'
	},
	toolbar: {
		position: "absolute",
		bottom: 0,
		left: 0,
		flexDirection: "row",
		backgroundColor: 'transparent',
		justifyContent: 'space-around',
		alignItems: 'center',
	}
})

function mapStateToProps(state) {
	return {
		user: state.user,
		dashboard: state.dashboard
	}

}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(ActionCreators, dispatch);
}

/*
Can also use this signature for mapDispatchToProps
const mapDispatchToProps = (dispatch) {
	onTrashToggle() {
		dispatch(toggleTrash())
	},
	setSelectedTab(tab) {
		dispatch(setSelectedTab(tab))
	}
}
*/

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

/*
Can also update here directly to get dispatch 

export default connect(mapStateToProps, {setSelectedTab: setSelectedTab, onTrashToggle: trashToggle})
*/
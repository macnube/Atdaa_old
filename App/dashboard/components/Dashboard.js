import React, { Component } from 'react'
import {
	View,
	StyleSheet,
	Dimensions,
	AsyncStorage
} from 'react-native';

import Main from './Main';
import NavBar from './NavBar';
import SearchIcon from './SearchIcon';

import toolbar from '../../toolbar'

const { ToolbarContainer } = toolbar

const Dashboard = (props) => {
	const { layoutInfo, selectedTab } = props.dashboard;
	const { updateToolbarIcon, setSelectedTab, 
		handleLayout, newIcon, clearNewIcon} = props;
	const renderIcon = () => {
		if (newIcon) {
			return (
				<SearchIcon
					icon={newIcon}
					layoutInfo={layoutInfo}
					updateToolbarIcon={updateToolbarIcon}
					clearNewIcon={clearNewIcon}/>
			)
		} else return <View />
	}
	return(
		<View 
			style={styles.container}
			onLayout={handleLayout}>
			<NavBar 
				layoutInfo={layoutInfo}
				selectedTab={selectedTab}
				setSelectedTab={setSelectedTab}
				isVisible={props.navVisible} />
			<Main selectedTab={selectedTab} placeInfo={props.placeInfo}/>
			<ToolbarContainer />
			{renderIcon()}
		</View>
	)
}

export default Dashboard;

Dashboard.propTypes = {
	dashboard: React.PropTypes.object.isRequired,
	updateToolbarIcon: React.PropTypes.func.isRequired,
	setSelectedTab: React.PropTypes.func.isRequired,
	handleLayout: React.PropTypes.func.isRequired,
	navVisible: React.PropTypes.bool,
	newIcon: React.PropTypes.object,
	clearNewIcon: React.PropTypes.func.isRequired
}

Dashboard.defaultProps = {
	navVisible: true,
	newIcon: null,
}



var styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
	},
	toolbar: {
		position: "absolute",
		bottom: 0,
		left: 0,
		flexDirection: "row",
		backgroundColor: 'transparent',
		justifyContent: 'space-around',
		alignItems: 'center',
	},
})
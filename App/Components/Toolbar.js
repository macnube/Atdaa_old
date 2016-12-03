import React, { Component } from 'react'

import {
	View,
	StyleSheet
} from 'react-native'

import DraggableToolBarIcon from '../Containers/DraggableToolBarIcon';
import SearchButtonContainer from '../Containers/SearchButtonContainer';

const Toolbar = (props) => {
	console.log("Props going into Toolbar", props)
	const { layoutInfo, setSelectedTab, toggleTrash, handleDrop } = props
	const { height, width } = layoutInfo.toolbar
	

	function getIconContainerStyle() {
		const { height, borderWidth } = layoutInfo.iconContainer
		return {
			flexDirection: "row",
			height: height,
			width: height,
			borderRadius: height * .5,
			borderColor: 'white',
			borderWidth: borderWidth
		}
	}

	function renderIconDropZones() {
		return props.toolbar.map( (icon, index) => {
			return <View key={index} style={getIconContainerStyle()} />
		});
	}

	function renderIcons() {
		return props.toolbar.map( (icon, index) => {
			console.log("Icon #", index, " is ", icon);
			if (icon.name === "plus") {
				return <SearchButtonContainer key={index}/>
			} else if (icon.name === "empty") {
					return <View key={index}style={{position: "absolute"}} />
			} else {
				return (
					<DraggableToolBarIcon
						key={index}
						icon={icon}
						layoutInfo={layoutInfo}
						toggleTrash={toggleTrash}
						onDrop={handleDrop}/>
				)
			}
		})
	}
	
	return (
		<View style={[styles.toolbar, {height: height, width: width}]}>
			{renderIconDropZones()}
			{renderIcons()}
		</View>
	)
}

var styles = StyleSheet.create({
	toolbar: {
		position: "absolute",
		bottom: 0,
		left: 0,
		flex: 1,
		flexDirection: "row",
		backgroundColor: 'transparent',
		justifyContent: 'space-around',
		alignItems: 'center',
	}
})

export default Toolbar;
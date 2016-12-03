import React from 'react';

import {
	ScrollView,
	Dimensions,
	StyleSheet
} from 'react-native';

import POICard from './POICard'


const POICards = (props) => {
	//Card width of 320 + margin of 10 times 2
	const { visiblePlaces, POICardId, setPOIId, setPlaceInfo, region } = props
	console.log("Props from POICards", props);
	const width = Dimensions.get('window').width;
	const cardWidth = .82 * width;
	const cardMargin = 10;
	const totalWidth = cardWidth + cardMargin * 2
	const padding = (width - cardWidth) / 2 - cardMargin
	var cards, cardIndex, placeInfo;
	const filteredPlacesIds = visiblePlaces.placeIds.filter( (id) => {
		return visiblePlaces.places[id].score > 0
	})
	console.log("filteredPlacesIds", filteredPlacesIds);
	if (filteredPlacesIds.indexOf(POICardId) > -1 ) {
		cardIndex = filteredPlacesIds.indexOf(POICardId);
		cards = filteredPlacesIds.map( (id, index) => {
			placeInfo = visiblePlaces.places[id]
			return <POICard margin={cardMargin} region={region} placeInfo={placeInfo} key={index} width={cardWidth} setPlaceInfo={setPlaceInfo}/>
		})
	} else {
		cardIndex = 0;
		placeInfo = visiblePlaces.places[POICardId]
		cards = <POICard margin={cardMargin} region={region} placeInfo={placeInfo} width={cardWidth} setPlaceInfo={setPlaceInfo}/>
	}
	return (
		<ScrollView
			onMomentumScrollEnd={(event) => {
				var offset = event.nativeEvent.contentOffset.x
				if (offset === 0) setPOIId(filteredPlacesIds[0]);
				else {
					console.log("Offset is: ", offset);
					const index = Math.round(offset / cardWidth)
					setPOIId(filteredPlacesIds[index])
				}
			}}
			contentContainerStyle={{paddingHorizontal: padding}}
			contentOffset={{x: cardIndex*totalWidth, y: 0}}
			style={styles.container}
			snapToInterval={cardWidth + cardMargin * 2}
			snapToAlignment="start"
			horizontal={true}
			showsHorizontalScrollIndicator={false}>
			{cards}
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		height: 110,
		width: Dimensions.get('window').width,
		zIndex: 10,
		marginTop: 15,
	},
})

export default POICards;
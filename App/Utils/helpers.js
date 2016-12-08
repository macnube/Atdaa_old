import {
	Dimensions
} from 'react-native';

import Icons from '../resources/Icons'
import IconTags from '../resources/IconTags'

//Icon and IconTag helpers

export const getAllIcons = () => {
	result = [];
	for (key in Icons) {
		result.push(Icons[key])
	}
	return result
}

export const getIconById = (id) => {
	return Icons[id]
}

export const getTagIdsByCategoryId = (categoryId) => {
	return IconTags[categoryId]
}

export const getTagsByCategoryId = (categoryId) => {
	return getTagIdsByCategoryId(categoryId).map( (tagId) => {
		return getIconById(tagId)
	})
}

export const getCategoryIdByTagId = (tagId) => {
	for (key in IconTags) {
		if (IconTags[key].indexOf(tagId) > -1) return key;
		else if (key === tagId) return tagId
	}
}

export const getAllCategories = () => {
	return getAllIcons().filter( icon => icon.type === 'category')
}

const getPlaceCategoryTagCount = (placeTags) => {
	return placeTags.reduce( (acc, tagId) => {
		var category = getCategoryIdByTagId(tagId);
		console.log("accumulator value", acc);
		if (category in acc) {
			acc[category] = acc[category].concat([tagId])
		} else {
			acc[category] = [tagId]
		}
		return acc;
	}, {})
}

export const getCategoryTagCountArray = (placeTags) => {
	const categoryTagCount = getPlaceCategoryTagCount(placeTags);
	var result = [];
	for (key in categoryTagCount) {
		result.push({ category: key, tags: categoryTagCount[key]})
	}
	return result;
}

export const getPrimaryIcon = (placeTags) => {
	return getIconById(getCategoryTagCountArray(placeTags).reduce( (acc, obj) => {
		if (obj.tags.length > acc.tags.length) {
			return obj
		} else return acc
	}).category)
}


//Place helpers

export const getLatestPlaces = (first, second) => {
	if (first.lastUpdated > second.lastUpdated) {
		return first
	} else return second
}

export const getDistanceFromLatLonInKm = (lat1,lon1,lat2,lon2) => {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return Math.round(d * 100) / 100;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

const placeTagsInCategory = (placeTags, categoryId) => {
	const categoryTags = getTagIdsByCategoryId(categoryId)
	return categoryTags.some( (categoryTag) => {
		return placeTags.indexOf(categoryTag) > -1
	})
}

const getPlaceScore = (place, filters) => {
	return filters.reduce( (acc, filter) => {
		if (filter.type === 'category') {
			if (placeTagsInCategory(place.tags, filter.id)) return acc+1
			else return acc
		}
		else if (place.tags.indexOf(filter.id) > -1) {
			return acc+1
		} else return acc
	}, 0)
}

const isOnMap = (place, region) => {
	const inLat = (Math.abs(place.latlng.latitude) > Math.abs(region.latitude) - region.latitudeDelta / 2) && 
		(Math.abs(place.latlng.latitude) < Math.abs(region.latitude) + region.latitudeDelta / 2)
	const inLng = (Math.abs(place.latlng.longitude) > Math.abs(region.longitude) - region.longitudeDelta / 2) && 
		(Math.abs(place.latlng.longitude) < Math.abs(region.longitude) + region.longitudeDelta / 2)
	return inLat && inLng;
}

export const getVisiblePlaces = (myPlaces, filters, region) => {
	const placeIds = myPlaces.placeIds.filter( (placeId) => {
		const place = myPlaces.myPlacesById[placeId]
		return isOnMap(place, region)
		})
	console.log("PlaceIds from getVisiblePlaces", placeIds);
	const places = placeIds.reduce( (acc, id) => {
		acc[id] = {...myPlaces.myPlacesById[id], score: getPlaceScore(myPlaces.myPlacesById[id], filters)}
		return acc
	}, {})
	console.log("Places from getVisiblePlaces", places);
	return {
		placeIds: placeIds,
		places: places
	}
}

export const formatPlaceDetails = (details, myPlaces) => {
	console.log("Details from formatPlaceDetails", details);
	if (details.opening_hours) {
		var openText = details.opening_hours.open_now ?
		'Open Now' :
		'Closed'
		var weekday = details.opening_hours.weekday_text
	} else {
		var openText = 'Unknown'
		var weekday = 'Unknown'
	}
	var type = details.types[0];
	const isNew = myPlaces.placeIds.indexOf(details.place_id) === -1;
	const tags = isNew ? [] : myPlaces.myPlacesById[details.place_id].tags
	const primaryIcon = isNew ? {imageURI: 'plusIcon'} : myPlaces.myPlacesById[details.place_id].primaryIcon

	type = type[0].toUpperCase() + type.slice(1);
	return {
		name: details.name,
		isNew: isNew,
		tags: tags,
		primaryIcon: primaryIcon,
		phone: details.international_phone_number,
		type: type,
		latlng: {
			latitude: details.geometry.location.lat,
			longitude: details.geometry.location.lng
		},
		address: details.formatted_address,
		photos: details.photos,
		photoURI: null,
		place_id: details.place_id,
		open: {
			open_now: openText,
			weekday: weekday
		}
	}
}

export const inDropZone = (gesture, zone, layoutInfo, index) => {
	var xmin, xmax, ymin, ymax;
	if (index === 4) {
		xmin = zone.xmin - layoutInfo.icon.spacing * .8;
		xmax = zone.xmax + layoutInfo.icon.spacing * .8;
		ymin = zone.ymin + layoutInfo.toolbar.yStart - layoutInfo.icon.spacing * .8;
		ymax = zone.ymax + layoutInfo.toolbar.yStart + layoutInfo.icon.spacing * .8; 
	} else {
		xmin = zone.xmin;
		xmax = zone.xmax;
		ymin = zone.ymin + layoutInfo.toolbar.yStart;
		ymax = zone.ymax + layoutInfo.toolbar.yStart;
	}
	return (gesture.moveX > xmin && gesture.moveX < xmax) && 
					(gesture.moveY > ymin && gesture.moveY < ymax)
}


export const getLayout = () => {
	const height = Dimensions.get('window').height;
	const width = Dimensions.get('window').width;
	const isVertical = height > width;
	const toolPaddingTop = 15;
	const toolHorizontalPadding = 30;
	const toolbarLength = 5;
	const iconPercent = .125;
	const modifier = isVertical ? .2 : .2;
	const iconHeight = .16 * width;
	const toolHeight = iconHeight * 2;
	const borderWidth = 2;
	const iconSpacing = (width - toolbarLength * iconHeight) / toolbarLength;
	var dropZones = [];
	for (var i = 0; i < toolbarLength; i++) {
		var x = iconSpacing / 2 + i * (iconHeight + iconSpacing); 
		dropZones.push({
			xmin: x,
			xmax: x + iconHeight,
			ymin: toolPaddingTop,
			ymax: iconHeight 
		})
	};
	return {
		isVertical: isVertical,
		toolbar: {
			height: toolHeight,
			width: width,
			yStart: height - toolHeight,
			paddingTop: toolPaddingTop,
			paddingHorizontal: toolHorizontalPadding
		},
		navbar: {
			height: toolHeight * .6
		},
		iconContainer: {
			height: iconHeight,
			borderWidth: borderWidth,
		},
		icon: {
			height: iconHeight,
			spacing: iconSpacing,
			yStart: toolPaddingTop
		},
		searchIcon: {
			height: iconHeight * 1.2
		},
		dropZones: dropZones
	}
}

export const sortToolbar = (toolbar) => {
	return toolbar.sort( (a,b) => {
		if (a.priority < b.priority) {
			return -1
		} else {
			return 1
		}
	})
}
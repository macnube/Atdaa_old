import React from 'react';
import { Provider } from 'react-redux';
import AppContainer from './AppContainer';
import login from '../login'
import {
	NavigatorIOS, 
} from 'react-native';

const { SplashContainer } = login


const Root = ({ store }) => {
	console.log("this is store", store.getState());
	return (
		<Provider store={store}>
			<NavigatorIOS
				style={{flex: 1}}
	      initialRoute={{
	        title: "SatisFI",
	        component: SplashContainer,
	        
	      }}
	      navigationBarHidden={true} 
	    />
		</Provider>
	)
};

export default Root;
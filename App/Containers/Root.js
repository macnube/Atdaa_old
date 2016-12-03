import React from 'react';
import { Provider } from 'react-redux';
import AppContainer from './AppContainer';
import dashboard from '../dashboard'
import {
	NavigatorIOS, 
} from 'react-native';

const { DashboardContainer } = dashboard

const Root = ({ store }) => {
	console.log("this is store", store.getState());
	return (
		<Provider store={store}>
			<NavigatorIOS
				style={{flex: 1}}
	      initialRoute={{
	        title: "SatisFI",
	        component: DashboardContainer,
	        
	      }}
	      navigationBarHidden={true} 
	    />
		</Provider>
	)
};

export default Root;
import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Auth from '../Auth';

const Main = props => (
	<Switch>
		<Route path = "/auth" component = {Auth} />
	</Switch>
	);

export default Main;
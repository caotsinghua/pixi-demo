import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Container from './pages/Container';
import TransparentBackground from './pages/TransparentBackground';
const routes = [
	{
		path: '/',
		component: Container,
		children: [
			{
				path: '/transparent',
				component: TransparentBackground
			}
		]
	}
];

export function createRouter(routes) {
	return routes.map(({ path, component:Component, routes }) => {
		return (
			<Route
				path={path}
				render={props => {
					return <Component {...props} routes={routes}></Component>;
				}}
			/>
		);
	});
}

export default routes;

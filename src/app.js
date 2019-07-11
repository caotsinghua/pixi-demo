import React from 'react';
import { render } from 'react-dom';
import { HashRouter, Route, Switch,Redirect } from 'react-router-dom';
import * as PIXI from 'pixi.js';
import Tining from './pages/Tining'
import Container from './pages/Container';
import CacheAsBitMap from './pages/CacheAsBitMap'
const type = PIXI.utils.isWebGLSupported() ? 'WebGL' : 'canvas';
PIXI.utils.sayHello(type);
console.log(document.getElementById('app'));
render(
	<HashRouter>
		<Switch>
			<Route path='/' exact component={()=><Redirect to='/index' />} />
			<Route path='/index' component={Container} />
			<Route path='/tining' component={Tining} />
			<Route path="/cacheAsBitMap" component={CacheAsBitMap}/>
		</Switch>
	</HashRouter>,
	document.getElementById('app')
);

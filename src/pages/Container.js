import React, { useRef, useEffect } from 'react';
import * as PIXI from 'pixi.js';
import { HashRouter,Link, Switch, Route } from 'react-router-dom';
import vuePng from '../images/vue.png';
import TransparentBackground from './TransparentBackground';

function Container(props) {
	const canvasRef = useRef(null);
	useEffect(() => {
		let app = new PIXI.Application({ width: 200, height: 200, backgroundColor: 0x1099bb, view: canvasRef.current });
		const container = new PIXI.Container();
		const texture = PIXI.Texture.from(vuePng);
		app.stage.addChild(container);
		console.log(app.screen.width, app.screen.height);
		const bunnys = [];

		for (let i = 0; i < 9; i++) {
			const bunny = new PIXI.Sprite(texture);
			bunny.width = 20;
			bunny.height = 20;
			bunny.anchor.set(0.5);
			bunny.x = (i % 3) * 20;
			bunny.y = Math.floor(i / 3) * 20;
			bunnys[i] = bunny;
			container.addChild(bunny);
		}
		console.log(bunnys);
		console.log(container.width, container.height);
		console.log({
			'pivot.x': container.pivot.x,
			'pivot.y': container.pivot.y
		});
		//居中
		container.pivot.x = container.width / 2;
		container.pivot.y = container.height / 2;
		container.x = app.screen.width / 2;
		container.y = app.screen.height / 2;

		app.ticker.add(delta => {
			// container.rotation -= 0.01 * delta;
			// console.log(bunnys)
			bunnys.forEach(bunny => {
				let random = Math.random() * 0.1;
				let fu = Math.floor(random * 100) % 2 == 0 ? -random : random;
				bunny.rotation += fu * delta;
			});
		});
		console.log('hello');
	}, []);
	return (
		<div id='container-demo'>
			<canvas id='container-canvas' ref={canvasRef} />
			<div>
				<h1>sub</h1>
                <Link to="/index/transparent">条</Link>
				<Route path='/index/transparent' component={TransparentBackground} />
			</div>
		</div>
	);
}

export default Container;

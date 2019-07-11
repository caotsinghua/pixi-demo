import React, { useRef, useEffect } from 'react';
import * as PIXI from 'pixi.js';
import { HashRouter, Link, Switch, Route } from 'react-router-dom';
import vuePng from '../images/vue.png';
import TransparentBackground from './TransparentBackground';

function Container(props) {
	const canvasRef = useRef(null);
	useEffect(() => {
		createCanvas(canvasRef.current);
	}, []);
	return (
		<div id='tining-demo'>
			<canvas ref={canvasRef} />
		</div>
	);
}

function createCanvas(view) {
	let app = new PIXI.Application({view});
	const aliens = [];
	const totalDudes = 20;
	for (let i = 0; i < totalDudes; i++) {
		const dude = PIXI.Sprite.from(vuePng);
		dude.anchor.set(0.5);
		dude.scale.set(0.8 + Math.random() * 0.3);
		dude.x = Math.random() * app.screen.width;
        dude.y = Math.random() * app.screen.height;
        dude.width=Math.random()*50;
        dude.height=Math.random()*50;
		dude.tint = Math.random() * 0xffffff;
		dude.direction = Math.random() * Math.PI * 2;
		dude.turningSpeed = Math.random() - 0.8;
		dude.speed = 2 + Math.random() * 2;
		aliens.push(dude);
		app.stage.addChild(dude);
    }
	const dudeBoundsPadding = 100;
	const dudeBounds = new PIXI.Rectangle(
		-dudeBoundsPadding,
		-dudeBoundsPadding,
		app.screen.width + dudeBoundsPadding * 2,
		app.screen.height + dudeBoundsPadding * 2
	);

	app.ticker.add(delta => {
		// console.log({ delta });
		for (let i = 0; i < aliens.length; i++) {
			const dude = aliens[i];
			dude.direction += dude.turningSpeed * 0.01;
			dude.x += Math.sin(dude.direction) * dude.speed;
			dude.y += Math.cos(dude.direction) * dude.speed;
			dude.rotation = -dude.direction - Math.PI / 2;
			// wrap the dudes by testing their bounds...
			if (dude.x < dudeBounds.x) {
				dude.x += dudeBounds.width;
			} else if (dude.x > dudeBounds.x + dudeBounds.width) {
				dude.x -= dudeBounds.width;
			}

			if (dude.y < dudeBounds.y) {
				dude.y += dudeBounds.height;
			} else if (dude.y > dudeBounds.y + dudeBounds.height) {
				dude.y -= dudeBounds.height;
			}
		}
	});
	console.log('hello');
}

export default Container;

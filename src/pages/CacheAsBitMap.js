import React, { useRef, useEffect } from 'react';
import PIXI from 'pixi.js';

function CacheAsBitMap(props) {
	const canvas = useRef;
	useEffect(() => {
		createCanvas(canvas.current);
	}, []);

	return <canvas ref={canvas} />;
}

function createCanvas(view) {
	const app = new PIXI.Application({ view });
	app.stop();
	app.loader.add('spriteSheet', '../sprites.json').load(onAssetsLoaded);
	const aliens = [];
	const alienFrames = ['p.png', 'scene.png', 'vue.png', 'wave.png'];
	let count = 0;
	const alienContainer = new PIXI.Container();
	alienContainer.x = 400;
	alienContainer.y = 300;
	app.stage.interactive = true;
	app.stage.addChild(alienContainer);

	function onAssetsLoaded() {
		for (let i = 0; i < 100; i++) {
			const frameName = alienFrames[i % 4];
			const alien = PIXI.Sprite.from(frameName);
			alien.tint = Math.random() * 0xffffff;
			// alien.scale.x=0.5;
			// alien.scale.y=0.5;
			alien.x = Math.random() * 800 - 400;
			alien.y = Math.random() * 600 - 300;
			alien.anchor.set(0.5);
			alien.scale.set(0.5);
			aliens.push(alien);
			alienContainer.addChild(alien);
		}
		// app.start();
	}

	app.stage.on('pointertap', e => {
		console.log('点击了');
		console.log(e);
		alienContainer.cacheAsBitmap = !alienContainer.cacheAsBitmap;
	});

	app.ticker.add(() => {
		for (let i = 0; i < 100; i++) {
			const alien = aliens[i];
			alien.rotation += 0.1;
		}
		count += 0.01;
		alienContainer.scale.x = Math.sin(count);
		alienContainer.scale.y = Math.sin(count);
		alienContainer.rotation += 0.01;
	});
}

export default CacheAsBitMap;

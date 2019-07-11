import React,{useRef,useEffect} from 'react';
import PIXI from 'pixi.js'

function CacheAsBitMap(props){
    const canvas=useRef;
    useEffect(()=>{
        createCanvas(canvas.current)
    },[])

    return (
        <canvas ref={canvas}></canvas>
    )
}

function createCanvas(view){
    const app=new PIXI.Application({view})
    app.stop();
    app.loader.add('spriteSheet','.json').load(onAssetsLoaded);
    const aliens=[];
    const alienFrames=[
        'eggHead.png',
        'flowerTop.png',
        'helmlok.png',
        'skully.png'
    ]
    let count=0;
    const alienContainer=new PIXI.Container();
    alienContainer.x=400;
    alienContainer.y=300;
    app.stage.interactive=true;
    app.stage.addChild(alienContainer);

    function onAssetsLoaded(){
        for(let i=0;i<100;i++){

        }
    }

}


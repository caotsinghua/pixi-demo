import * as PIXI from 'pixi.js'
import React ,{useEffect,useRef} from 'react'
import bunnyPng from '../images/vue.png';
function TransparentBackground (props){
    const canvas=useRef(null);
    useEffect(()=>{
        const app=new PIXI.Application({
            transparent:true,
            view:canvas.current
        })
        const bunny=PIXI.Sprite.from(bunnyPng);
        bunny.anchor.set(0.5);
        bunny.width=50;
        bunny.height=50;
        bunny.x=app.screen.width/2;
        bunny.y=app.screen.height/2;
        app.stage.addChild(bunny);
        app.ticker.add(()=>{
            bunny.rotation+=0.1;
        })
    },[])
    return (
        <div className="transparent-background">
            <div>aaa</div>
            <canvas ref={canvas}></canvas>
        </div>
    )
}
export default TransparentBackground;

import{p as o}from"./vendor.abe8152f.js";import{b as e}from"./sketch_utils.7ead99bc.js";new o((i=>{let t,n=.008,s=[];function a(){let e={position:new o.Vector(i.random(100,i.width-100),i.random(100,i.height-100)),velocity:new o.Vector,lifespan:500,color:255},n=i.map(e.position.x,0,i.width,0,t.width),s=i.map(e.position.y,0,i.height,0,t.height);return e.color=i.color(t.get(n,s)),e.color.setAlpha(25),e}function r(o){o.position.add(o.velocity),o.lifespan--}i.setup=()=>{i.createCanvas(i.windowWidth,i.windowHeight),i.background(0),e()},i.preload=()=>{t=i.loadImage("/Generative_Processes/assets/highway.3e90fe8d.jpg"),window.img=t},i.windowResized=()=>{i.resizeCanvas(i.windowWidth,i.windowHeight),i.background(0)},i.draw=()=>{i.strokeWeight(1);for(let o=0;o<100;o++)s.push(a());for(let e of s){let t=e.position.x,s=e.position.y,a=new o.Vector;a.x=i.map(i.noise(t*n,s*n,1),0,1,-1,1),a.y=i.map(i.noise(t*n,s*n,10),0,1,-1,1),e.velocity.add(a),e.velocity.mult(.7),r(e),i.stroke(e.color,35),e.lifespan%3==0&&i.point(t,s)}!function(o){for(let e=o.length-1;e>=0;e--)o[e].lifespan<=0&&o.splice(e,1)}(s)}}));

import{p as e}from"./vendor.abe8152f.js";import{a as o}from"./sketch_utils.7ead99bc.js";new e((e=>{let i,t=40,r=[];e.setup=()=>{e.createCanvas(e.windowWidth,e.windowHeight),i.resize(8,8),i.loadPixels();for(let o=0;o<i.pixels.length;o+=4){let t=i.pixels[o],s=i.pixels[o+1],a=i.pixels[o+2],d=e.color(t,s,a).toString();r.push(d)}o(e)},e.preload=()=>{i=e.loadImage("/Generative_Processes/assets/highway.3e90fe8d.jpg"),window.img=i},e.windowResized=()=>{e.resizeCanvas(e.windowWidth,e.windowHeight)},e.draw=()=>{e.background(0),e.rectMode(e.CENTER);for(let o=0;o<e.width;o+=t)for(let i=0;i<e.height;i+=t){e.push(),e.translate(o+20,i+20);let s=e.random(r),a=e.random(r);for(;(a=e.random(r))==s;);e.noStroke(),e.fill(s),e.rect(0,0,t),e.fill(a),e.rect(0,0,20),e.pop()}e.image(i,0,0),e.noLoop()}}));
import{p as e}from"./vendor.abe8152f.js";import{d as o}from"./sketch_utils.7ead99bc.js";new e((t=>{let i;t.setup=()=>{t.createCanvas(t.windowWidth,t.windowHeight),t.rectMode(t.CENTER),i={position:new e.Vector,velocity:new e.Vector,acceleration:new e.Vector}},t.windowResized=()=>{t.resizeCanvas(t.windowWidth,t.windowHeight)},t.draw=()=>{var n;t.noFill(),t.stroke(255),t.background(0),(n=i).velocity.add(n.acceleration),n.velocity.mult(.5),n.position.add(n.velocity),n.acceleration.mult(0),function(o){let i=new e.Vector(t.mouseX,t.mouseY).sub(o.position);i.mult(.1),o.acceleration.add(i)}(i),function(e){t.push(),t.translate(e.position.x,e.position.y),t.rotate(e.velocity.heading()),t.rect(0,0,50),t.pop()}(i),o(t,"Move the cursor across the screen.")}}));
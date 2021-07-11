import{p as e,G as o}from"./vendor.abe8152f.js";import{r as t}from"./sketch_utils.7ead99bc.js";new e((a=>{let d,n=[],s=["#8ecae6","#219ebc","#023047","#ffb703","#fb8500"],i={redraw_bg:!1,damping:1,seek:0,twitch:.3,separate:1.5,cohesion:1,align:1,reset:function(){a.background(255),n=[],t(d)}},r=!1;function c(e){a.rectMode(a.CENTER),a.stroke(e.color);let o=a.sin(.01*(e.id+a.frameCount)),t=a.map(o,-1,1,1,15);a.strokeWeight(t),a.push(),a.translate(e.pos.x,e.pos.y),a.rotate(e.vel.heading()),a.line(-20,0,20,0),a.pop()}function p(e){e.vel.add(e.acc),e.vel.mult(i.damping),e.pos.add(e.vel),e.acc.mult(0)}function l(e){e.pos.x<-100&&(e.pos.x=a.width+100),e.pos.y<-100&&(e.pos.y=a.height+100),e.pos.x>a.width+100&&(e.pos.x=-100),e.pos.y>a.height+100&&(e.pos.y=-100)}function m(o,t,a=1){let d=e.Vector.sub(t,o.pos);d.normalize(),d.mult(o.maxSpeed),u(o,d,a)}function u(o,t,a=1){let d=e.Vector.sub(t,o.vel);d.limit(o.maxForce),function(e,o,t=1){o.mult(t),e.acc.add(o)}(o,d,a)}function w(o,t,a=1){let d=new e.Vector,n=0;for(let s of t){let t=o.pos.dist(s.pos);if(t>0&&t<40){let a=e.Vector.sub(o.pos,s.pos);a.normalize(),a.div(t),d.add(a),n++}}n>0&&(d.div(n),d.setMag(o.maxSpeed),u(o,d,a))}function f(o,t,a=1){let d=new e.Vector,n=0;for(let e of t){let t=o.pos.dist(e.pos);t>0&&t<50&&(d.add(e.vel),n++)}n>0&&(d.div(n),d.normalize(),d.mult(o.maxSpeed),u(o,d,a))}function h(o,t,a=1){let d=new e.Vector,n=0;for(let e of t){let t=o.pos.dist(e.pos);t>0&&t<50&&(d.add(e.pos),n++)}n>0&&(d.div(n),m(o,d,a))}function g(e,o=1,t=a.PI/2,d=.01){let n=e.vel.copy(),s=a.noise((e.pos.x+a.frameCount)*d),i=a.map(s,0,1,-t,t);n.rotate(i),u(e,n,o)}a.setup=()=>{a.createCanvas(a.windowWidth,a.windowHeight),d=new o,d.add(i,"redraw_bg"),d.add(i,"damping",.8,1),d.add(i,"seek",0,2,.1),d.add(i,"twitch",0,2),d.add(i,"separate",0,2),d.add(i,"cohesion",0,2),d.add(i,"align",0,2),d.add(i,"reset"),d.close(),a.background(255)},a.windowResized=()=>{a.resizeCanvas(a.windowWidth,a.windowHeight)},a.keyPressed=()=>{" "==a.key&&(0==r?(a.noLoop(),r=!0):(a.loop(),r=!1)),"s"==a.key&&a.save("drawing.jpg")},a.draw=()=>{i.redraw_bg&&a.background(255),n.length<125&&n.push({pos:new e.Vector(a.random(a.width),a.random(a.height)),vel:new e.Vector(a.random(-1,1),a.random(-1,1)),acc:new e.Vector,maxSpeed:a.random(2,6),maxForce:a.random(.05,.2),color:a.random(s),id:a.frameCount});let o=new e.Vector(a.mouseX,a.mouseY);for(let e of n)m(e,o,.5),g(e,i.twitch),w(e,n,i.separate),f(e,n,i.align),h(e,n,i.cohesion),p(e),l(e),c(e)}}));

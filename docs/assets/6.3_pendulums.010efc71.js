import{p as t,b as e,R as s,i,c as n,L as o,M as h,S as a}from"./vendor.abe8152f.js";import{b as r}from"./sketch_utils.7ead99bc.js";new t((t=>{let l,c,w=!1,d=[];t.setup=()=>{t.createCanvas(t.windowWidth,t.windowHeight),r()},t.windowResized=()=>{t.resizeCanvas(t.windowWidth,t.windowHeight)},t.draw=()=>{if(t.background(0),w)for(let e of d)e.run(),t.translate(0,t.height/d.length);else t.fill(255),t.noStroke(),t.textAlign(t.CENTER),t.text("Click to start sound",t.width/2,t.height/2)},t.mousePressed=()=>{w||(w=!0,function(){let t="major pentatonic";c=new e;let o=new s({wet:.5,decay:30});c.connect(o),o.toDestination(),l=i.get("C3 "+t).notes,l=l.concat(i.get("C4 "+t).notes),l=l.concat(i.get("C5 "+t).notes),n.shuffle(l);for(let e=0;e<l.length;e++)d[e]=new f(.85+1*e/60,l[e])}())};class f{constructor(t,e){this.frequency=.5*t,this.note=e,this.lfo=new o(this.frequency),this.lfo.start(1),this.meter=new h,this.meter.normalRange=!0,this.lfo.connect(this.meter),this.synth=new a,this.synth.connect(c),this.previousPosition=0}run(){let e=.5-this.meter.getValue(0),s=t.map(e,-.5,.5,100,t.width-100),i=e>0&&this.previousPosition<0,n=e<0&&this.previousPosition>0;(i||n)&&this.synth.triggerAttackRelease(this.note,"8n"),this.previousPosition=e,t.fill(255),t.stroke(255),t.line(s,50,t.width/2,0),t.ellipse(s,50,25,25)}}}));

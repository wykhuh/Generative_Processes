import p5 from "p5";
import * as dat from "dat.gui";

const sketch = (s) => {
  let size = 5; // height of range
  let res = 0.1; // how much random is moved up and down

  s.setup = () => {
    s.createCanvas(s.windowWidth, s.windowHeight);
  };

  s.windowResized = () => {
    s.resizeCanvas(s.windowWidth, s.windowHeight);
  };

  s.draw = () => {
    s.background(0);
    s.stroke(255);
    s.strokeWeight(3);
    s.noFill();

    // move origin to halfway
    s.translate(0, s.height / 2);

    let r = s.random();

    // create line whose thickness is centered around height/2
    // drawing multiple vertex at random heights; connect all the vertex with
    // a line
    s.beginShape();
    for (let x = 0; x < s.width; x++) {
      r += s.random(-res, res);
      let y = s.map(r, 0, 1, -size, size);
      s.vertex(x, y);
    }
    s.endShape();
  };
};

const sketchInstance = new p5(sketch);

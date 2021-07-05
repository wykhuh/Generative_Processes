import p5 from "p5";
import * as dat from "dat.gui";

const sketch = (s) => {
  let gui;
  let settings = {
    size: 15, // height of range
    res: 0.01, // how much random is moved up and down
  };

  s.setup = () => {
    s.createCanvas(s.windowWidth, s.windowHeight);

    gui = new dat.GUI();
    gui.add(settings, "size", 5, 200);
    gui.add(settings, "res", 0.001, 1);
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

    // create line whose thickness is centered around height/2
    // drawing multiple vertex at random heights; connect all the vertex with
    // a line
    s.beginShape();
    for (let x = 0; x < s.width; x++) {
      let r = s.noise((s.frameCount + x) * settings.res);

      let y = s.map(r, 0, 1, -settings.size, settings.size);
      s.vertex(x, y);
    }
    s.endShape();
  };
};

new p5(sketch);

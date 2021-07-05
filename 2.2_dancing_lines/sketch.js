import p5 from "p5";
import * as dat from "dat.gui";
const sketch = (s) => {
  let settings = {
    res: 0.01,
  };
  let gui;

  s.setup = () => {
    s.createCanvas(s.windowWidth, s.windowHeight);
    s.background(0);

    gui = new dat.GUI();
    gui.add(settings, "res", 0.001, 0.02);
  };

  s.windowResized = () => {
    s.resizeCanvas(s.windowWidth, s.windowHeight);
    s.background(0);
  };

  s.draw = () => {
    s.stroke(255);
    s.strokeWeight(5);

    let x = s.noise(s.frameCount * settings.res) * s.width;
    // add constant so that noise for x and y will return a different value
    let y = s.noise(100 + s.frameCount * settings.res) * s.height;

    s.point(x, y);
  };
};

const sketchInstance = new p5(sketch);

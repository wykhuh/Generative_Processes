import p5 from "p5";
import * as dat from "dat.gui";
const sketch = (s) => {
  let settings = {
    res: 0.01,
    alpha: 128,
  };
  let gui;

  s.setup = () => {
    s.createCanvas(s.windowWidth, s.windowHeight);
    s.background(0);

    gui = new dat.GUI();
    gui.add(settings, "res", 0.001, 0.02);
    gui.add(settings, "alpha", 5, 255);
  };

  s.windowResized = () => {
    s.resizeCanvas(s.windowWidth, s.windowHeight);
    s.background(0);
  };

  s.draw = () => {
    // s.background(0);
    s.stroke(255, settings.alpha);
    s.strokeWeight(1);

    // add constant to noise so that noise for x and y will return a different value
    let x1 = s.noise(s.frameCount * settings.res) * s.width;
    let y1 = s.noise(100 + s.frameCount * settings.res) * s.height;

    let x2 = s.noise(200 + s.frameCount * settings.res) * s.width;
    let y2 = s.noise(300 + s.frameCount * settings.res) * s.height;

    s.line(x1, y1, x2, y2);
  };
};

const sketchInstance = new p5(sketch);

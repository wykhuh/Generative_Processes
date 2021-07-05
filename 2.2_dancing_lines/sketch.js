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
    s.background(0);
    s.stroke(255);
    s.strokeWeight(5);

    let x1 = s.noise(s.frameCount * settings.res) * s.width;
    // add constant so that noise for x and y will return a different value
    let y1 = s.noise(100 + s.frameCount * settings.res) * s.height;

    s.point(x1, y1);

    let x2 = s.noise(200 + s.frameCount * settings.res) * s.width;
    let y2 = s.noise(300 + s.frameCount * settings.res) * s.height;

    s.point(x2, y2);

    s.line(x1, y1, x2, y2);
  };
};

const sketchInstance = new p5(sketch);

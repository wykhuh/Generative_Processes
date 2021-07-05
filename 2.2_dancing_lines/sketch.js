import p5 from "p5";

const sketch = (s) => {
  let settings = {
    res: 0.01,
  };

  s.setup = () => {
    s.createCanvas(s.windowWidth, s.windowHeight);
  };

  s.windowResized = () => {
    s.resizeCanvas(s.windowWidth, s.windowHeight);
  };

  s.draw = () => {
    s.background(0);
    s.stroke(255);
    s.strokeWeight(5);

    let x = s.noise(s.frameCount * settings.res) * s.width;
    let y = s.height / 2;

    s.point(x, y);
  };
};

const sketchInstance = new p5(sketch);

import p5 from "p5";

const sketch = (s) => {
  s.setup = () => {
    s.createCanvas(s.windowWidth, s.windowHeight);
  };

  s.windowResized = () => {
    s.resizeCanvas(s.windowWidth, s.windowHeight);
  };

  s.draw = () => {
    s.circle(30, 30, 30);
  };
};

const sketchInstance = new p5(sketch);

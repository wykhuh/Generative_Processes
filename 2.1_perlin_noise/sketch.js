import p5 from "p5";

const sketch = (s) => {
  s.setup = () => {
    s.createCanvas(s.windowWidth, s.windowHeight);
  };

  s.windowResized = () => {
    s.resizeCanvas(s.windowWidth, s.windowHeight);
  };

  s.draw = () => {
    s.background(0);
    s.stroke(255);
    s.noFill();

    s.line(0, s.height / 2, s.width, s.height / 2);
  };
};

const sketchInstance = new p5(sketch);

import p5 from "p5";

const sketch = (s) => {
  let backgroundColor = "black";

  s.setup = () => {
    s.createCanvas(s.windowWidth, s.windowHeight);

    s.background(backgroundColor);
  };

  s.windowResized = () => {
    s.resizeCanvas(s.windowWidth, s.windowHeight);

    s.background(backgroundColor);
  };

  s.draw = () => {
    s.noFill();
    // stroke color
    s.stroke(255);

    s.circle(s.mouseX, s.mouseY, 50);
  };
};

const sketchInstance = new p5(sketch);

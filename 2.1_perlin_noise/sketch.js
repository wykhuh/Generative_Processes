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
    s.strokeWeight(3);
    s.noFill();

    // create a line by drawing multiple points
    for (let x = 0; x < s.width; x++) {
      let y = s.random() * s.height;
      s.point(x, y);
    }
  };
};

const sketchInstance = new p5(sketch);

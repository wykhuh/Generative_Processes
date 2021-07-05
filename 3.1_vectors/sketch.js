import p5 from "p5";

const sketch = (s) => {
  let position = new p5.Vector();

  s.setup = () => {
    s.createCanvas(s.windowWidth, s.windowHeight);
    // coordinates pased to rectangle refers to center of rectangle instead of
    // top left corner of rectangle
    s.rectMode(s.CENTER);

    position.x = 100;
    position.y = 200;
  };

  s.windowResized = () => {
    s.resizeCanvas(s.windowWidth, s.windowHeight);
  };

  s.draw = () => {
    s.background(0);
    s.noFill();
    s.stroke(255);

    s.rect(position.x, position.y, 50);
  };
};

new p5(sketch);

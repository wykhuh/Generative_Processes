import p5 from "p5";

const sketch = (s) => {
  let position = new p5.Vector();
  let velocity = new p5.Vector();

  s.setup = () => {
    s.createCanvas(s.windowWidth, s.windowHeight);
    // coordinates pased to rectangle refers to center of rectangle instead of
    // top left corner of rectangle
    s.rectMode(s.CENTER);

    position.x = s.width / 2;
    position.y = s.height / 2;

    velocity.x = s.random(-1, 1);
    velocity.y = s.random(-1, 1);
  };

  s.windowResized = () => {
    s.resizeCanvas(s.windowWidth, s.windowHeight);
  };

  s.draw = () => {
    s.background(0);
    s.noFill();
    s.stroke(255);

    position.x += velocity.x;
    position.y += velocity.y;

    s.rect(position.x, position.y, 50);

    drawVector();
  };

  function drawVector() {
    s.line(0, 0, position.x, position.y);

    // draw velocity vector
    s.push();
    s.translate(position.x, position.y);
    s.line(0, 0, velocity.x * 20, velocity.y * 20);
    s.pop();
  }
};

new p5(sketch);

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

    // diameter determined by how fast you move the mouse
    let circleDiameter = s.dist(s.mouseX, s.mouseY, s.pmouseX, s.pmouseY);

    s.circle(s.mouseX, s.mouseY, circleDiameter);
  };
};

new p5(sketch);

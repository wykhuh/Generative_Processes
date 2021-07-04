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

    // map will re-map a number from one range to another
    // map(value, currentMin, currentMax, targetMin, targetMax);
    let circleDiameter = s.map(s.mouseX, 0, s.width, 5, 50);

    s.circle(s.mouseX, s.mouseY, circleDiameter);
  };
};

const sketchInstance = new p5(sketch);

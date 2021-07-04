import p5 from "p5";

const sketch = (s) => {
  let grid = 20; // in pixels

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

    // draw rows
    for (let x = 0; x < s.width; x += grid) {
      // draw columns
      for (let y = 0; y < s.height; y += grid) {
        s.rect(x, y, grid, grid);
      }
    }
  };
};

const sketchInstance = new p5(sketch);

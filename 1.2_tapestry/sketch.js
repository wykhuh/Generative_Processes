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
        // push -  saves the current drawing style settings and transformations
        s.push();
        // set zero, zero point to the upper left corner of each cell
        s.translate(x, y);
        drawRandomPattern();
        // pop - restores the settings.
        s.pop();
      }
    }
  };

  function drawRandomPattern() {
    s.rect(0, 0, grid, grid);
  }
};

const sketchInstance = new p5(sketch);

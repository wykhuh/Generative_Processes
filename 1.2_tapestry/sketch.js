import p5 from "p5";
import { displayStartLoopControl } from "../assets/scripts/sketch_utils";

const sketch = (s) => {
  let grid = 20; // in pixels
  let choices = [pattern1, pattern2];

  s.setup = () => {
    s.createCanvas(s.windowWidth, s.windowHeight);
    displayStartLoopControl(s);
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

    // stop draw()
    s.noLoop();
  };

  function drawRandomPattern() {
    // p5 random will pick random item in array
    let choosePattern = s.random(choices);

    choosePattern();
  }

  function pattern1() {
    // draw line from lower left to upper right
    s.line(0, grid, grid, 0);
  }

  function pattern2() {
    // draw line upper right to lower left
    s.line(0, 0, grid, grid);
  }
};

new p5(sketch);

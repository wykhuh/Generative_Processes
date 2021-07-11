import p5 from "p5";
import { displayStartLoopControl } from "../assets/scripts/sketch_utils";

const sketch = (s) => {
  let grid = 20; // in pixels
  let choices = [
    [pattern1, 4],
    [pattern2, 2],
    [pattern3, 1],
    [pattern4, 1],
  ];

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
    s.strokeWeight(grid / (grid * 0.5));
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
    let raffle = [];
    for (const choice of choices) {
      let count = choice[1];
      for (let index = 0; index < count; index++) {
        raffle.push(choice[0]);
      }
    }

    // p5 random will pick random item in array
    let choosePattern = s.random(raffle);

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

  function pattern3() {
    // draw line from upper right to center
    s.line(0, 0, grid / 2, grid / 2);
  }

  function pattern4() {
    // draw line from lower left to center
    s.line(0, grid, grid / 2, grid / 2);
  }
};

new p5(sketch);

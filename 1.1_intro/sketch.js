import p5 from "p5";
import * as dat from "dat.gui";

import { displayInstructions } from "../assets/scripts/sketch_utils";

const sketch = (s) => {
  let instructions = "Move the cursor across the screen.";
  let backgroundColor = "black";

  let gui;
  let settings = {
    reset,
  };

  s.setup = () => {
    s.createCanvas(s.windowWidth, s.windowHeight);

    s.background(backgroundColor);

    gui = new dat.GUI();
    gui.add(settings, "reset");
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

    displayInstructions(s, instructions);
  };

  function reset() {
    s.background(backgroundColor);
  }
};

new p5(sketch);

import p5 from "p5";
import * as dat from "dat.gui";

import { resetControls } from "../assets/scripts/sketch_utils";

const sketch = (s) => {
  let settings = {
    res: 0.01,
    alpha: 128,
    nFrames: 50,
    reset,
  };
  let gui;
  let recorder = [];

  s.setup = () => {
    s.createCanvas(s.windowWidth, s.windowHeight);
    s.background(0);

    gui = new dat.GUI();
    gui.add(settings, "res", 0.001, 0.02);
    gui.add(settings, "alpha", 5, 255);
    gui.add(settings, "nFrames", 5, 500);
    gui.add(settings, "reset");

    gui.remember(settings);
  };

  s.windowResized = () => {
    s.resizeCanvas(s.windowWidth, s.windowHeight);
    s.background(0);
  };

  s.draw = () => {
    s.background(0);
    s.noFill();
    s.stroke(255, settings.alpha);
    s.strokeWeight(1);

    // add constant to noise so that noise for x and y will return a different value
    let x1 = s.noise(s.frameCount * settings.res) * s.width;
    let y1 = s.noise(100 + s.frameCount * settings.res) * s.height;
    let x2 = s.noise(200 + s.frameCount * settings.res) * s.width;
    let y2 = s.noise(300 + s.frameCount * settings.res) * s.height;

    let frame = {
      x1,
      y1,
      x2,
      y2,
    };
    recorder.push(frame);

    // remove lines when there are too many lines or nFrames changes
    while (recorder.length > settings.nFrames) {
      recorder.shift();
    }
    playback();
  };

  // draw line for values in recorder
  function playback() {
    s.rectMode(s.CENTER);

    for (let frame of recorder) {
      // save the origin
      s.push();

      // lerp calculates a number between two numbers
      // 0.5 finds midpoint
      let midX = s.lerp(frame.x1, frame.x2, 0.5);
      let midY = s.lerp(frame.y1, frame.y2, 0.5);
      s.translate(midX, midY);

      // get the distance between two points
      let len = s.dist(frame.x1, frame.y1, frame.x2, frame.y2);

      // get the angle between the two points
      let angle = s.atan2(frame.y1 - frame.y2, frame.x1 - frame.x2);

      s.rotate(angle);
      s.rect(0, 0, len);

      // restore origin
      s.pop();
    }
  }

  function reset() {
    recorder = [];
    resetControls(gui);
  }
};

new p5(sketch);

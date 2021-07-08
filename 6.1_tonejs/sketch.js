import p5 from "p5";
import * as Tone from "tone";

const sketch = (s) => {
  let ready = false;
  let osc;

  s.setup = () => {
    s.createCanvas(s.windowWidth, s.windowHeight);
    osc = new Tone.Oscillator().toDestination();

    osc.volume.value = -15;
  };

  s.windowResized = () => {
    s.resizeCanvas(s.windowWidth, s.windowHeight);
  };

  s.draw = () => {
    s.background(0);
    if (ready) {
    } else {
      s.fill(255);
      s.noStroke();
      s.textAlign(s.CENTER);
      s.text("Click to start sound", s.width / 2, s.height / 2);
    }
  };

  s.mousePressed = () => {
    if (!ready) {
      ready = true;
      osc.start();
    }
  };
};

new p5(sketch);

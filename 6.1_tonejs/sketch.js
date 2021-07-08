import p5 from "p5";
import * as Tone from "tone";

const sketch = (s) => {
  let ready = false;
  let osc;

  s.setup = () => {
    s.createCanvas(s.windowWidth, s.windowHeight);
    osc = new Tone.Oscillator(); // default is 440 Hz, A4
    osc.volume.value = -15;
    osc.frequency.value = 220; // 220, A3
    osc.toDestination();
  };

  s.windowResized = () => {
    s.resizeCanvas(s.windowWidth, s.windowHeight);
  };

  s.draw = () => {
    s.background(0);
    if (ready) {
      // change frequency based on mouse position
      osc.frequency.value = s.map(s.mouseX, 0, s.width, 110, 880);
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

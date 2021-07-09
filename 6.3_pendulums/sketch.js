import p5 from "p5";
import * as Tone from "tone";

const sketch = (s) => {
  let masterVolume = -10;
  let ready = false;

  let lfo;
  let meter;
  let previousPosition;
  let synth;

  s.setup = () => {
    s.createCanvas(s.windowWidth, s.windowHeight);

    // use lfo to generate oscillation for the pendulum
    lfo = new Tone.LFO(0.85);
    lfo.start();
    // use Meter to measer the amplitude of the frequency
    meter = new Tone.Meter();
    meter.normalRange = true; // return value from 0 to 1
    lfo.connect(meter);

    synth = new Tone.Synth();
    synth.toDestination();
  };

  s.windowResized = () => {
    s.resizeCanvas(s.windowWidth, s.windowHeight);
  };

  s.draw = () => {
    s.background(0);

    if (ready) {
      let position = 0.5 - meter.getValue(0); // return value -0.5  to 0.5
      let x = s.map(position, -0.5, 0.5, 100, s.width - 100);

      // trigger a note when pendulum crosses the midline
      let left = position > 0 && previousPosition < 0;
      let right = position < 0 && previousPosition > 0;
      if (left || right) {
        synth.triggerAttackRelease("C4", "8n");
      }

      previousPosition = position;

      s.fill(255);
      s.stroke(255);
      s.line(x, s.height / 2, s.width / 2, 0);
      s.ellipse(x, s.height / 2, 25, 25);
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
    }
  };
};

new p5(sketch);

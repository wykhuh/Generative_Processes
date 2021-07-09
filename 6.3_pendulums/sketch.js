import p5 from "p5";
import * as Tone from "tone";

const sketch = (s) => {
  let masterVolume = -10;
  let ready = false;
  let pendulums = [];

  s.setup = () => {
    s.createCanvas(s.windowWidth, s.windowHeight);

    for (let i = 0; i < 7; i++) {
      pendulums[i] = new Pendulum(0.85, "C4");
    }
  };

  s.windowResized = () => {
    s.resizeCanvas(s.windowWidth, s.windowHeight);
  };

  s.draw = () => {
    s.background(0);

    if (ready) {
      for (let pendulum of pendulums) {
        pendulum.run();
        s.translate(0, s.height / pendulums.length);
      }
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

  class Pendulum {
    constructor(frequency, note) {
      this.frequency = frequency;
      this.note = note;

      // use lfo to generate oscillation for the pendulum
      this.lfo = new Tone.LFO(0.85);
      // to make all pendulum start at 1 second of the transport so
      // that all pendulums start at the same time
      this.lfo.start(1);
      // use Meter to measer the amplitude of the frequency
      this.meter = new Tone.Meter();
      this.meter.normalRange = true; // return value from 0 to 1
      this.lfo.connect(this.meter);

      this.synth = new Tone.Synth();
      this.synth.toDestination();

      this.previousPosition = 0;
    }

    run() {
      let position = 0.5 - this.meter.getValue(0); // return value -0.5  to 0.5
      let x = s.map(position, -0.5, 0.5, 100, s.width - 100);

      // trigger a note when pendulum crosses the midline
      let left = position > 0 && this.previousPosition < 0;
      let right = position < 0 && this.previousPosition > 0;
      if (left || right) {
        this.synth.triggerAttackRelease("C4", "8n");
      }

      this.previousPosition = position;

      s.fill(255);
      s.stroke(255);
      s.line(x, 50, s.width / 2, 0);
      s.ellipse(x, 50, 25, 25);
    }
  }
};

new p5(sketch);

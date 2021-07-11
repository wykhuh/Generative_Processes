import p5 from "p5";
import * as Tone from "tone";
import { Scale, Collection } from "@tonaljs/tonal";

import { displayReloadBrowserControl } from "../assets/scripts/sketch_utils";

const sketch = (s) => {
  let masterVolume = -10;
  let ready = false;
  let pendulums = [];
  let scale;
  let mixer;

  s.setup = () => {
    s.createCanvas(s.windowWidth, s.windowHeight);
    displayReloadBrowserControl(s, pendulums);
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
      intializeAudio();
    }
  };

  function intializeAudio() {
    let flavor = "major pentatonic";

    // use Gain to hold all synth objects so that we can apply effects to all
    // the synths
    mixer = new Tone.Gain();

    // connect all objects in mixer to reverb
    let reverb = new Tone.Reverb({
      wet: 0.5, // default is 1
      decay: 30, // unit is seconds
    });
    mixer.connect(reverb);
    reverb.toDestination();

    scale = Scale.get("C3 " + flavor).notes;
    scale = scale.concat(Scale.get("C4 " + flavor).notes);
    scale = scale.concat(Scale.get("C5 " + flavor).notes);

    Collection.shuffle(scale);

    for (let i = 0; i < scale.length; i++) {
      // give each pendulum a different frequency
      pendulums[i] = new Pendulum(0.85 + (i * 1) / 60, scale[i]);
    }
  }
  class Pendulum {
    constructor(frequency, note) {
      this.frequency = frequency * 0.5;
      this.note = note;

      // use lfo to generate oscillation for the pendulum
      this.lfo = new Tone.LFO(this.frequency);
      // to make all pendulum start at 1 second of the transport so
      // that all pendulums start at the same time
      this.lfo.start(1);
      // use Meter to measer the amplitude of the frequency
      this.meter = new Tone.Meter();
      this.meter.normalRange = true; // return value from 0 to 1
      this.lfo.connect(this.meter);

      this.synth = new Tone.Synth();
      // all synths are connected to the same mixer object
      this.synth.connect(mixer);

      this.previousPosition = 0;
    }

    run() {
      let position = 0.5 - this.meter.getValue(0); // return value -0.5  to 0.5
      let x = s.map(position, -0.5, 0.5, 100, s.width - 100);

      // trigger a note when pendulum crosses the midline
      let left = position > 0 && this.previousPosition < 0;
      let right = position < 0 && this.previousPosition > 0;
      if (left || right) {
        this.synth.triggerAttackRelease(this.note, "8n");
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

import p5 from "p5";
import * as Tone from "tone";
import { Scale } from "@tonaljs/tonal";

const sketch = (s) => {
  let masterVolume = -10;
  let ready = false;
  let scaleNotes = Scale.get("C4 major").notes;

  let poly;

  s.setup = () => {
    s.createCanvas(s.windowWidth, s.windowHeight);
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
      initAudio();
    }

    poly.triggerAttackRelease(["C4", "E4", "G4"], "1m");
  };

  function initAudio() {
    poly = new Tone.PolySynth(Tone.Synth);
    poly.toDestination();
  }
};

new p5(sketch);

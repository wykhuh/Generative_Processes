import p5 from "p5";
import * as Tone from "tone";
import { Scale } from "@tonaljs/tonal";

const sketch = (s) => {
  let masterVolume = -10;
  let ready = false;
  let scale;
  let synth;
  let prevNote;

  s.setup = () => {
    s.createCanvas(s.windowWidth, s.windowHeight);
    scale = Scale.get("C4 major").notes;
  };

  s.windowResized = () => {
    s.resizeCanvas(s.windowWidth, s.windowHeight);
  };

  s.draw = () => {
    s.background(0);

    if (ready) {
      let noteNumber = s.floor(s.map(s.mouseX, 0, s.width, 0, scale.length));
      let note = scale[noteNumber];

      s.fill(255);
      s.noStroke();
      s.textAlign(s.CENTER, s.CENTER);
      s.textSize(100);
      s.text(note, s.width / 2, s.height / 2);

      if (note != prevNote) {
        synth.triggerAttackRelease(note, "8n");
        prevNote = note;
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
      initAudio();
    }
  };

  function initAudio() {
    synth = new Tone.Synth();
    synth.toDestination();
    synth.volume.value = masterVolume;
  }
};

new p5(sketch);

import p5 from "p5";
import * as Tone from "tone";
import { Scale, Note } from "@tonaljs/tonal";

const sketch = (s) => {
  let masterVolume = -10;
  let ready = false;
  let scale;
  let synth;

  s.setup = () => {
    s.createCanvas(s.windowWidth, s.windowHeight);
    scale = Scale.get("C4 minor").notes;
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
  };

  function mapNote(noteNumber, scale) {
    let numberNotes = scale.length;
    let i = modulo(noteNumber, numberNotes);
    let note = scale[i];

    let zeroOctave = Note.octave(scale[0]);
    let noteOctave = zeroOctave + s.floor(noteNumber / numberNotes);
    let noteName = Note.pitchClass(note);
    return noteName + noteOctave;
  }
  function initAudio() {
    synth = new Tone.Synth();
    synth.toDestination();
    synth.volume.value = masterVolume;
  }

  function modulo(n, m) {
    return ((n % m) + m) % m;
  }
};

new p5(sketch);

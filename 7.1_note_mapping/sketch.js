import p5 from "p5";
import * as Tone from "tone";
import { Scale, Note } from "@tonaljs/tonal";

import { displayInstructions } from "../assets/scripts/sketch_utils";

const sketch = (s) => {
  let instructions = "Move the cursor across the screen.";
  let masterVolume = -10;
  let ready = false;
  let scale;
  let synth;
  let prevNote;

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
      let noteNumber = s.floor(s.map(s.mouseX, 0, s.width, -14, 21));

      let note = mapNote(noteNumber, scale);

      s.fill(255);
      s.noStroke();
      s.textAlign(s.CENTER, s.CENTER);
      s.textSize(100);
      s.text(note, s.width / 2, s.height / 2);

      if (note != prevNote) {
        synth.triggerAttackRelease(note, "8n");
        prevNote = note;
      }
      displayInstructions(s, instructions);
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

  // mapNote will calcute the note letter and octave number for a given
  // positive or negative.
  // scale = notes from C4 major
  // noteNumber = 0 -> C4; noteNumber = -1 -> B3; noteNumber = 7 -> C5
  function mapNote(noteNumber, scale) {
    let numberNotes = scale.length;
    let i = modulo(noteNumber, numberNotes);
    let note = scale[i];

    // returns the octave number of the first note in the scale
    let zeroOctave = Note.octave(scale[0]);
    // calculates the correct octave number for a given noteNumber
    let noteOctave = zeroOctave + s.floor(noteNumber / numberNotes);
    // returns the letter of the note without the octave number
    let noteName = Note.pitchClass(note);
    return noteName + noteOctave;
  }

  function initAudio() {
    synth = new Tone.Synth();
    synth.toDestination();
    synth.volume.value = masterVolume;
  }

  function modulo(n, m) {
    // javascript incorrectly handles % when n is negative.
    // this function returns the correct results when n is negative.
    // -7 % 6 = -1
    // ((-7 % 6) + 6) % 6 = 5
    return ((n % m) + m) % m;
  }
};

new p5(sketch);

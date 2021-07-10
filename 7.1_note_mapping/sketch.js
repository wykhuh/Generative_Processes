import p5 from "p5";
import * as Tone from "tone";
import { Scale, Note } from "@tonaljs/tonal";

const sketch = (s) => {
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

      let numberNotes = scale.length;
      let i = modulo(noteNumber, numberNotes);
      let note = scale[i];

      let zeroOctave = Note.octave(scale[0]);
      let noteOctave = zeroOctave + s.floor(noteNumber / numberNotes);
      let noteName = Note.pitchClass(note);
      note = noteName + noteOctave;

      s.fill(255);
      s.noStroke();
      s.textAlign(s.CENTER, s.CENTER);
      s.textSize(100);
      s.text(`${noteNumber}:${note}`, s.width / 2, s.height / 2);

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

  function modulo(n, m) {
    return ((n % m) + m) % m;
  }
};

new p5(sketch);

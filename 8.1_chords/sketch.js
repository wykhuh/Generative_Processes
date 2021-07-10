import p5 from "p5";
import * as Tone from "tone";
import { Scale, Note } from "@tonaljs/tonal";

const sketch = (s) => {
  let masterVolume = -10;
  let ready = false;
  let scaleNotes = Scale.get("C4 major").notes;
  let chords = [];

  let poly;

  s.setup = () => {
    s.createCanvas(s.windowWidth, s.windowHeight);

    // generate all the chords in the scale
    for (let i = 0; i < scaleNotes.length; i++) {
      let chord = [];
      chord[0] = mapNote(i, scaleNotes);
      chord[1] = mapNote(i + 2, scaleNotes);
      chord[2] = mapNote(i + 4, scaleNotes);
      chord[3] = mapNote(i + 6, scaleNotes);
      chords.push(chord);
    }
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

    poly.triggerAttackRelease(chords[1], "1m");
  };

  function initAudio() {
    poly = new Tone.PolySynth(Tone.AMSynth, {
      // attack is when sound the fades in; attack is when the sound fades out;
      envelope: { attack: 1, release: 2 },
    });
    poly.toDestination();
  }

  function mapNote(noteNumber, scale) {
    let numberNotes = scale.length;
    let i = modulo(noteNumber, numberNotes);
    let note = scale[i];

    let zeroOctave = Note.octave(scale[0]);
    let noteOctave = zeroOctave + s.floor(noteNumber / numberNotes);
    let noteName = Note.pitchClass(note);
    return noteName + noteOctave;
  }

  function modulo(n, m) {
    return ((n % m) + m) % m;
  }
};

new p5(sketch);

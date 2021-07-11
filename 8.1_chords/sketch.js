import p5 from "p5";
import * as Tone from "tone";
import { Scale, Note } from "@tonaljs/tonal";

const sketch = (s) => {
  let masterVolume = -10;
  let ready = false;
  let scaleNotes = Scale.get("C4 major").notes;
  let chords = [];
  let currentChord = 0;
  let nextChord = 0;

  let poly;
  let FFT; // Fast Fourier Transform

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
      s.background(0);
      s.stroke(255);

      // visualize FFT
      let radius = s.min(s.width, s.height) / 2;

      s.translate(s.width / 2, s.height / 2);
      let buffer = FFT.getValue(0);
      // buffer length is set by new Tone.FFT()
      for (let i = 0; i < buffer.length; i++) {
        s.push();
        let angle = s.map(i, 0, buffer.length, 0, s.TWO_PI);
        s.rotate(angle);

        // buffer values go from -100 to 0
        let db = buffer[i];
        let y = s.map(db, -100, 0, 0, radius);

        s.point(0, y);
        s.pop();
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
    Tone.Destination.volume.value = masterVolume;

    poly = new Tone.PolySynth(Tone.AMSynth, {
      // attack is when sound the fades in; attack is when the sound fades out;
      envelope: { attack: 1, release: 2 },
    });
    poly.toDestination();

    // number of frequeny bins; has to be power of 2
    FFT = new Tone.FFT(1024);
    Tone.Destination.connect(FFT);

    // call changeChord 1 second after program starts
    Tone.Transport.schedule(changeChord, "1");
    Tone.Transport.start();
  }

  function changeChord(time) {
    // the first chord played will be the first chord in the scale
    currentChord = nextChord;

    // play chord of random duration
    let duration = s.floor(s.random(1, 4)) + "m";
    poly.triggerAttackRelease(chords[currentChord], duration, time);

    // get random chord
    nextChord = s.floor(s.random(chords.length));

    // schedule function in the future
    Tone.Transport.schedule(changeChord, "+" + duration);
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

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
      s.background(0, 25);
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
    Tone.Transport.bpm.value = 60; // default is 120

    // use PolySynth to play chords
    poly = new Tone.PolySynth(Tone.AMSynth, {
      // attack is when sound the fades in; attack is when the sound fades out;
      envelope: { attack: 1, release: 2 },
      volume: -6,
    });
    poly.toDestination();

    // the there 7 notes and 6 beats in the rhythm.
    // javascript treats strings as array of character. Therefore we can pass
    // both an array of numbers and a string to generate()
    let motif = new Motif([0, 1, 2, 3, 4, 3, 2], "xx-x--");
    // offset of 7 will make this motif one octave higher
    let motif2 = new Motif([4, 3, 2, 1, 0], "-x-xx-x", "8n", "16n", 7);

    // use dotted eight note as the delay to create syncopated delays
    // 0.5 is the amount to reduce the delay each time it repeats
    let delay = new Tone.FeedbackDelay("8n.", 0.5);
    motif.synth.connect(delay);
    motif2.synth.connect(delay);
    delay.toDestination();

    // number of frequeny bins; has to be power of 2
    FFT = new Tone.FFT(1024);
    Tone.Destination.connect(FFT);

    // call changeChord 1 second after program starts. changeChord() triggers
    // poly to play one chord. use recursion to keep calling changeChord().
    Tone.Transport.schedule(changeChord, "1");
    Tone.Transport.start();
  }

  // recursive function that will call itself to play endless loop of chords
  function changeChord(time) {
    // the first chord played will be the first chord in the scale
    currentChord = nextChord;

    // play chord of random duration
    let duration = s.floor(s.random(1, 4)) + "m";
    poly.triggerAttackRelease(chords[currentChord], duration, time);

    // get random chord
    nextChord = s.floor(s.random(chords.length));

    // schedule function in the future that will play random chord at
    // random duration
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

  // Motif a sequence of single notes
  class Motif {
    // the motifArray can be of different lengths
    constructor(
      motifArray,
      rhythmArray,
      tempo = "8n",
      duration = "8n",
      offset = 0
    ) {
      this.tempo = tempo;
      this.duration = duration;
      this.offset = offset;

      this.synth = new Tone.AMSynth();

      this.motif = generate(motifArray);
      this.rhythm = generate(rhythmArray);

      // use loop instead of sequence to create endless loop of single notes
      this.loop = new Tone.Loop((time) => {
        let chordNotes = chords[currentChord];
        let noteIndex = this.motif.next().value;
        let r = this.rhythm.next().value;

        // only play sound when rhythm value is 'x'
        if (r == "x") {
          let note = mapNote(noteIndex + this.offset, chordNotes);
          this.synth.triggerAttackRelease(note, this.duration, time);
        }
      }, this.tempo);
      this.loop.start(1);
    }
  }

  function* generate(array) {
    let i = 0;
    // create infinite loop that returns one item from an array every time
    // you call om the function
    while (true) {
      let value = array[i % array.length];
      i++;
      yield value;
    }
  }
};

new p5(sketch);

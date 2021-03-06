import p5 from "p5";
import * as Tone from "tone";
import { Scale, Note, Collection } from "@tonaljs/tonal";
import * as dat from "dat.gui";

import { resetControls } from "../assets/scripts/sketch_utils";

const sketch = (s) => {
  let masterVolume = -10;
  let ready = false;
  let scale;

  let defaultSequence = [0, 2, 4, 6]; // array of indicies for scale
  let sequence = defaultSequence;

  let track;
  let track2;
  let track3;

  let gui;
  let settings = {
    mixup,
    rotateLeft,
    rotateRight,
    invert,
    mutate,
    tempo: 120,
    reset,
  };

  s.setup = () => {
    s.createCanvas(s.windowWidth, s.windowHeight);

    gui = new dat.GUI();
    gui.add(settings, "mixup").name("Shuffle");
    gui.add(settings, "rotateLeft").name("Rotate left");
    gui.add(settings, "rotateRight").name("Rotate right");
    gui.add(settings, "invert").name("Invert");
    gui.add(settings, "mutate").name("Mutate");
    gui.add(settings, "tempo", 30, 240, 1).name("Tempo").onChange(changeTempo);
    gui.add(settings, "reset").name("Reset");

    gui.width = 200;
    gui.close();

    scale = Scale.get("C4 major").notes;
  };

  s.windowResized = () => {
    s.resizeCanvas(s.windowWidth, s.windowHeight);
  };

  s.draw = () => {
    if (ready) {
      s.background(0, 25);

      s.fill(255);
      s.noStroke();
      s.textAlign(s.LEFT, s.BOTTOM);
      s.textSize(25);
      s.push();
      for (let item of sequence) {
        s.text(item, 20, 30);
        s.translate(25, 0);
      }
      s.pop();

      let myTextSize = s.height / 20;
      s.fill(255);
      s.noStroke();
      s.textAlign(s.CENTER, s.CENTER);
      s.textSize(myTextSize);

      s.translate(s.width / 2, s.height / 2);
      for (let i = 0; i < scale.length; i++) {
        let angle = s.map(i, 0, scale.length, -s.PI / 2, s.TWO_PI - s.PI / 2);

        // create x,y coordinates centered around circle
        let radius = s.height / 3;
        let x = s.cos(angle) * radius;
        let y = s.sin(angle) * radius;

        let noteName = Note.pitchClass(scale[i]);

        if (noteName == Note.pitchClass(track3.currentNote)) {
          s.stroke(0, 128, 255);
          s.line(x, y, 0, 0);
          s.fill(0);
          s.circle(x, y, myTextSize * 3);
        }

        if (noteName == Note.pitchClass(track2.currentNote)) {
          s.stroke(128, 255, 0);
          s.line(x, y, 0, 0);
          s.fill(0);
          s.circle(x, y, myTextSize * 2.5);
        }

        if (noteName == Note.pitchClass(track.currentNote)) {
          s.stroke(255);
          s.line(x, y, 0, 0);
          s.fill(0);
          s.circle(x, y, myTextSize * 2);
        }

        s.noStroke();
        s.fill(255);
        s.text(noteName, x, y);
      }

      s.text(track.currentNote, 0, 0);
    } else {
      s.background(0);
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

  s.keyPressed = () => {
    // change the sequence when key is pressed
    sequence = sequence.reverse();
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
    // base
    track = new Track({});

    // melody
    track2 = new Track({
      transpose: 4,
      noteDuration: "8n",
      tempo: "8n.",
    });

    // bass
    track3 = new Track({
      transpose: -7,
      noteDuration: "1n",
      tempo: "1n",
    });

    let loop = new Tone.Loop(
      (time) => {
        // change the sequence
        let options = [invert, mutate, rotateLeft, rotateRight, mixup];
        let choice = s.random(options);
        choice();
      },
      "2m" // 2 measures
    );
    // when the program starts, delay the start of the loop by two measure
    loop.start("+2m");

    // start the global play button
    Tone.Transport.start();
  }

  function modulo(n, m) {
    return ((n % m) + m) % m;
  }

  class Track {
    // patternTypes:
    // "up" | "down" | "upDown" | "downUp" | "alternateUp" | "alternateDown" |
    // "random" | "randomOnce" | "randomWalk"

    constructor({
      transpose = 0,
      noteDuration = "8n",
      tempo = "8n",
      patternType = "up",
    }) {
      this.noteDuration = noteDuration;
      this.tempo = tempo;
      this.patternType = patternType;
      this.transpose = transpose;

      this.synth = new Tone.Synth();
      this.synth.toDestination();
      this.synth.volume.value = masterVolume;

      this.pattern = new Tone.Pattern(
        (time, index) => {
          let note = mapNote(sequence[index] + this.transpose, scale);
          // time is a schedule time in the future. Passing time to synth ensures
          // the note is played on beat.
          this.synth.triggerAttackRelease(note, this.noteDuration, time);
          this.currentNote = note;
        },
        // to allow us to change the sequence while the program is running, we
        // pass an array of indicies to Tone.Pattern()
        // create an array starting at 0, that is same length as sequence.
        Array.from(sequence.keys()),
        this.patternType
      );
      // interval is how fast the pattern is played
      // default interval is quarter notes
      this.pattern.interval = this.tempo;
      this.pattern.start();
    }
  }

  // randomly shuffle entire sequence
  function mixup() {
    s.shuffle(sequence, true);
  }

  // shift all items in sequence one position to the left
  function rotateLeft() {
    sequence = Collection.rotate(1, sequence);
  }

  // shift all items in sequence one position to the right
  function rotateRight() {
    sequence = Collection.rotate(-1, sequence);
  }

  function invert() {
    sequence = sequence.map((item) => {
      return scale.length - item;
    });
  }

  // change note up or down
  function mutate() {
    // pick random index
    let i = s.floor(s.random(sequence.length));

    // change note up or down
    if (s.random(1) < 0.5) {
      sequence[i]++;
    } else {
      sequence[i]--;
    }
  }

  function changeTempo(newValue) {
    Tone.Transport.bpm.value = newValue;
  }

  function reset() {
    resetControls(gui);
    sequence = defaultSequence;
  }
};

new p5(sketch);

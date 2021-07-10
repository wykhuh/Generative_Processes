import p5 from "p5";
import * as Tone from "tone";
import { Scale, Note } from "@tonaljs/tonal";

const sketch = (s) => {
  let masterVolume = -10;
  let ready = false;
  let scale;

  let sequence = [0, 2, 4, 6]; // array of indicies for scale

  let track;
  let track2;
  let track3;

  s.setup = () => {
    s.createCanvas(s.windowWidth, s.windowHeight);
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
};

new p5(sketch);

import p5 from "p5";
import * as Tone from "tone";
import { Scale, Note } from "@tonaljs/tonal";

const sketch = (s) => {
  let masterVolume = -10;
  let ready = false;
  let scale;

  let sequence = [0, 2, 4, 6]; // array of indicies for scale

  let track;

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
      s.fill(255);
      s.noStroke();
      s.textAlign(s.CENTER, s.CENTER);
      s.textSize(100);
      s.text(track.currentNote, s.width / 2, s.height / 2);
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
    track = new Track();

    // start the global play button
    Tone.Transport.start();
  }

  function modulo(n, m) {
    return ((n % m) + m) % m;
  }

  class Track {
    constructor() {
      this.synth = new Tone.Synth();
      this.synth.toDestination();
      this.synth.volume.value = masterVolume;

      this.pattern = new Tone.Pattern(
        (time, index) => {
          let note = mapNote(sequence[index], scale);
          // time is a schedule time in the future. Passing time to synth ensures
          // the note is played on beat.
          this.synth.triggerAttackRelease(note, "8n", time);
          this.currentNote = note;
        },
        // to allow us to change the sequence while the program is running, we
        // pass an array of indicies to Tone.Pattern()
        // create an array starting at 0, that is same length as sequence.
        Array.from(sequence.keys()),
        "up"
      );
      // interval is how fast the pattern is played
      // default interval is quarter notes
      this.pattern.interval = "4n";
      this.pattern.start();
    }
  }
};

new p5(sketch);

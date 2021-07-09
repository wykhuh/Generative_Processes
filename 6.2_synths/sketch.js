import p5 from "p5";
import * as Tone from "tone";
import { Scale } from "@tonaljs/tonal";

const sketch = (s) => {
  let masterVolume = -10;
  let ready = false;
  let wave;
  let synth;
  let loop;
  let scale;
  let previousNote;

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
      drawWaveform(wave);
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
      intializeAudio();
    }
  };

  function intializeAudio() {
    synth = new Tone.Synth();
    synth.toDestination();
    synth.volume.value = masterVolume;

    // (callback, loop frequency)
    // fire loopStep every quarter note
    loop = new Tone.Loop(loopStep, "8n");
    loop.start();

    wave = new Tone.Waveform();
    synth.connect(wave);
    Tone.Transport.start();
  }

  function loopStep(time) {
    let n = s.noise(s.frameCount * 0.1);
    // noise will always be between 0 and 1.
    // use floor to round down the map() value
    let i = s.floor(s.map(n, 0, 1, 0, scale.length));
    // pick note from scale based on noise
    let note = scale[i];

    if (previousNote != note) {
      // triggerAttackRelease(frequency, note duration, time)
      synth.triggerAttackRelease(note, "8n", time);
    }

    previousNote = note;
  }

  function drawWaveform(wave, w = s.width, h = s.height) {
    s.stroke(255);
    let buffer = wave.getValue(0);

    // look for point in buffer where we cross the x axis.
    let start = 0;
    for (let i = 1; i < buffer.length; i++) {
      // previous point is negative, and current point is zero or positive
      if (buffer[i - 1] < 0 && buffer[i] >= 0) {
        start = i;
        break; // end for loop
      }
    }

    // calculate new endpoint so we always draw same number of samples
    // for each frame
    let end = start + buffer.length / 2;

    // draw waveform
    for (let i = start; i < end; i++) {
      let x1 = s.map(i - 1, start, end, 0, w);
      let y1 = s.map(buffer[i - 1], -1, 1, 0, h);

      let x2 = s.map(i, start, end, 0, w);
      let y2 = s.map(buffer[i], -1, 1, 0, h);
      s.line(x1, y1, x2, y2);
    }
  }
};

new p5(sketch);

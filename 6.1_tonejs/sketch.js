import p5 from "p5";
import * as Tone from "tone";

const sketch = (s) => {
  let ready = false;
  let osc;
  let wave;

  s.setup = () => {
    s.createCanvas(s.windowWidth, s.windowHeight);
    osc = new Tone.Oscillator(); // default is 440 Hz, A4
    osc.frequency.value = 220; // 220, A3
    osc.toDestination();

    wave = new Tone.Waveform();
    osc.connect(wave);

    osc.volume.value = -9;
  };

  s.windowResized = () => {
    s.resizeCanvas(s.windowWidth, s.windowHeight);
  };

  s.draw = () => {
    s.background(0);
    if (ready) {
      // change frequency based on mouse position
      osc.frequency.value = s.map(s.mouseX, 0, s.width, 110, 880);

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
        let x1 = s.map(i - 1, start, end, 0, s.width);
        let y1 = s.map(buffer[i - 1], -1, 1, 0, s.height);

        let x2 = s.map(i, start, end, 0, s.width);
        let y2 = s.map(buffer[i], -1, 1, 0, s.height);
        s.line(x1, y1, x2, y2);
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
      osc.start();
    }
  };
};

new p5(sketch);

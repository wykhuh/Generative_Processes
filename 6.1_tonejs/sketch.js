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

      // draw waveform
      s.stroke(255);
      let buffer = wave.getValue(0);
      for (let i = 0; i < buffer.length; i++) {
        let x = s.map(i, 0, buffer.length, 0, s.width);
        let y = s.map(buffer[i], -1, 1, 0, s.height);
        s.point(x, y);
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

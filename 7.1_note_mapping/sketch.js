import p5 from "p5";
import * as Tone from "tone";
import { Scale } from "@tonaljs/tonal";

const sketch = (s) => {
  let masterVolume = -10;
  let ready = false;
  let scale;

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
      let noteNumber = s.floor(s.map(s.mouseX, 0, s.width, 0, scale.length));
      let note = scale[noteNumber];

      s.fill(255);
      s.noStroke();
      s.textAlign(s.CENTER, s.CENTER);
      s.textSize(100);
      s.text(note, s.width / 2, s.height / 2);
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

  function initAudio() {}
};

new p5(sketch);

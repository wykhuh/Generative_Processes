import p5 from "p5";

const sketch = (s) => {
  let size = 100;

  s.setup = () => {
    s.createCanvas(s.windowWidth, s.windowHeight);
  };

  s.windowResized = () => {
    s.resizeCanvas(s.windowWidth, s.windowHeight);
  };

  s.draw = () => {
    s.background(0);
    s.stroke(255);
    s.strokeWeight(3);
    s.noFill();

    // move origin to halfway
    s.translate(0, s.height / 2);

    // create line whose thickness is centered around height/2
    // drawing multiple vertex at random heights; connect all the vertex with
    // a line
    s.beginShape();
    for (let x = 0; x < s.width; x++) {
      let r = s.random();
      let y = s.map(r, 0, 1, size * -1, size);
      s.vertex(x, y);
    }
    s.endShape();
  };
};

const sketchInstance = new p5(sketch);

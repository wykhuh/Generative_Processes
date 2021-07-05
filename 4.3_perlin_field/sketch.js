import p5 from "p5";

const sketch = (s) => {
  let highway = "highway.jpg";
  let grid = 20;
  let img;
  let res = 0.01;

  s.setup = () => {
    s.createCanvas(s.windowWidth, s.windowHeight);
  };

  // use preload to load assets. Once assets are load, then setup is fired.
  s.preload = () => {
    img = s.loadImage(highway);

    // allow access to img from dev console
    window.img = img;
  };

  s.windowResized = () => {
    s.resizeCanvas(s.windowWidth, s.windowHeight);
  };

  s.draw = () => {
    s.background(0);
    s.fill(0);
    s.noStroke();

    s.rectMode(s.CENTER);

    for (let x = 0; x < s.width; x += grid) {
      for (let y = 0; y < s.height; y += grid) {
        s.push();
        // set origin to center each cell
        s.translate(x + grid / 2, y + grid / 2);

        let v = new p5.Vector();
        v.x = s.map(s.noise(x * res, y * res, 1), 0, 1, -1, 1);
        v.y = s.map(s.noise(x * res, y * res, 10), 0, 1, -1, 1);
        v.mult(grid * 2);

        s.stroke(255);
        s.line(0, 0, v.x, v.y);

        s.pop();
      }
    }

    res = s.map(s.mouseX, 0, s.width, 0.01, 0.001);
  };
};

new p5(sketch);

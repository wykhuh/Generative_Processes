import p5 from "p5";

const sketch = (s) => {
  let highway = "highway.jpg";
  let grid = 160;
  let img;

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

    for (let x = 0; x < s.width; x += grid) {
      for (let y = 0; y < s.height; y += grid) {
        s.push();
        // set origin to center each cell
        s.translate(x + grid / 2, y + grid / 2);

        s.pop();
      }
    }
  };
};

new p5(sketch);

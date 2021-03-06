import p5 from "p5";
import highwayUrl from "./highway.jpg";

const sketch = (s) => {
  let highway = highwayUrl;
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

    s.imageMode(s.CENTER);

    let res = 0.001;
    let n = s.frameCount * res;
    let zoom = s.map(s.noise(n + 200), 0, 1, 0, 100);
    let sx = s.map(s.noise(n), 0, 1, 0, img.width - (grid + zoom));
    let sy = s.map(s.noise(n + 100), 0, 1, 0, img.height - (grid + zoom));

    for (let x = 0; x < s.width; x += grid) {
      for (let y = 0; y < s.height; y += grid) {
        s.push();
        // set origin to center each cell
        s.translate(x + grid / 2, y + grid / 2);

        let xScale = 1;
        let yScale = 1;
        if (x % (2 * grid) == 0) {
          xScale = -1;
        }
        if (y % (2 * grid) == 0) {
          yScale = -1;
        }
        s.scale(xScale, yScale);
        s.image(img, 0, 0, grid, grid, sx, sy, grid + zoom, grid + zoom);

        s.pop();
      }
    }

    // createPreview(img, grid, sx, sy, zoom);
  };

  function createPreview(img, grid, sx, sy, zoom) {
    s.imageMode(s.CORNER);
    s.noFill();

    s.scale(0.25, 0.25);
    s.image(img, 0, 0);

    s.stroke(255);
    s.strokeWeight(10);
    s.rect(sx, sy, grid + zoom, grid + zoom);
  }
};

new p5(sketch);

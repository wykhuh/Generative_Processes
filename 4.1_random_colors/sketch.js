import p5 from "p5";
import highwayUrl from "./highway.jpg";

const sketch = (s) => {
  let highway = highwayUrl;
  let grid = 40;
  let palette = [];
  let img;

  s.setup = () => {
    s.createCanvas(s.windowWidth, s.windowHeight);

    img.resize(8, 8);
    img.loadPixels();

    for (let i = 0; i < img.pixels.length; i += 4) {
      let r = img.pixels[i];
      let g = img.pixels[i + 1];
      let b = img.pixels[i + 2];
      // convert color object to a string
      let c = s.color(r, g, b).toString();
      palette.push(c);
    }
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

    s.rectMode(s.CENTER);
    for (let x = 0; x < s.width; x += grid) {
      for (let y = 0; y < s.height; y += grid) {
        s.push();
        // set origin to center each cell
        s.translate(x + grid / 2, y + grid / 2);

        let c1 = s.random(palette);
        let c2 = s.random(palette);
        while ((c2 = s.random(palette)) == c1) {}

        s.noStroke();

        s.fill(c1);
        s.rect(0, 0, grid);

        s.fill(c2);
        s.rect(0, 0, grid / 2);
        s.pop();
      }
    }
    s.image(img, 0, 0);
    s.noLoop();
  };
};

new p5(sketch);

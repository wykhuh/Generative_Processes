import p5 from "p5";

const sketch = (s) => {
  let highway = "highway.jpg";
  let grid = 40;
  let palette = ["#264653", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51"];
  let img;

  s.setup = () => {
    s.createCanvas(s.windowWidth, s.windowHeight);
  };

  // use prload to load assets. Once assets are load, then
  // setup is fired.
  s.preload = () => {
    img = s.loadImage(highway);
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
        let c2;
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

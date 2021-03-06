import p5 from "p5";
import highwayUrl from "./highway.jpg";

import { displayReloadBrowserControl } from "../assets/scripts/sketch_utils";

const sketch = (s) => {
  let highway = highwayUrl;
  let grid = 20;
  let img;
  let res = 0.008;
  let damping = 0.7;
  let group = [];

  s.setup = () => {
    s.createCanvas(s.windowWidth, s.windowHeight);
    s.background(0);
    displayReloadBrowserControl(s);
  };

  // use preload to load assets. Once assets are load, then setup is fired.
  s.preload = () => {
    img = s.loadImage(highway);

    // allow access to img from dev console
    window.img = img;
  };

  s.windowResized = () => {
    s.resizeCanvas(s.windowWidth, s.windowHeight);
    s.background(0);
  };

  s.draw = () => {
    s.strokeWeight(1);

    // add agents over time
    for (let i = 0; i < 100; i++) {
      group.push(createAgent());
    }

    // move and draw agents
    for (let agent of group) {
      let x = agent.position.x;
      let y = agent.position.y;

      // create velocity based on Perlin noise
      let v = new p5.Vector();
      v.x = s.map(s.noise(x * res, y * res, 1), 0, 1, -1, 1);
      v.y = s.map(s.noise(x * res, y * res, 10), 0, 1, -1, 1);
      agent.velocity.add(v);
      agent.velocity.mult(damping);

      move(agent);

      s.stroke(agent.color, 35);
      // only draw point at certain frames to create discontinous line
      if (agent.lifespan % 3 == 0) {
        s.point(x, y);
      }
    }
    cleanup(group);
  };

  function cleanup(group) {
    for (let i = group.length - 1; i >= 0; i--) {
      if (group[i].lifespan <= 0) {
        group.splice(i, 1);
      }
    }
  }

  function createAgent() {
    let temp = {
      position: new p5.Vector(
        s.random(100, s.width - 100),
        s.random(100, s.height - 100)
      ),
      velocity: new p5.Vector(),
      lifespan: 500,
      color: 255,
    };

    // set color of agent to the color of the image at the corresponding position
    let sx = s.map(temp.position.x, 0, s.width, 0, img.width);
    let sy = s.map(temp.position.y, 0, s.height, 0, img.height);
    // img.get returns [red, green, blue, alpha]
    // color() creates color object
    temp.color = s.color(img.get(sx, sy));
    temp.color.setAlpha(25);

    return temp;
  }

  function move(agent) {
    agent.position.add(agent.velocity);
    agent.lifespan--;
  }

  function drawNoiseField() {
    s.strokeWeight(1);
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
  }
};

new p5(sketch);

import p5 from "p5";
import * as dat from "dat.gui";

import asset1 from "./assets/Asset 1-8.png";
import asset2 from "./assets/Asset 3-8.png";
import asset3 from "./assets/Asset 4-8.png";
import asset4 from "./assets/Asset 5-8.png";
import asset5 from "./assets/Asset 6-8.png";
import asset6 from "./assets/Asset 7-8.png";
import asset7 from "./assets/Asset 8-8.png";
import asset8 from "./assets/Asset 9-8.png";
import { resetControls } from "../assets/scripts/sketch_utils";

const sketch = (s) => {
  let assets = [asset1, asset2, asset3, asset4, asset5, asset6, asset7, asset8];
  let sprites = [];
  let group = [];
  let palette = ["#8ecae6", "#219ebc", "#023047", "#ffb703", "#fb8500"];
  let settings = {
    redraw_bg: false,
    damping: 1,
    seek: 0,
    twitch: 0.3,
    separate: 1.5,
    cohesion: 1,
    align: 1,
    reset,
  };

  let gui;
  let paused = false;

  //----------------------------------------------
  s.preload = () => {
    for (let asset of assets) {
      let img = s.loadImage(asset);
      sprites.push(img);
    }
  };

  s.setup = () => {
    s.createCanvas(s.windowWidth, s.windowHeight);
    gui = new dat.GUI();
    gui.add(settings, "redraw_bg");
    gui.add(settings, "damping", 0.8, 1);
    gui.add(settings, "seek", 0, 2, 0.1);
    gui.add(settings, "twitch", 0, 2);
    gui.add(settings, "separate", 0, 2);
    gui.add(settings, "cohesion", 0, 2);
    gui.add(settings, "align", 0, 2);
    gui.add(settings, "reset");

    gui.close();
    s.background(255);
  };

  s.windowResized = () => {
    s.resizeCanvas(s.windowWidth, s.windowHeight);
  };

  s.keyPressed = () => {
    if (s.key == " ") {
      if (paused == false) {
        s.noLoop();
        paused = true;
      } else {
        s.loop();
        paused = false;
      }
    }

    if (s.key == "s") {
      s.save("drawing.jpg");
    }
  };

  s.draw = () => {
    if (settings.redraw_bg) {
      s.background(255);
    }

    if (group.length < 50) {
      group.push(createAgent());
    }

    // create a vector for mouse
    let mouse = new p5.Vector(s.mouseX, s.mouseY);

    for (let agent of group) {
      // behaviors
      seek(agent, mouse, 0.5, settings.seek);

      twitch(agent, settings.twitch);
      separate(agent, group, settings.separate);
      align(agent, group, settings.align);
      cohesion(agent, group, settings.cohesion);

      move(agent);
      wrap(agent);
      render(agent);
    }
  };

  //----------------------------------------------
  function createAgent() {
    let agent = {
      pos: new p5.Vector(s.random(s.width), s.random(s.height)),
      vel: new p5.Vector(s.random(-1, 1), s.random(-1, 1)),
      acc: new p5.Vector(),
      maxSpeed: s.random(2, 6),
      maxForce: s.random(0.05, 0.2),
      color: s.random(palette),
      id: s.frameCount,
      sprite: s.random(sprites),
    };
    return agent;
  }

  function render(agent) {
    s.rectMode(s.CENTER);
    s.imageMode(s.CENTER);

    s.stroke(agent.color);

    let n = s.sin((agent.id + s.frameCount) * 0.01);
    let thickness = s.map(n, -1, 1, 1, 15);
    s.strokeWeight(thickness);

    s.push();
    // set origin to position of the agent
    s.translate(agent.pos.x, agent.pos.y);
    // rotate the origin to same angle as the agent velocity
    s.rotate(agent.vel.heading());

    s.tint(agent.color);
    s.image(agent.sprite, 0, 0);
    s.pop();
  }

  function move(agent) {
    agent.vel.add(agent.acc);
    agent.vel.mult(settings.damping);
    agent.pos.add(agent.vel);

    // reset acceleration in between each frame
    agent.acc.mult(0);
  }

  function wrap(agent) {
    if (agent.pos.x < -100) {
      agent.pos.x = s.width + 100;
    }
    if (agent.pos.y < -100) {
      agent.pos.y = s.height + 100;
    }

    if (agent.pos.x > s.width + 100) {
      agent.pos.x = -100;
    }
    if (agent.pos.y > s.height + 100) {
      agent.pos.y = -100;
    }
  }

  function applyForce(agent, force, strength = 1) {
    force.mult(strength);
    agent.acc.add(force);
  }

  function seek(agent, target, strength = 1) {
    let targetDirection = p5.Vector.sub(target, agent.pos);
    // normalize set length to one
    targetDirection.normalize();
    targetDirection.mult(agent.maxSpeed);

    steer(agent, targetDirection, strength);
  }

  function steer(agent, targetDirection, strength = 1) {
    // how much do we need to turn to achieve target direction
    let steer = p5.Vector.sub(targetDirection, agent.vel);
    steer.limit(agent.maxForce);

    applyForce(agent, steer, strength);
  }

  function separate(agent, group, strength = 1) {
    // only look at agents within a certain radius
    let separation = 40;

    let sum = new p5.Vector();
    let count = 0;

    // examine all other agents
    for (let other of group) {
      let d = agent.pos.dist(other.pos);
      // only handle nearby agents
      if (d > 0 && d < separation) {
        let diff = p5.Vector.sub(agent.pos, other.pos);
        // make all the diff vectors the same
        diff.normalize();
        // weight in favor of the closer objects
        // objects that are close are more affected than objects farther away
        diff.div(d);
        sum.add(diff);
        count++;
      }
    }

    // if agent is near other agents
    if (count > 0) {
      // get average value for all the diff vectors
      sum.div(count);
      sum.setMag(agent.maxSpeed);
      // steer towards average sum vector
      steer(agent, sum, strength);
    }
  }

  function align(agent, group, strength = 1) {
    let neighborhood = 50;

    let sum = new p5.Vector();
    let count = 0;

    // examine all other agents
    for (let other of group) {
      let d = agent.pos.dist(other.pos);
      // only handle nearby agents
      if (d > 0 && d < neighborhood) {
        sum.add(other.vel);
        count++;
      }
    }

    // if agent is near other agents
    if (count > 0) {
      // get average value for all the diff vectors
      sum.div(count);
      sum.normalize();
      sum.mult(agent.maxSpeed);
      // steer towards the averaged sum
      steer(agent, sum, strength);
    }
  }

  function cohesion(agent, group, strength = 1) {
    let neighborhood = 50;

    let sum = new p5.Vector();
    let count = 0;

    // examine all other agents
    for (let other of group) {
      let d = agent.pos.dist(other.pos);
      // only handle nearby agents
      if (d > 0 && d < neighborhood) {
        sum.add(other.pos);
        count++;
      }
    }

    // if agent is near other agents
    if (count > 0) {
      // get average value for all the diff vectors
      sum.div(count);
      // steer towards the averaged sum
      seek(agent, sum, strength);
    }
  }

  function twitch(
    agent,
    strength = 1,
    twitchRadius = s.PI / 2,
    twitchRate = 0.01
  ) {
    let twitchDirection = agent.vel.copy();
    // randomly generate an angle based on perlin noise
    let n = s.noise((agent.pos.x + s.frameCount) * twitchRate);
    let twitchAngle = s.map(n, 0, 1, -twitchRadius, twitchRadius);
    // change the angle of the velocity
    twitchDirection.rotate(twitchAngle);
    // steer agent towards the angle
    steer(agent, twitchDirection, strength);
  }

  function reset() {
    s.background(255);
    group = [];
    resetControls(gui);
  }
};

new p5(sketch);

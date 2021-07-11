import p5 from "p5";
import * as dat from "dat.gui";
import { resetControls } from "../assets/scripts/sketch_utils";

const sketch = (s) => {
  let group = []; // our particle system
  let gui;
  let settings = {
    damping: 1, // value to temper velocity; high
    bgAlpha: 0,
    strokeAlpha: 60,
    gravity: 0.0,
    lifespan: 300,
    reset,
  };

  s.setup = () => {
    s.createCanvas(s.windowWidth, s.windowHeight);
    // coordinates pased to rectangle refers to center of rectangle instead of
    // top left corner of rectangle
    s.rectMode(s.CENTER);
    gui = new dat.GUI();
    gui.add(settings, "damping", 0.95, 1);
    gui.add(settings, "bgAlpha", 0, 255);
    gui.add(settings, "strokeAlpha", 0, 255);
    gui.add(settings, "gravity", 0, 0.1);
    gui.add(settings, "lifespan", 100, 1000);
    gui.add(settings, "reset");

    s.background(33);
  };

  s.windowResized = () => {
    s.resizeCanvas(s.windowWidth, s.windowHeight);
    s.background(33);
  };

  s.draw = () => {
    s.noFill();
    s.stroke(255, settings.strokeAlpha);
    s.background(33, settings.bgAlpha);

    // create vector that points downwards
    let gravity = new p5.Vector(0, settings.gravity);

    //   create new agents over time
    if (s.mouseIsPressed) {
      let newAgent = createAgent(
        s.mouseX,
        s.mouseY,
        s.random(-1, 1),
        s.random(-1, 1)
      );

      group.push(newAgent);
    }

    // update/render all agents
    for (let agent of group) {
      move(agent);
      twitch(agent);
      applyForce(agent, gravity);
      // render(agent);
    }

    // draw lines connecting agents
    for (let i = 0; i < group.length; i++) {
      for (let j = i; j < group.length; j++) {
        if (i != j) {
          const x1 = group[i].position.x;
          const y1 = group[i].position.y;
          const x2 = group[j].position.x;
          const y2 = group[j].position.y;
          let d = s.dist(x1, y1, x2, y2);
          if (d > 10 && d < 50) {
            s.line(x1, y1, x2, y2);
          }
        }
      }
    }

    cleanUp(group);
  };

  // create a moving item
  function createAgent(x = 0, y = 0, vx = 0, vy = 0) {
    return {
      position: new p5.Vector(x, y),
      velocity: new p5.Vector(vx, vy),
      acceleration: new p5.Vector(),
      lifespan: settings.lifespan, // number of frames
    };
  }

  // draw the agent
  function render(agent) {
    s.push();
    // to rotate the agent, we need to move origin to center of agent
    s.translate(agent.position.x, agent.position.y);
    // rotate agent to match angle of the velocity
    s.rotate(agent.velocity.heading());
    // make old agents fade over time
    let alpha = s.map(agent.lifespan, 0, 300, 0, 255);
    s.stroke(255, alpha);

    s.rect(0, 0, 10, 5);
    s.pop();
  }

  function move(agent) {
    agent.velocity.add(agent.acceleration);
    agent.velocity.mult(settings.damping);
    agent.position.add(agent.velocity);
    // set acceleration to zero
    agent.acceleration.mult(0);
    agent.lifespan--;
  }

  function applyForce(agent, force) {
    agent.acceleration.add(force);
  }

  function twitch(agent) {
    // rotate uses radians
    agent.velocity.rotate(s.random(-0.02, 0.02));
  }

  function cleanUp(group) {
    for (let i = group.length - 1; i >= 0; i--) {
      let agent = group[i];
      // remove agent from group.
      // set boundary bigger than the window size so we delete objects
      // once they are offscreen.
      if (
        isAgentInsideBox(agent, -50, -50, s.width + 100, s.height + 100) ==
          false ||
        agent.lifespan <= 0
      ) {
        group.splice(i, 1);
      }
    }
  }

  function isAgentInsideBox(agent, x, y, w, h) {
    let ax = agent.position.x;
    let ay = agent.position.y;
    if (ax > x && ax < x + w && ay > y && ay < y + h) {
      return true;
    } else {
      return false;
    }
  }

  function reset() {
    group = [];
    s.background(33);
    resetControls(gui);
  }
};

new p5(sketch);

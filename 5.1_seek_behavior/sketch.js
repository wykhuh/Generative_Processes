import p5 from "p5";
import { displayInstructions } from "../assets/scripts/sketch_utils";

const sketch = (s) => {
  let instructions = "Move the cursor across the screen.";
  let group = [];
  let damping = 1;

  s.setup = () => {
    s.createCanvas(s.windowWidth, s.windowHeight);
  };

  s.windowResized = () => {
    s.resizeCanvas(s.windowWidth, s.windowHeight);
  };

  s.draw = () => {
    s.background(255);
    s.fill(255);

    if (group.length < 25) {
      group.push(createAgent());
    }

    // create a vector for mouse
    let mouse = new p5.Vector(s.mouseX, s.mouseY);

    for (let agent of group) {
      // behaviors
      seek(agent, mouse);

      render(agent);
      move(agent);
    }
    displayInstructions(s, instructions, 0);
  };

  function createAgent() {
    let agent = {
      pos: new p5.Vector(s.random(s.width), s.random(s.height)),
      vel: new p5.Vector(s.random(-1, 1), s.random(-1, 1)),
      acc: new p5.Vector(),
      maxSpeed: s.random(2, 6),
      maxForce: s.random(0.05, 0.2),
    };
    return agent;
  }

  function render(agent) {
    s.rectMode(s.CENTER);
    s.push();
    // set origin to position of the agent
    s.translate(agent.pos.x, agent.pos.y);
    // rotate the origin to same angle as the agent velocity
    s.rotate(agent.vel.heading());
    s.rect(0, 0, 30, 15);
    s.pop();
  }

  function move(agent) {
    agent.vel.add(agent.acc);
    agent.vel.mult(damping);
    agent.pos.add(agent.vel);

    // reset acceleration in between each frame
    agent.acc.mult(0);
  }

  function applyForce(agent, force) {
    agent.acc.add(force);
  }

  function seek(agent, target) {
    let targetDirection = p5.Vector.sub(target, agent.pos);
    targetDirection.normalize(); // normalize set length to one
    targetDirection.mult(agent.maxSpeed);

    // how much do we need to turn to achieve target direction
    let steer = p5.Vector.sub(targetDirection, agent.vel);
    steer.limit(agent.maxForce);

    applyForce(agent, steer);
  }
};

new p5(sketch);

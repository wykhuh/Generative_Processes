import p5 from "p5";
import { displayInstructions } from "../assets/scripts/sketch_utils";

const sketch = (s) => {
  let instructions = "Move the cursor across the screen.";

  let agent;

  let easing = 0.1; // a value to temper acceleration
  let damping = 0.5; // value to temper velocity; high

  s.setup = () => {
    s.createCanvas(s.windowWidth, s.windowHeight);
    // coordinates pased to rectangle refers to center of rectangle instead of
    // top left corner of rectangle
    s.rectMode(s.CENTER);

    agent = createAgent();
  };

  s.windowResized = () => {
    s.resizeCanvas(s.windowWidth, s.windowHeight);
  };

  s.draw = () => {
    s.noFill();
    s.stroke(255);
    s.background(0);

    move(agent);
    followMouse(agent);
    render(agent);

    displayInstructions(s, instructions);
  };

  // create a moving item
  function createAgent() {
    return {
      position: new p5.Vector(),
      velocity: new p5.Vector(),
      acceleration: new p5.Vector(),
    };
  }

  // draw the agent
  function render(agent) {
    s.push();
    // to rotate the agent, we need to move origin to center of agent
    s.translate(agent.position.x, agent.position.y);
    // rotate agent to match angle of the velocity
    s.rotate(agent.velocity.heading());
    s.rect(0, 0, 50);
    s.pop();
  }

  function move(agent) {
    agent.velocity.add(agent.acceleration);
    agent.velocity.mult(damping);
    agent.position.add(agent.velocity);

    // set acceleration to zero
    agent.acceleration.mult(0);
  }

  function followMouse(agent) {
    // vector for mouse position
    let target = new p5.Vector(s.mouseX, s.mouseY);

    // subtract position vector from current mouse vector to calculate the
    // needed vector in order to make square follow mouse
    let diff = target.sub(agent.position);
    // reduce vector
    diff.mult(easing);

    // add vectors
    agent.acceleration.add(diff);
  }
};

new p5(sketch);

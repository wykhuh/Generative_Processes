import p5 from "p5";

const sketch = (s) => {
  let group = []; // our particle system

  let easing = 0.2; // a value to temper acceleration
  let damping = 1; // value to temper velocity; high

  s.setup = () => {
    s.createCanvas(s.windowWidth, s.windowHeight);
    // coordinates pased to rectangle refers to center of rectangle instead of
    // top left corner of rectangle
    s.rectMode(s.CENTER);
  };

  s.windowResized = () => {
    s.resizeCanvas(s.windowWidth, s.windowHeight);
  };

  s.draw = () => {
    s.noFill();
    s.stroke(255);
    s.background(0);

    //   create new agents over time
    if (s.mouseIsPressed) {
      let newAgent = createAgent(
        s.width / 2,
        s.height / 2,
        s.random(-1, 1),
        s.random(-1, 1)
      );

      group.push(newAgent);
    }

    // update/render all agents
    for (let agent of group) {
      move(agent);
      render(agent);
    }

    cleanUp(group);

    // display number of agents
    s.fill(255);
    s.text(group.length, 20, 20);
  };

  // create a moving item
  function createAgent(x = 0, y = 0, vx = 0, vy = 0) {
    return {
      position: new p5.Vector(x, y),
      velocity: new p5.Vector(vx, vy),
      acceleration: new p5.Vector(),
      lifespan: 300, // number of frames
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
    agent.velocity.mult(damping);
    agent.position.add(agent.velocity);
    // set acceleration to zero
    agent.acceleration.mult(0);
    agent.lifespan--;
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
};

new p5(sketch);

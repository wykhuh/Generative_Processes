import p5 from "p5";

const sketch = (s) => {
  let agent;
  let damping = 1;

  s.setup = () => {
    s.createCanvas(s.windowWidth, s.windowHeight);

    agent = createAgent();
  };

  s.windowResized = () => {
    s.resizeCanvas(s.windowWidth, s.windowHeight);
  };

  s.draw = () => {
    s.background(255);

    render(agent);
    move(agent);
  };

  function createAgent() {
    let agent = {
      pos: new p5.Vector(s.random(s.width), s.random(s.height)),
      vel: new p5.Vector(s.random(-1, 1), s.random(-1, 1)),
      acc: new p5.Vector(),
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
};

new p5(sketch);

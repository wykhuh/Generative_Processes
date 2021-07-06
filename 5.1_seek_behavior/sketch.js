import p5 from "p5";

const sketch = (s) => {
  let agent;
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
};

new p5(sketch);

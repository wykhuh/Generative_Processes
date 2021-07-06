import p5 from "p5";

const sketch = (s) => {
  let group = [];
  let damping = 1;

  //----------------------------------------------
  s.setup = () => {
    s.createCanvas(s.windowWidth, s.windowHeight);
  };

  s.windowResized = () => {
    s.resizeCanvas(s.windowWidth, s.windowHeight);
  };

  s.draw = () => {
    s.background(255);

    if (group.length < 150) {
      group.push(createAgent());
    }

    // create a vector for mouse
    let mouse = new p5.Vector(s.mouseX, s.mouseY);

    for (let agent of group) {
      // behaviors
      seek(agent, mouse, 0.5);

      separate(agent, group, 1.5);
      align(agent, group);
      cohesion(agent, group);

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
      steer(agent, sum, strength);
    }
  }
};

new p5(sketch);

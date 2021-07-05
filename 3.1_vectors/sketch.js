import p5 from "p5";

const sketch = (s) => {
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

    // set acceleration to zero
    agent.acceleration.mult(0);

    // vector for mouse position
    let target = new p5.Vector(s.mouseX, s.mouseY);

    // subtract position vector from current mouse vector to calculate the
    // needed vector in order to make square follow mouse
    let diff = target.sub(agent.position);
    // reduce vector
    diff.mult(easing);

    // add vectors
    agent.acceleration.add(diff);
    agent.velocity.add(agent.acceleration);
    agent.velocity.mult(damping);
    agent.position.add(agent.velocity);

    s.push();
    // to rotate the square, we need to move origin to center of square
    s.translate(agent.position.x, agent.position.y);
    // rotate square to match angle of the velocity
    s.rotate(agent.velocity.heading());
    s.rect(0, 0, 50);
    s.pop();

    // drawVector();
  };

  function createAgent() {
    return {
      position: new p5.Vector(),
      velocity: new p5.Vector(),
      acceleration: new p5.Vector(),
    };
  }

  function drawVector() {
    s.line(0, 0, position.x, position.y);

    // draw velocity vector
    s.push();
    s.translate(position.x, position.y);
    s.line(0, 0, velocity.x * 20, velocity.y * 20);
    s.pop();
  }
};

new p5(sketch);

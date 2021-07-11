import * as dat from "dat.gui";

export function displayInstructions(s, message, color = 255) {
  s.textAlign(s.LEFT);
  s.stroke(color);
  s.fill(color);
  s.textSize(18);
  s.text(message, 20, 20);
}

// some projects run the draw loop once, then stop the loop. Starts the loop
// to reset the sketch.
export function displayStartLoopControl(s) {
  function reset() {
    s.loop();
  }

  let gui;
  let settings = {
    reset,
  };

  gui = new dat.GUI();
  gui.add(settings, "reset");
  gui.width = 150;
}

// Some projects heavily rely on randomness. resetes the browser
// to reset the sketch.
export function displayReloadBrowserControl(s, groups) {
  function reset() {
    window.location.reload();
  }

  let gui;
  let settings = {
    reset,
  };

  gui = new dat.GUI();
  gui.add(settings, "reset");
  gui.width = 150;
}

// Resets the controls to default values.
export function resetControls(gui) {
  for (let c of gui.__controllers) {
    c.setValue(c.initialValue);
  }
}

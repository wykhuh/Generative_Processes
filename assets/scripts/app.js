const items = [
  "1.1_intro",
  "1.2_tapestry",
  "1.3_probability",
  "2.1_perlin_noise",
  "2.2_dancing_lines",
  "2.2.2_dancing_square",
  "3.1_vectors",
  "3.2_particles",
  "3.3_particle_drawing",
  "4.1_random_colors",
  "4.2_image_grid",
  "4.3_perlin_field",
  "5.1_seek_behavior",
  "5.2_group_behavior",
  "5.3_painting_with_agents",
  "5.4_generative_collage",
  "5.5_offscreen_symmetry",
  "6.1_tonejs",
  "6.2_synths",
  "6.3_pendulums",
  "7.1_note_mapping",
  "7.2_sequences",
  "7.3_fuge",
  "7.4_randomization",
  "8.1_chords",
  "8.2_motifs",
  // insert text -->
];

function createGrid() {
  const appEl = document.getElementById("app");
  if (appEl == undefined) return;

  const ulEl = document.createElement("ul");
  items.forEach((item, i) => {
    createListItem(item, i, ulEl);
  });
  appEl.appendChild(ulEl);
}

function createListItem(item, i, ulEl) {
  const liEl = document.createElement("li");
  const linkEl = document.createElement("a");
  const imgEl = document.createElement("img");
  const spanEl = document.createElement("span");

  imgEl.src = `./assets/images/${item}.png`;

  linkEl.href = `./${item}/`;
  linkEl.appendChild(imgEl);

  spanEl.innerText = item.replaceAll("_", " ");
  linkEl.appendChild(spanEl);

  liEl.appendChild(linkEl);
  ulEl.appendChild(liEl);
}

function init() {
  createGrid();
}

document.addEventListener("DOMContentLoaded", () => {
  init();
});

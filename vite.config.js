const { resolve } = require("path");

module.exports = {
  base: "/Generative_Processes/",
  build: {
    outDir: "docs",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        "1.1_intro": resolve(__dirname, "1.1_intro/index.html"),
        "1.2_tapestry": resolve(__dirname, "1.2_tapestry/index.html"),
        "1.3_probability": resolve(__dirname, "1.3_probability/index.html"),
        "2.1_perlin_noise": resolve(__dirname, "2.1_perlin_noise/index.html"),
        "2.2_dancing_lines": resolve(__dirname, "2.2_dancing_lines/index.html"),
        "2.2.2_dancing_square": resolve(
          __dirname,
          "2.2.2_dancing_square/index.html"
        ),
        "3.1_vectors": resolve(__dirname, "3.1_vectors/index.html"),
        "3.2_particles": resolve(__dirname, "3.2_particles/index.html"),
        "3.3_particle_drawing": resolve(
          __dirname,
          "3.3_particle_drawing/index.html"
        ),
        "4.1_random_colors": resolve(__dirname, "4.1_random_colors/index.html"),
        "4.2_image_grid": resolve(__dirname, "4.2_image_grid/index.html"),
        "4.3_perlin_field": resolve(__dirname, "4.3_perlin_field/index.html"),
        "5.1_seek_behavior": resolve(__dirname, "5.1_seek_behavior/index.html"),
        "5.2_group_behavior": resolve(
          __dirname,
          "5.2_group_behavior/index.html"
        ),
        "5.3_painting_with_agents": resolve(__dirname, "5.3_painting_with_agents/index.html"),
        "5.4_generative_collage": resolve(__dirname, "5.4_generative_collage/index.html"),
        "5.5_offscreen_symmetry": resolve(__dirname, "5.5_offscreen_symmetry/index.html"),
        "6.1_tonejs": resolve(__dirname, "6.1_tonejs/index.html"),
        "6.2_synths": resolve(__dirname, "6.2_synths/index.html"),
        "6.3_pendulums": resolve(__dirname, "6.3_pendulums/index.html"),
        "7.1_note_mapping": resolve(__dirname, "7.1_note_mapping/index.html"),
        "7.2_sequences": resolve(__dirname, "7.2_sequences/index.html"),
        "7.3_fuge": resolve(__dirname, "7.3_fuge/index.html"),
        // insert text -->
      },
    },
  },
};

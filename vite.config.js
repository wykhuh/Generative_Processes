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
        // insert text -->
      },
    },
  },
};
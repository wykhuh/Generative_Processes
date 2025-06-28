# Generative Processes

Exercises from David Bouchard Generative Processes class. [YouTube playlist](https://www.youtube.com/playlist?list=PLLx7jIm38p9m6n8X01Sz2kQaSC9U6_6u5). [Live Demo](https://wykhuh.github.io/Generative_Processes/)

## install libraries

install libraries

- [p5.js](https://p5js.org) is the main library for creating the visuals and sounds.
- [Vite](https://vitejs.dev) is the javascript bundler and dev server.

```{bash}
npm install
```

## start server

```{bash}
npm run dev <directory>
```

This will start the vite dev server that automatically refreshes the files and browser when the files change.

## copy directory

```{bash}
./copy_files.sh <source directory> <new directory>
```

`<source directory>` is `template` or `template_audio`

The script will:

1. create a new directory by copying the source directory
2. add the new directory to index.html and vite.config.js

## build files

```{bash}
npm run build
```

Adds GH Pages directory to paths.

```{bash}
npm run build-ghpages
```

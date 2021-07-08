tone.js wrapper for web audio

- create sounds

tonal.js

- music theory
- get all notes from scale
- transpose notes

```js
import * as Tone from "tone";
import { Note, Interval, Scale } from "@tonaljs/tonal";
```

===

Tone.Master

- last element in sound chain
- think of it as a speaker
- depreciated

use .toDestination() instead of Tone.Master

frequency defaults to 440, A4

```js
osc = new Tone.Oscillator();
osc.toDestination();
osc.type = "triangle";
osc.volume.value = -9;
```

```js
osc = new Tone.Oscillator({
  type: "triangle",
  volume: -9,
});
osc.toDestination();
```

==

oscillators have 4 types: sine (default), square, triangle, sawtooth

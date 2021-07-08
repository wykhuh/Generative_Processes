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

```js
// defaults to 440, A4
new Tone.Oscillator();
```

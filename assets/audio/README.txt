Pin Masters RPG - custom audio files (optional)

By default every sound and song is synthesized in code (src/audio.js), so this folder can stay empty.
To replace one with a real recording, copy an MP3/WAV/OGG/M4A file here and list it in manifest.json, e.g.

{
  "sfx":   { "strike": "my_strike.mp3", "click": "click.wav" },
  "music": { "menu": "menu_theme.mp3" }
}

Sound names: click, release, pins, strikeCrash, gutter, gutterEnd, strike, spare, split, sweep,
             levelup, coin, denied, win, loss, brock, champion
Music names: menu, match, tense   (music files loop)

Then run `node build.js` and republish dist/. Only use files you made or have the rights to.
Overrides load when the game is served over http(s) or inside the Android app (not from file://).

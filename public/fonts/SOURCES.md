# JetBrains Mono font sources

## Sora

- `Sora-Variable.ttf`: variable font from the [Google Fonts Sora repository](https://github.com/google/fonts/tree/main/ofl/sora), served locally by `next/font/local` for portfolio titles and heading roles only.
- `Sora-OFL.txt`: the original SIL Open Font License, Version 1.1, distributed with the Google Fonts source.

## JB hero mark

- `src/data/jb-mark.ts` contains the original JB outline shared by the immediate SVG fallback and the optional WebGPU chrome rendering. The chrome renderer is a self-contained adaptation of the supplied `metal-badge.tsx`; its inlined earcut license notice is retained. The supplied renderer's separate purchase notice restricts resale or redistribution as a template, kit, or component library.

- `JetBrainsMono-Latin-Variable.woff2`: the Latin subset of JetBrains Mono served by [Google Fonts](https://fonts.google.com/specimen/JetBrains+Mono), downloaded from its official `fonts.gstatic.com` CDN. Used locally through `next/font` for UI weights 400–700; approximately 31 KB.
- `JetBrainsMono-Regular.ttf`: downloaded from the [official JetBrains Mono repository](https://github.com/JetBrains/JetBrainsMono/tree/master/fonts/ttf). Used only to render the Open Graph PNG on the server.
- `OFL.txt`: the original SIL Open Font License from the official JetBrains repository.

The deployed site makes no requests to Google Fonts or any other font CDN. The UI font includes Latin text and punctuation; if future content needs additional scripts, add the matching JetBrains Mono subset rather than substituting a different typeface.

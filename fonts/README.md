# Fonts

Latin subsets, self-hosted so a cold load needs no third-party round trip.
Each file is the exact woff2 the Google Fonts CSS API serves for its family;
re-fetch by requesting the family from `fonts.googleapis.com/css2` with a
modern browser User-Agent and pulling the `latin` `@font-face` src.

| File | Family | Weights | Upstream |
| --- | --- | --- | --- |
| `archivo-latin-var.woff2` | Archivo | 400–700 (variable) | https://fonts.google.com/specimen/Archivo |
| `newsreader-latin-300.woff2` | Newsreader | 300 | https://fonts.google.com/specimen/Newsreader |
| `plex-mono-latin-400.woff2` | IBM Plex Mono | 400 | https://fonts.google.com/specimen/IBM+Plex+Mono |
| `plex-mono-latin-500.woff2` | IBM Plex Mono | 500 | https://fonts.google.com/specimen/IBM+Plex+Mono |

All three families are licensed under the SIL Open Font License 1.1, which
permits redistribution: https://openfontlicense.org

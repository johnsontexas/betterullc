# frameguide-shots

Builds `public/apps/frameguide/*.webp` — the five phone screens the homepage
chapter and the `/frameguide` rail use. Output is 720×1561, matching every
other app's screenshots.

```bash
cd tools/frameguide-shots
# shot3.png = the 3rd iPhone screenshot from the App Store listing, full size:
#   https://itunes.apple.com/lookup?id=6799570925  → screenshotUrls[2]
#   swap the trailing /320x480bb.jpg for /2000x2000bb.png
curl -o shot3.png '<that url>'
python3 generate.py ../../public/apps/frameguide
```

## Where the pixels come from

`thirds.webp` is the real app screen, cropped straight out of the App Store
marketing asset (the bottom ~90px of home-indicator area is padded in, because
the marketing shot crops the device off). `hero.webp`, `scene.webp`,
`album.webp` and `pro.webp` are rebuilt from the same UI vocabulary — colours,
type and copy all taken from the real screens — because the marketing shots cut
those views off mid-sheet or render them rotated inside a device mockup.

The landscape photo is lifted from the real viewfinder and its rule-of-thirds
overlay is painted back out (`clean_photo`), so screens that aren't in
thirds mode don't carry a grid that belongs to a different mode.

## Replacing these with real captures

These are stand-ins. When you have clean 1206×2622 captures from the device,
drop them in `public/apps/frameguide/` under the same five names and delete
this tool — nothing else needs to change, because `lib/apps.ts` only refers to
the paths.

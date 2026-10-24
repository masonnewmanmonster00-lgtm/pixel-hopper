# pixel-hopper

Pixel Arcade is a static cabinet of browser games. Open `index.html` for the arcade. Learning Lab, a set of educational games, lives in `edu/`.

There is no build step and no server. Scores stay in the browser.

## Learning Lab

Open `edu/index.html`. The lab includes the original eight, plus more games added alongside them:

- Math Facts
- Times Race
- Pizza Fractions
- Flag Quiz
- Telling Time
- Science Check
- Spelling Bee
- Money Count
- French Basics
- Weather & Seasons
- Food & Nutrition
- Human Body Explorer
- Recycling Sorter
- Place Value Blocks
- Roman Numerals
- World Landmarks
- Sign Language ABC
- Feelings Friends
- Citizen Squad
- Ancient China
- First Aid Heroes
- Calendar Quest
- Instrument Families
- Road Safety Squad

Each game has Easy, Medium, and Hard, keeps a best score on this device, and links back to the Learning Lab home. That home links back to the arcade.

## Run it locally

From the repository root:

```bash
python3 -m http.server 8000
```

Then visit:

- Arcade: http://localhost:8000/
- Learning Lab: http://localhost:8000/edu/

Opening the HTML files directly also works. A local server matches GitHub Pages more closely.

## GitHub Pages

`.github/workflows/pages.yml` publishes the whole site, including `edu/`, on every push to `main`.

1. On GitHub, open **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Push to `main`, or run the **Deploy static content to Pages** workflow by hand.
4. The Pages URL is shown on the workflow run and under Settings → Pages. Learning Lab is at `/edu/` on that site.

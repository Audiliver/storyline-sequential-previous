# Storyline Sequential Previous

A reusable **structural Previous button** for Articulate Storyline 360.

The standard Storyline Previous button follows the learner's navigation history. In a non-linear course, that can produce this behavior:

```text
Slide 1 → Jump to Slide 8 → Previous → Slide 1
```

This implementation follows the **structural order of the project** instead:

```text
Slide 1 → Jump to Slide 8 → Previous → Slide 7
```

It can be attached to one custom button on the **Slide Master**, without manually assigning a different destination on every slide.

## What this solves

- A single global Previous button
- Structural navigation instead of browser-like history
- No visible sidebar menu required
- No manual list of slide IDs
- No requirement for the learner to have visited the destination slide
- No slide-by-slide destination maintenance

## How it works

At a high level, the script:

1. Reads the complete slide structure loaded by Storyline
2. Identifies the currently displayed slide
3. Finds its position in that structure
4. Selects the immediately previous structural slide
5. Requests navigation to that slide

## Installation

1. Open your Storyline project.
2. Add a custom **Previous** button to the Slide Master.
3. Create a trigger on that button:
   - **Action:** Execute JavaScript
   - **When:** User clicks
4. Paste the contents of [`sequential-previous.js`](./sequential-previous.js).
5. Publish or preview the project.
6. Test a non-linear route such as:

```text
Slide 1 → Jump directly to Slide 8 → Click Previous
```

The expected result is Slide 7.

## Important compatibility note

This solution uses **internal Storyline runtime structures**, not a documented public navigation API.

That means:

- It may require adjustments after future Storyline updates.
- It should be tested again whenever the project is republished with a newer Storyline version.
- Projects using question banks, lightboxes, hidden slides, or unusual scene structures should be tested carefully.
- This is an independent community solution and is not officially supported by Articulate.

## Recommended test cases

- Linear navigation: `1 → 2 → Previous`
- Non-linear jump: `1 → 8 → Previous`
- Repeated Previous clicks: `8 → 7 → 6 → 5`
- First slide behavior
- Multiple scenes
- LMS/SCORM environment
- Mobile browser
- Resume/relaunch behavior

## Credits

**Research, concept, implementation, and public documentation:**  
Daniel Menezes

This was developed independently as a personal technical research project.

## License

Released under the MIT License. See [`LICENSE`](./LICENSE).

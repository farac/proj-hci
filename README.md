# Count me in!

Hosted on Vercel.

Database hosted on Firebase, using realtime database solution.

## Low Fidelity mockups

Made with Figma

### Wireframe view of interface:

![Main_page_wireframe](images_report\main_page_wireframe.jpg)

### Wireframe view of mobile interface:

![Main_page_wireframe_mobile](images_report\main_page_wireframe_mobile.jpg)

## High Fidelity mockups and design materials:

### Selected color palette:

Node: addional shades of some colors were used for contrast.

![Palette](images_report\palette.png)

### Desktop mockup:

![Main_page](images_report\main_page.jpg)

### Mobile mockup:

![Main_page_mobile](images_report\main_page_mobile.jpg)

## Final product:

Some slight differences from design documents can be seen, however good amount of consistency between what was planned and what was done.

### Desktop screenshot, as deployed:

Changes from design version: some slight adjustments to fonts etc., different system for deletion of entries.

![Final](images_report\final.png)

### Mobile screenshot, as deployed:

Changes from design version: smaller entries, can display bigger number on screen. Different deletion system.

![Final_mobile](images_report\final_mobile.png)

## Used tools:

Fonts paired using [AI-driven tool](https://huemint.com/website-2/).

Color palette roughtly [selected using AI-driven tool](https://huemint.com/website-2/). Additional refinement by hand.

## Metrics:

### Google PageSpeed results:

![PageSpeed](images_report\PageSpeed.png)

Desktop results are good. Performance results are adequate (given realiance on realtime database updates for rendering) even on simulated throttled connection. No data is stored locally, so first load will be expected to be slower, but the desktop version of the site handles it rather well.

![PageSpeed_mobile](images_report\PageSpeed_mobile.png)

Mobile results are considerably worse. The first load takes much longer, due to the aforementioned Firebase database. This could perhaps be improved by choosing some other hosting solution (the free tier of hosting is limited in some ways) or exploring some other design choices that don't involve relying too much on a remote database not under our control. Additionally, the layout shift is rather high, likely due to the detection and switching to mobile mode.

Overall accessability could be improved on both versions, but for such a specialised niche tool, this results can be considered adequate.

## Details from the design:

### Higlights on button mouseover:

![highlights](images_report\highlights.gif)

### Tooltips on mouseover of some elements:

![tooltips](images_report\tooltip.gif)

### Contextual clues when delete mode is enabled:

![delete](images_report\delete.gif)

### Simple, tooltip based editing dialogues:

![delete](images_report\editing.gif)

### Automatic sorting of entries by initiative count:

![sorting](images_report\sorting.gif)

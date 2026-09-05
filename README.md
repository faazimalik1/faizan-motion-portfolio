# Faizan Malik — restored portfolio with graphic design gallery

## Upload to GitHub

1. Extract `Faizan_Malik_Portfolio_Compact_Gallery_GitHub_Ready.zip`.
2. Open your existing `faizan-motion-portfolio` repository on GitHub.
3. Choose **Add file → Upload files** in the branch/folder used by GitHub Pages.
4. Upload the extracted contents, including the entire `assets` folder. Do not upload the ZIP itself or an extra enclosing folder.
5. Replace matching files and commit. Wait for your existing Pages deployment to finish, then refresh your live website with **Ctrl + Shift + R**.

`index.html`, `style.css`, `script.js`, `enhancements.js`, `gallery.js`, `resume.pdf`, `resume.docx`, and `assets` must sit together in the publishing folder. No install or build is required.

## This version

Restores the original hero, dark moving banner, Selected Work cards, About section, animated experience timeline, count-up statistics and resume layout. Keeps the FM monogram, updated one-page PDF and Word resume, newer contact layout, animated contact icons and copy-email button. Behance is removed.

Adds the newer toolkit with the original site's card surface, glow and pointer tilt. The main page shows four selected designs. “View all 15 designs” opens the complete collection in an overlay. All 15 supplied images remain included. Closing a full-size image returns to the collection; closing the collection returns to the main page. Images are included at their original resolution. Click any image for a full preview; use Previous/Next or the left/right arrow keys to browse. Escape closes the preview.

The eight Vimeo projects and their URLs are unchanged. Vimeo playback requires internet access and the videos' existing embed permissions. Google Fonts has system font fallbacks.

## Replace a design image

Replace the matching `assets/designs/design-01.jpg` through `design-15.jpg` file with your new image, preserving its filename. The thumbnail and full preview will both update.

To change a title, category or description, edit its entry in `gallery.js`. Also update the corresponding card title, category and image alt text in `index.html`, under `id="graphics"` for featured cards and `id="collection-dialog"` for the full collection.

## Add another design

1. Upload a new image to `assets/designs/`, for example `design-16.jpg`.
2. Copy an entry in `gallery.js`, add it at the end of the list with a comma between entries, and update its title, category, image path and alt text.
3. In `index.html`, copy a complete `<button class="design-card tilt-card reveal" ...>...</button>` inside the `collection-grid` element.
4. Change `data-design` to the new entry's zero-based position (the 16th image is `data-design="15"`). Update its `aria-label`, image `src`, image `alt`, title and category.
5. Commit both files and the image.

Use lowercase filenames, avoid spaces, and match capitalization exactly. Image paths should start with `assets/designs/`, without a leading slash, so they work inside your GitHub project URL.

## Resume updates

The latest one-page resume is already included. For future changes, replace `resume.pdf` and `resume.docx` using those exact names.

## Checks performed

- Original hero, ticker, work, about, experience and counter markup preserved.
- Original CSS and scroll/hover/counting JavaScript retained.
- All 15 original images included and file contents verified.
- All eight original Vimeo iframe URLs preserved.
- Local file links, section anchors and JavaScript syntax checked.
- The included PDF remains one page.

Live browser and Vimeo playback testing were not performed in this revision.

## Featured designs

The four main-page cards use `data-design` values 5, 2, 9 and 6 (zero-based indexes in gallery.js). Change only those cards to curate a different front-page selection. Keep the complete collection in the overlay and update the visible collection count if you add images.

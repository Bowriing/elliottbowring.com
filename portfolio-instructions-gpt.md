# Portfolio website handover for Claude

Build a personal portfolio with the visual style and interactions of the reference website, using the new owner's information and assets. This document is both a design specification and a working brief for a coding agent. The owner can attach it to Claude with a CV, project information and images, then use the message at the end to begin.

## Reference and implementation

- Reference website: https://www.matthewlockhart.co.uk/
- Reference source: https://github.com/sjglm/matthewlockhart.co.uk
- Reference snapshot: https://github.com/sjglm/matthewlockhart.co.uk/tree/83c4cc1c840b2400daea7099b7db2a1771bcb69c

The website is a static page built with **HTML, CSS and vanilla JavaScript**. There is no framework, theme, database, application server or production build step. The current page loads its own stylesheet and script, without Bootstrap, jQuery, external fonts or a third-party gallery library.

The development process used a coding agent to inspect supplied CVs and project files, write the website, run a local HTTP preview, inspect browser screenshots, and refine the result through the owner's feedback. Automated browser checks supported that review. Git commits and pushes happened after the owner approved the result. Claude can follow the same process using the tools available in its own environment; no particular model, plugin or original-machine setup is required by the website.

Use this file structure for a new implementation:

```text
portfolio/
  index.html
  styles.css
  script.js
  Assets/
    favicon.svg
    project-images/
    cv.pdf
  README.md
  .gitignore
```

Keep temporary extracts, screenshots and review scripts under an ignored `tmp/` directory. Add `CNAME` only when configuring the new owner's confirmed custom domain. Do not carry over the reference site's domain, social accounts, CV files, initials or branded project assets.

## Visual system

Aim for a quiet, professional editorial layout: warm off-white surfaces, dark text, a restrained violet accent, generous spacing and thin rules. Use the darker, more playful treatment only for the games or creative-projects section.

The reference tokens are:

```css
:root {
  --paper: #f7f8f3;
  --white: #ffffff;
  --ink: #22261f;
  --muted: #62685f;
  --line: #dce0d5;
  --accent: #6344ce;
  --accent-soft: #eeebfa;
  --radius: 14px;
  --content-width: 1200px;
  font-family: "Segoe UI", Arial, sans-serif;
}
```

| Element | Reference treatment |
| --- | --- |
| Content width | Maximum 1200px, centred |
| Outer margins | 48px per side on desktop, 32px below 1100px, 20px below 800px and 15px below 360px |
| Body text | Approximately 14–16px with generous line height; use readable contrast |
| Main name | Large, bold, tightly spaced; desktop size uses `clamp(4rem, 7.4vw, 6.5rem)` |
| Section headings | `clamp(2rem, 3.8vw, 3.05rem)` with tight letter spacing |
| Section spacing | About 90px on desktop, reducing to 65px and 50px on smaller screens; avoid doubling gaps between adjacent plain sections |
| Cards | White surface, 1px border, 14px corners, consistent media proportions |
| Technology tags | Small neutral chips with a light border |
| Ordinary project links | Simple violet text with a small arrow and restrained underline |
| Games section | Deep purple `#27213a`, subtle geometric pattern, light text and dark cards `#30283f` |
| Business section | A pale violet band, when relevant to the owner's background |

Use a system font stack to keep setup simple. Avoid heavy shadows, glowing effects, continuous background animation and excessive decorative elements. Hover effects should be subtle and reduced-motion preferences should be respected.

The original owner preferred factual headings and copy. Preserve that character: no motivational taglines, numbered editorial labels, repeated introduction paragraphs or large decorative initials artwork. A small plain initials wordmark is enough unless the new owner supplies their own branding.

## Page structure

Adapt this order to the owner's actual background. Omit irrelevant optional sections rather than inventing material to fill them.

1. **Header:** small initials wordmark, short anchor navigation and a contact link. Keep it sticky, with enough scroll offset that section headings remain visible. Check navigation at narrow widths.
2. **Introduction:** role label above a large name, with one or two useful navigation actions. On desktop, place a short facts panel to the right: current role, other roles, location and mobility if relevant. Stack it on mobile. Avoid repeating the same biography beneath the name.
3. **Professional experience:** chronological roles, newest first. Each entry has dates and location on the left; employer, role, responsibility bullets and technology tags on the right.
4. **Education:** use the **same layout and typography as professional experience**, not a separate design of boxed qualifications. Put dates and location on the left, institution and qualification on the right. Include grades only when supplied.
5. **Courses and qualifications:** list verified courses with provider and completion date where known. If the owner wants a section ready for later, use a brief neutral empty state. Do not fabricate course names.
6. **Software projects:** a responsive card grid, ordered by the owner's priorities. University work may carry a separate “University project” tag.
7. **Games or other creative projects:** optional, with the darker patterned background. Use clear project status labels and galleries where real images exist.
8. **Business or independent work:** optional. Explain the owner's actual remit. A director's section should cover their business responsibilities, such as product design, suppliers, sales and marketing, as applicable; do not reduce their role to software development.
9. **Contact:** the final content section, followed by a small footer. Link to the owner's professional profiles and any CV they want public.

Keep navigation shorter than the full section list if necessary. For example, Education can lead naturally into Courses without a separate header link for every subsection.

## Content and source rules

Collect the owner's facts before writing final copy. Use CVs, transcripts, project notes and their own explanations. Reconcile overlaps and ask about material conflicts instead of silently choosing contradictory dates or titles. Reading a project repository can establish its features, but does not prove that the owner personally implemented every feature.

Write responsibilities as concrete, concise bullets. Distinguish ongoing responsibilities from completed achievements. Do not invent figures, outcomes, grades, project releases, clients, coverage percentages or technologies. Public experience copy should stay at a level the owner can share.

If education includes module results:

- Keep modules grouped by study year or the stages recorded in the transcript.
- Put the full module list inside a native expandable “Modules & grades” disclosure so the surrounding section stays compact.
- Show year summaries outside the disclosure if requested.
- Calculate a credit-weighted average as `sum(mark × credits) / sum(credits)` over graded modules.
- A simple module average is `sum(marks) / number of graded modules`; label it separately.
- Mark ungraded activities as ungraded and exclude them from the averages.
- Label derived results as calculated module averages. Do not describe them as the university's official final degree mark or invent its classification formula.

Extract only the information intended for the website. A source transcript can contain student identifiers, dates of birth and signatures; module results do not require publishing the document itself.

## Components and responsive behaviour

These reference class names make the source easier to navigate if it is available:

| Component | Reference classes |
| --- | --- |
| Shared layout | `.container`, `.section`, `.section-heading` |
| Introduction | `.hero`, `.hero-copy`, `.hero-aside`, `.at-a-glance` |
| Experience and education | `.experience-row`, `.experience-date`, `.experience-content`, `.company`, `.experience-points` |
| Module disclosure | `.module-details`, `.module-year`, `.module-table` |
| Project grid | `.project-grid`, `.project-card`, `.project-media`, `.project-body`, `.tags` |
| Status | `.project-availability`, `.project-development`, `.project-deprecated` |
| Gallery | `.gallery-cover`, `.gallery-label`, `.gallery-dialog` |
| Contact | `.contact-section`, `.contact-links` |

The experience layout uses a 240px date/location column and a flexible content column, separated by 55px on large screens. Reduce those dimensions on tablets and stack the columns on mobile. Reuse those rules for Education so both sections stay consistent.

Project media should reserve a **16:9** area to prevent layout jumps. Use `object-fit: cover` for screenshots. Preserve the proportions of logos and keep clear space around them. Card bodies use a flex column so tags and links sit neatly towards the bottom without clipping longer descriptions.

The reference software grid has three columns on desktop, two at 800px and below, and one at 560px and below. The game grid moves to two columns at 1100px. These are starting points; test the new owner's actual titles and content.

Keep status labels distinct from technology tags. Use statuses that are true: for example “In development,” “Coming soon on Steam,” “Released” or “Deprecated.” Preserve supplied projects unless the owner asks to remove them.

## Gallery behaviour

Use a native HTML `<dialog>` with a small amount of JavaScript. The reference gallery has:

- A clickable cover image with a compact “View gallery” control and image count in the bottom-right corner.
- A visible close button, previous and next buttons, caption and position counter.
- Left and right arrow navigation, Escape to close, and focus returning to the cover link.
- Modal background interaction disabled while open, with body scrolling locked.
- Captions written with `textContent`, appropriate image alt text and visible keyboard focus.
- Images loaded when selected, rather than preloading every full-resolution gallery image on page load.
- A normal image link as the fallback when JavaScript is unavailable. Modified clicks should still support opening an image in another tab.

The cover and additional image links share a unique group name:

```html
<a class="project-media gallery-cover"
   href="Assets/project-images/example-01.jpg"
   data-gallery="example-gallery"
   data-caption="Example project — main screen"
   aria-label="Open Example project gallery, 2 images">
  <img src="Assets/project-images/example-01.jpg"
       alt="Describe the visible project screen."
       width="800" height="450" loading="lazy" decoding="async">
  <span class="gallery-label">View gallery <span>2 images</span></span>
</a>
<a href="Assets/project-images/example-02.jpg"
   data-gallery="example-gallery"
   data-caption="Example project — settings screen"
   hidden></a>
```

The group's count, accessible label and additional links must agree. The complete reference implementation is in `script.js` and the dialog near the end of `index.html`.

## Assets and links

Use the owner's real screenshots, logos and documents. If images will arrive later, show an intentional placeholder with the project name and a short “Project images coming soon” note; do not leave broken image URLs.

A conceptual illustration can represent a project when appropriate, but its alt text should describe it as an illustration. It must not be passed off as a working application screenshot. The reference site's globe artwork was generated for this purpose. Image generation is an optional asset-production step, not a dependency of the website; use whatever authorised tools exist in the new environment.

Store assets locally with descriptive filenames. If official promotional images are supplied or authorised for the owner's project, verify the source and record it. Verify website and store links before adding them. Keep artwork, logos and their proportions intact. Use employer and education names as text where logo reuse permission has not been established.

Keep relative paths so the page works locally and under a hosted subdirectory. External links that open new tabs should include `rel="noopener noreferrer"` and an accessible indication where useful. Use a simple favicon based on the owner's initials or approved branding.

## Working process

1. **Inspect and collect:** read the working directory's instructions and existing files. Ask for the owner's information using the checklist below. Identify the parts of the reference they particularly want to keep.
2. **Create the content:** organise roles, education, courses and projects. Resolve uncertainties that affect factual claims. Use clear placeholders for optional missing assets.
3. **Build the page:** write semantic HTML, shared CSS tokens and the small gallery script. Keep content available in the initial HTML. Do not introduce a framework or package installation solely to reproduce this design.
4. **Preview:** run a local server and open the site in a browser. Review both desktop and mobile, including long names and project titles.
5. **Refine with the owner:** make the concrete site available for review, then incorporate feedback. Do useful independent work while waiting for optional information.
6. **Validate:** check the cases below, correct defects and review the resulting screenshots.
7. **Deliver:** leave the source, assets and README ready to maintain. Report the preview location, what is complete and what still needs owner input. Commit or publish when the owner asks; check the destination repository, branch and domain before doing so.

Do not assume that Claude has the original agent's browser tools, PDF libraries or filesystem paths. Use available equivalents. If a browser cannot be opened, still start and verify the local server, then provide its URL and state the specific limitation.

## Local preview and publishing

From the new portfolio directory, a Python preview can run with:

```sh
python -m http.server 8765 --bind 127.0.0.1
```

Open http://127.0.0.1:8765. On systems where Python is named `python3`, use that command instead. If the port is occupied, choose another available local port. A preview server is not the production hosting service.

The resulting HTML, CSS, JavaScript and assets can be served by a static host. The reference repository uses a custom-domain `CNAME` file and is stored on GitHub. For a new GitHub Pages deployment, configure the new owner's repository and its publishing source using that account's settings; do not assume the reference site's account, domain or deployment configuration applies. Verify that the deployed page serves the intended version before reporting it live.

## Checks before delivery

- Check widths of **320, 390, 560, 768, 1024, 1440 and 1920px** for horizontal overflow, navigation collisions, wrapping and readable text.
- Inspect screenshots of the introduction, experience, education, project cards, any darker section and contact. Automated width checks alone do not establish good layout.
- Confirm that dates and content columns line up across jobs and education, and that Contact is last.
- Check every local image, stylesheet, script, PDF and anchor target. No browser console errors or failed asset requests should remain.
- Verify gallery counts, image decoding, captions, wraparound, arrow keys, Escape, close buttons and focus restoration.
- Check native disclosures with keyboard and touch, including long module titles and grades at narrow widths.
- Use one H1 for the person's name, a coherent heading hierarchy, a skip link, informative alt text and visible focus indicators.
- Respect reduced motion, and retain readable content and basic links with JavaScript disabled.
- Confirm all projects, statuses, grades and business claims against the supplied information. Recalculate any derived averages from the source values.
- Keep private source documents and temporary review material out of the published files. Verify the staged file list before a requested commit and push.

Browser automation such as Playwright is useful when available, but is optional development tooling. Keep its installation and review outputs separate from the website's runtime files. For small copy changes, a focused inspection is sufficient; do not build a test framework around the page.

## Information to supply

The new owner should provide whatever applies:

| Area | Information |
| --- | --- |
| Identity | Preferred name, initials or logo, professional role label, location and mobility preference |
| Purpose | Intended audience and the work or opportunities the site should support |
| Experience | Employer, exact role title, dates, location, responsibilities, achievements and technologies for each role |
| Education | Institution, qualification, dates, grades and any modules they want shown |
| Courses | Course title, provider, completion date, result or credential link where relevant |
| Projects | Name, description, their contribution, technologies, university/personal/commercial context, status and preferred ordering |
| Media | Screenshots, gallery order, captions, logos, and which images still need placeholders |
| Business work | Position, company description and the full responsibilities they want to communicate |
| Contact | Approved public profile links, CV and any public contact address |
| Hosting | New repository, desired domain, existing site files and publishing preference |

Missing optional material should not stop the first useful local draft. Ask about missing facts that would otherwise force an invented claim.

## Message to paste into Claude

```text
Create my personal portfolio website using the attached portfolio handover as
the design and implementation brief. Use my information and assets to make
the site my own.

Keep the reference's warm off-white background, dark typography, violet accents,
large name, shared experience/education timeline layout, project cards and
compact native image galleries. Use plain HTML, CSS and JavaScript unless my
existing repository gives a concrete reason to do otherwise.

Read the handover and any existing repository instructions before editing.
Collect my information, then build a useful local draft and open it for review.
Avoid slogans, numbered decorative headings and repeated biography text.
Include only sections relevant to my background; keep Contact last.

Use only supported facts. Preserve my supplied projects and clearly label their
statuses. Ask about important uncertainties and use intentional placeholders
for images I will supply later. Keep private source material out of the site.

Check desktop and mobile layouts, links, assets, gallery controls and keyboard
access before handing it back. Explain how to preview and maintain it. Leave
the result ready for review and wait for my publishing instructions.

My information and files follow:
[Attach your CV, project notes and images, or paste the relevant details here.]
```

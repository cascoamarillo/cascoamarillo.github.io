# How to update this site

The short version: **edit a file, run `./publish.sh "what changed"`, wait a minute.**
GitHub rebuilds the site automatically every time you push. You never run a
build yourself.

---

## The everyday loop

```bash
cd ~/Claude/Projects/Website/site
# ...edit whatever needs changing...
./publish.sh "added 2027 Nature paper"
```

That stages everything, commits it, and pushes. The live site at
rodriguezf.org updates roughly a minute later.

If you'd rather type the git commands yourself, it is the same three lines:

```bash
git add -A
git commit -m "added 2027 Nature paper"
git push
```

**No computer handy?** You can edit any file directly on github.com — open the
file, click the pencil icon, "Commit changes". Same result.

---

## The four things you'll actually change

Almost nothing lives in the HTML. The content is in `_data/`, and the pages
build themselves from it.

### Add a publication → `_data/publications.yml`

Copy a block, paste it at the **top** of `articles:`, edit it:

```yaml
  - year: 2027
    authors: "Smith A, Rodriguez F, Jones B"
    title: "Title of the paper, sentence case"
    journal: "Journal Name"
    detail: "12(3):123-145"
    doi: "10.1234/abcd.5678"
    pdf: "rodriguez_2027_short-name.pdf"   # optional; put the file in assets/pdfs/
```

Updates the Publications page, the entry count, and "Recent publications" on
the home page, all at once. Keep the spelling `Rodriguez F` — that's what gets
bolded.

### Add a student → `_data/students.yml`

One entry per student, newest first, under `undergraduate:` or `graduate:`:

```yaml
  - year: "2027"
    name: "Jane Doe"
    affiliation: "Rochester Institute of Technology"
    project: "What they worked on."
    publication:                      # optional; delete if there isn't one
      label: "Doe, Rodriguez et al., 2027"
      doi: "10.1234/abcd.5678"
```

With a `doi:` you get a green clickable paper button. Without one (but keeping
`label:`) you get a muted "in preparation" marker.

### Add or change a course → `_data/teaching.yml`

Four lists: `current:`, `record:`, `lectures:`, `qualifications:`. The
"Currently teaching" block on the CV page reads from `current:` too, so you
only maintain it in one place.

### Update your CV PDF → `assets/cv.pdf`

Overwrite the file, keep the name. It's linked from the CV page button and
from the Teaching page, both through one setting in `_config.yml`.

Everything else — your name, email, office, ORCID, the nav, the Resources
dropdown — is in `_config.yml`.

---

## Checking before you push (optional)

You don't need to. But to see it locally first:

```bash
bundle install          # once, the first time
bundle exec jekyll serve
# open http://localhost:4000, Ctrl-C to stop
```

Opening the `.html` files by double-clicking will **not** work — they're
templates, not finished pages. Jekyll assembles them.

---

## When something goes wrong

**The live site looks like plain unstyled text.**
A `.nojekyll` file got into the repo. That tells GitHub not to run Jekyll.
Delete it and push.

**GitHub says the build failed.**
Almost always YAML. In `_data/*.yml`, any value containing a colon-space must
be quoted:

```yaml
title: Mobile elements: a review     # breaks the build
title: "Mobile elements: a review"   # correct
```

The error email names the file and line. Fix, push again.

**A PDF link 404s.**
The `pdf:` filename in `_data/publications.yml` has to match the file in
`assets/pdfs/` exactly, including case.

**`git push` is rejected.**
Someone (probably you, on github.com) changed the repo since your last pull:

```bash
git pull --rebase
git push
```

---

## Where things live

```
_config.yml           name, email, office, links, nav, Resources menu
_data/                publications, students, teaching, cv  ← most edits here
_includes/            header, footer, and the small repeated bits
_layouts/default.html the page shell
assets/css/style.css  all styling; the colors are variables at the top
assets/pdfs/          paper PDFs
assets/cv.pdf         your CV
*.html                one file per page
README.md             first-time setup, DNS records, full reference
```

Never edit anything in `_site/` — it's generated output and gets overwritten.

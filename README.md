# rodriguezf.org

Personal academic site for Fernando Rodriguez, Ph.D. Built with
[Jekyll](https://jekyllrb.com/) and hosted free on GitHub Pages. No build step
to run yourself; GitHub rebuilds the site every time you push.

---

## 1. Put it on GitHub

1. Create a new repository on GitHub. Any name works, e.g. `website`.
   (If you name it exactly `<your-username>.github.io` it will also be served
   at that address for free.)
2. Upload these files to the repo. Either drag the whole folder onto GitHub's
   "uploading an existing file" page, or from a terminal:

   ```bash
   cd path/to/this/folder
   git init
   git add .
   git commit -m "New site"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
   git push -u origin main
   ```

3. In the repo, go to **Settings → Pages**. Under *Build and deployment*, set
   **Source** to `Deploy from a branch`, branch `main`, folder `/ (root)`.
   Save. The first build takes a minute or two.

## 2. Point rodriguezf.org at it

The repo already contains a `CNAME` file with `rodriguezf.org` in it, which
tells GitHub the domain to expect.

At your domain registrar, set these DNS records:

| Type  | Name  | Value |
|-------|-------|-------|
| A     | `@`   | `185.199.108.153` |
| A     | `@`   | `185.199.109.153` |
| A     | `@`   | `185.199.110.153` |
| A     | `@`   | `185.199.111.153` |
| CNAME | `www` | `YOUR-USERNAME.github.io.` |

Then in **Settings → Pages → Custom domain**, enter `rodriguezf.org`, save, and
tick **Enforce HTTPS** once the certificate has been issued (can take up to an
hour).

Keep the WordPress site up until the new one resolves, then retire it.

---

## 3. Editing the site

Everything you will realistically want to change lives in the `_data/` files and `_config.yml`.

### Add a publication: `_data/publications.yml`

Copy an existing block, paste it at the **top** of the `articles:` list, edit
the fields. The publications page, the count, and the "Recent publications"
list on the home page all update themselves.

```yaml
  - year: 2027
    authors: "Smith A, Rodriguez F, Jones B"
    title: "Title of the paper"
    journal: "Journal Name"
    detail: "12(3):123-145"
    doi: "10.1234/abcd.5678"
```

`Rodriguez F` is bolded automatically, so keep that spelling.

### Add a student: `_data/students.yml`

One entry per student, newest first, in either the `undergraduate:` or
`graduate:` list. The entry counts on the Students page and the summary
sentence on the CV page both update themselves.

```yaml
  - year: "2027"
    name: "Jane Doe"
    affiliation: "Rochester Institute of Technology"
    project: "What they worked on."
    publication:                      # optional; delete these three lines if none
      label: "Doe, Rodriguez et al., 2027"
      doi: "10.1234/abcd.5678"
```

If a project led to a paper, the citation renders as a green clickable button
that opens the DOI. Leave out `doi:` (but keep `label:`) and you get a muted
dashed marker instead. That is how "in preparation" work is shown. Graduate
entries can also carry `degree: "Ph.D. thesis"`, which becomes a small tag next
to the name.

### Add or change a course: `_data/teaching.yml`

Four lists: `current:` (what's on your RIT directory page now), `record:`
(year-by-year), `lectures:` (invited talks) and `qualifications:`. The
"Currently teaching" block on the CV page is generated from `current:` too, so
you only maintain it in one place.

```yaml
  - code: "BIOL-999"
    name: "Course Title"
    credits: "3 credits"
    level: "Graduate"          # optional small tag next to the title
    description: "What the course covers."
```

### CV entries: `_data/cv.yml`

Appointments, education, teaching, mentoring, service and memberships are all
rows in this file. Add or reorder rows; the page follows.

**Your CV PDF lives at `assets/cv.pdf`.** That one file is referenced in two
places: the "Download PDF" button on the CV page, and the "See the CV" link in
the Research mentoring section of the Teaching page. Both are driven by the
`cv_pdf:` setting in `_config.yml`. When your CV changes, overwrite
`assets/cv.pdf` with the new version and keep the filename the same; nothing
else needs touching and no links break. If the file is ever missing, comment out
`cv_pdf:` and the button disappears while the Teaching page falls back to
linking the CV page instead.

### Name, email, office, profile links: `_config.yml`

Your ORCID is already in there and shows in the footer. Google Scholar,
ResearchGate, Web of Science and GitHub are commented out; uncomment the lines
you want and paste the real URLs in.

### The Resources menu: `_config.yml`

The `nav:` list drives the top menu. A normal entry has a `title` and a `url`.
An entry with a `menu:` becomes a hover/click dropdown instead:

```yaml
  - title: Resources
    menu:
      - title: GitHub
        url: https://github.com/cascoamarillo
        note: cascoamarillo        # optional grey subtitle
```

Add or remove entries under `menu:` and the dropdown follows. Links there open
in a new tab. On narrow screens the whole nav collapses to a menu button and the
dropdown becomes an indented sub-list.

### Your portrait

`assets/img/portrait.svg` is a placeholder. Save your photo from the old site
(right-click → Save image), put it in `assets/img/`, and update `photo:` in
`_config.yml` to point at it. A square image, 600×600 or larger, works best.

### Prose

The About page is `index.html`, the research themes are `research.html`. Both
are plain HTML: edit the text between the tags and leave the `{{ ... }}` bits
alone.

---

## 4. Previewing locally (optional)

Not required; you can edit files on github.com and see the result in a minute.
But if you want a local preview:

```bash
gem install bundler jekyll
bundle install
bundle exec jekyll serve
# open http://localhost:4000
```

---

## Notes on the content I carried over

- **Publications** came from your CV page. I verified each DOI against the
  published record and added the ones your CV was missing. Two corrections
  worth knowing about:
  - The 2024 *Nature Communications* paper is published as **"Bdelloid rotifers
    deploy horizontally acquired biosynthetic genes against a fungal pathogen"**,
    *Nat Commun* **15**:5787; your CV had the earlier preprint title and
    article number 578.
  - The Frontiers editorial is *Front Plant Sci* **12**:735134,
    doi `10.3389/fpls.2021.735134`. (There is a volume II editorial from 2023 as
    well, if you want to add it.)
  - The Methods in Molecular Biology chapter has no DOI listed; add one if you
    have it.
- **Research page descriptions** are my drafts, written from your published
  papers. They read well but they are not your words, so please go through them
  and rewrite anything that misses the mark.
- **Students** came from `FRodriguezCV2026.docx`, including the DOI links
  embedded in the mentoring tables. That file is newer than your website CV, so
  the Students page has people the old site never listed (Rachel Kulp, Francesca
  Molee, Andrew Alford, Yelle Vandenboer) and corrects several affiliations.
  Brandon M. Le appears twice (2016 and 2017), which is why the count reads
  "19 entries" rather than 19 individuals. Anupriya Dutta is listed under
  Graduate, matching the .docx.
- **Teaching** came from your RIT directory page, which is the "updated list"
  you pointed me at. Note what changed: the directory now lists **BIOL-216
  Molecular Biology Laboratory**, and no longer lists BIOL-125. Your HTML draft
  had BIOL-125 under "Currently teaching", so I moved it into the teaching
  record under 2025 (where your .docx has it) and put BIOL-216 in the current
  list. If you are still teaching BIOL-125, move it back; it is one block in
  `_data/teaching.yml`.
- I kept your course descriptions for ENVS-790, ENVS-791 and ENVS-795, which are
  fuller than the directory's, and used the directory's wording for BIOL-216 and
  BIOL-530/630. Your page structure, your lede paragraph and your mentoring
  note all carried over; only the styling changed.
- Your **ORCID** (0000-0003-4044-8734) came from that draft and is now live in
  the footer on every page. Google Scholar and ResearchGate are still commented
  out in `_config.yml` if you want them too.
- The invited lectures, the Georgia Gosnell seminar, the Inclusive Practices
  cohort and the 2004 Master in Education are all on the Teaching page now, so
  that part of the earlier "not yet shown" list is done. Still outstanding for
  the CV page: your 2004 M.Sc., the Microbiology Resource Announcements
  editorial board, NSF panelist 2025, and Hydrobiologia in the reviewer list.
- **High-school mentoring** (Karun Kulamavalavan, Feodor Morozov, Adilya
  Sunyaev) is deliberately not listed on the Students page. It is covered by the
  Research mentoring paragraph at the foot of the Teaching page, which points
  readers to the CV PDF for the full list.

## Structure

```
_config.yml           site-wide settings
_data/                publications, students, teaching, CV (the content you edit most)
_includes/            head, nav, footer, single publication entry
_layouts/default.html page shell
assets/css/style.css  all styling; colors are variables at the top
assets/js/site.js     mobile menu, nothing else
index.html            About
research.html         Research
publications.html     Publications
students.html         Students
teaching.html         Teaching
cv.html               CV
404.html              not-found page
CNAME                 custom domain
```

Dark mode follows the reader's system setting automatically. There is no
tracking, no cookies, and no JavaScript beyond the mobile menu button.

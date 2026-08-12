# Dev Portfolio — React

React + Vite rebuild of the portfolio site, split into small, easy-to-edit components.

## Project structure

```
src/
  components/
    Navbar.jsx        nav bar (desktop links, theme toggle, edit button)
    MobileMenu.jsx     full-screen mobile nav
    Hero.jsx           landing section (name, title, tagline, profile photo)
    About.jsx          "About Me" section
    Skills.jsx         skill bars, reads from data/projects.js
    Projects.jsx        project grid + category filter
    ProjectCard.jsx     single project card
    CV.jsx              CV download buttons
    Contact.jsx         contact form + info cards
    Footer.jsx
    Toast.jsx           bottom-right notification
    EditorPanel.jsx      the "Edit" live editor panel
    SocialIcons.jsx      GitHub/LinkedIn/X icons (lucide-react dropped brand icons)
  data/
    projects.js          <-- EDIT HERE to add/remove projects, skills, or change
                              default CV file paths and default profile text
  hooks/
    useTheme.js           dark/light mode + localStorage
    useScrollReveal.js     scroll-in animations + skill bar fill
  App.jsx                 wires all sections together, holds shared state
  index.css                all design tokens, colors, animations (was inline <style>)
public/
  cv/                      the three downloadable CV PDFs — swap files here
                            (keep the same filenames, or update data/projects.js)
```

## Common edits

- **Add/remove a project** → edit the `projects` array in `src/data/projects.js`.
- **Change skill percentages** → edit `skillGroups` in the same file.
- **Swap a CV file** → replace the PDF in `public/cv/` (keep the filename) or update
  `defaultCvLinks` in `src/data/projects.js`.
- **Change name / title / tagline / about text** → either edit `defaultProfile` in
  `src/data/projects.js`, or use the in-app "Edit" panel (bottom-left pencil icon) —
  changes there save to the visitor's browser via `localStorage`.
- **Colors / fonts / spacing** → `src/index.css` (CSS variables at the top control
  the whole palette for both dark and light mode).

## Run locally

```bash
npm install
npm run dev       # dev server with hot reload
npm run build     # production build → dist/
npm run preview   # preview the production build
```

## Deploy to Vercel

1. Push this repo to GitHub.
2. In Vercel, choose "Import Project" and select this repository.
3. Set the following Environment Variable in Vercel:

   - `RESEND_API_KEY` = your Resend API key

4. Build command: `npm run build`
5. Output directory: `dist`

### Local Vercel testing

Install Vercel CLI:

```bash
npm install -D vercel
npx vercel dev
```

This will run your frontend and serverless API locally.

## Send email from the contact form

The contact form posts to `/api/contact`, which is implemented in `api/contact.js`.
It uses Resend to forward messages to `jumabrian3583@gmail.com`.

### Local environment

Create a `.env.local` file in the project root with:

```env
RESEND_API_KEY=re_your_api_key_here
```

### Important

Do not commit `.env.local`. It is already ignored by `.gitignore`.

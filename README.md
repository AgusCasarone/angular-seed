# 🚀 Angular v20 Seed (with Tailwind v4 + Prettier)

This repository is a quick start seed project to build modern Angular applications with a basic but powerful setup:

- _Angular v20_: Latest stable Angular with standalone components, signals, Vite-powered builds, and SSR support.
- _Tailwind CSS v4_: Utility-first CSS framework (v4 is a full CSS preprocessor, incompatible with Sass/SCSS).
- _Prettier_: Opinionated code formatter for consistent code style across the team.

______________________

## 🎯 Why this seed?

- _Consistency out of the box_: Includes Prettier + Tailwind plugin for class sorting, for cleaner diffs
- _Performance-ready_: Created with SSR enabled for better Core Web Vitals, SEO, and perceived performance.
- _Compatibility_: Keeps Zone.js enabled for now (max ecosystem compatibility), but can be migrated to Zoneless later.
- _Lightweight setup_: Uses CSS (not SCSS) since Tailwind v4 replaces Sass with its own CSS preprocessing.
- _AI-friendly_: Works well with AI coding assistants (Cursor, Gemini, ChatGPT) and Angular’s official AI prompts.

______________________

## 📖 Usage

    npm install
    
    npm run start

Navigate to <http://localhost:4200> and start building 🚀

[Tailwind cutomizable styles](https://tailwindcss.com/docs/theme) and Prettier formatting are ready to go.

## ⚙️ How was the project setup

```bash
npm install -g @angular/cli
```

```bash
ng new seed
```

Options on creation:

- Stylesheet formar → CSS

  - **Reason:** Allows Tailwind versions ≥4, since they [**do not support SASS**](https://www.notion.so/Angular-Seed-270aabca27a880a485b4dea679a945db?pvs=21) because it works as its own preprocessor.

- SSR → Yes
  - **Reason:** Improves **Core Web Vitals** (especially LCP), SEO visibility, and perceived performance for first-time visitors.
  - **Impact:** Pages render HTML on the server, then hydrate on the client, giving users faster initial paint and improving search indexing.
  - **Best practice:** Combine with `provideClientHydration()` for seamless hand-off.
- Zone.js → [Yes](https://angular.dev/guide/zoneless)
  - **Reason:** Keeps maximum compatibility with third-party Angular libraries and legacy patterns.
  - **Trade-off:** Slightly more overhead and less predictable change detection than a zoneless app, but safer as a default when ecosystem dependencies are unknown.
  - **Future note:** Once the project matures and we confirm all libs use signals / OnPush correctly, we can safely migrate to **zoneless** for performance and cleaner debugging.
- AI tools → personal choice
  - I use VSC, have Cursor installed and preffer Gemini.
  - I am not interested on paying for an AI service.
  - This  eleccion is personal, so for me _Cursor_ is the best choice + using Gemini  and ChatGPT on the web with the [suggested Angular v20 prompts for LLM](https://angular.dev/ai/develop-with-ai)

## INSTALATIONS

Move inside the project

```bash
cd .\seed\
```

### [Install Tailwind v4](https://tailwindcss.com/docs/installation/framework-guides/angular)

Standard and coherent styles for a seamless UI. It allows [variable customization](https://tailwindcss.com/docs/adding-custom-styles#adding-base-styles) for a faster development.

```bash
npm install tailwindcss @tailwindcss/postcss postcss --force
```

Create a **.postcssrc.json** file with the content

```json
{
 "plugins": {
 "@tailwindcss/postcss": {}
}
```

Import TailwindCSS on **./src/styles.css**

```CSS
@import "tailwindcss";
```

### [Install Prettier:](https://prettier.io/docs/install)

1. Install Prettier (exact version)

```bash
npm install --save-dev --save-exact prettier
```

> Pin exact version so everyone formats code the same.
>

---

1. Create config files

- `.prettierrc` → tells tools you’re using Prettier

```bash
node --eval "fs.writeFileSync('.prettierrc','{}\n')"
```

- `.prettierignore` → exclude build artifacts, coverage, etc.

```bash
node --eval "fs.writeFileSync('.prettierignore','# Ignore artifacts:\nbuild\ncoverage\n')
```

> Prettier also respects .gitignore.
>

---

1. Format code

- Format everything:

```bash
npx prettier --write .
```

- Check formatting (CI):

```bash
npx prettier --check .
```

---

1. Editor integration

- Install Prettier plugin in VS Code (or your editor).
- The plugin uses the **local version** from `node_modules` → consistent across team.
- Best experience = auto-format on save.

---

1. Linters

- Use `eslint-config-prettier` so ESLint & Prettier don’t conflict:

```bash
npm install --save-dev eslint-config-prettier
```

---

1. Git hooks (optional but recommended)

- Install husky + lint-staged:

```bash
npm install --save-dev husky lint-staged
npx husky init
```

- Add pre-commit hook (`.husky/pre-commit`):

```bash
npx lint-staged
```

- `package.json`:
It is very important to add the lint-staged configuration BEFORE the Prettier one on the package.json

```json
{
  "lint-staged": {
    "**/*": "prettier --write --ignore-unknown"
  }
}
```

<div align="center">

# PostMee

Your modern blogging playground built with React, Tailwind CSS, and Appwrite.

</div>

## ✨ Features

- **Authentication** – Email/password auth powered by Appwrite, with protected routes for author-only screens.
- **Post Management** – Create, read, update, and delete posts with image uploads and live routing based on slugs.
- **Rich Text Editing** – Craft content in style using TinyMCE with dark/light aware skinning.
- **Responsive Design** – Tailwind CSS v4 delivers polished layouts from mobile to desktop.
- **Dark Mode Toggle** – Persistent theme preference stored via Redux + localStorage.
- **State Management** – Redux Toolkit slices for auth, posts, and theming.
- **Form Validation** – React Hook Form paired with Zod schemas for robust input checking.
- **Safe Rendering** – DOMPurify and html-react-parser ensure sanitized post content.
- **Internationalization (i18n)** – Full multi-language support using i18next and react-i18next, with JSON translation files and dynamic language switching.
- **Language Switcher** – Modern, glassmorphic language selector in the header, fully mobile-friendly and accessible from the mobile menu.

## 🧱 Tech Stack

| Category  | Tools                              |
| --------- | ---------------------------------- |
| Framework | React 19, Vite 7                   |
| Routing   | React Router 7                     |
| State     | Redux Toolkit, React Redux         |
| Forms     | React Hook Form, Zod               |
| UI        | Tailwind CSS 4, custom components  |
| Editor    | TinyMCE React integration          |
| Backend   | Appwrite (Auth, Database, Storage) |
| i18n      | i18next, react-i18next, lingo.dev  |
| Utilities | DOMPurify, html-react-parser       |
| Tooling   | ESLint, @vitejs/plugin-react       |

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/Souma061/Blog-App.git
cd Blog-App
npm install
```

### 2. Configure Environment

Create a `.env` file in the project root and supply your credentials:

```env
VITE_APPWRITE_URL=
VITE_APPWRITE_PROJECT_ID=
VITE_APPWRITE_DATABASE_ID=
VITE_APPWRITE_COLLECTION_ID=
VITE_APPWRITE_BUCKET_ID=
VITE_TINYMCE_API_KEY=
VITE_LINGO_DEV_API_KEY=
```

> ℹ️ In Appwrite, ensure your database collection IDs and bucket IDs match the values above, and allow the desired image extensions (e.g., jpg, jpeg, png, gif).

### 3. Run the App

```bash
npm run dev
```

Open http://localhost:5173/ to explore PostMee locally.

### 4. Internationalization (i18n)

The app supports multiple languages (English, French) using i18next and react-i18next. All UI text is translatable, and you can add more languages by editing the JSON files in `src/locales/`.

- **Switch Language:** Use the language selector in the header (visible on both desktop and mobile) to instantly switch languages.
- **Add Languages:** Add new translation files (e.g., `es.json`) and update i18n config.
- **Batch Translation:** Use the included `translate.cjs` script with lingo.dev to generate translations for new languages.

### 5. Additional Scripts

| Command           | Description                       |
| ----------------- | --------------------------------- |
| `npm run dev`     | Start Vite dev server             |
| `npm run build`   | Create production build           |
| `npm run preview` | Preview production build          |
| `npm run lint`    | Run ESLint over the src directory |

## 🧭 Application Structure

```
src/
	App.jsx                # Entry layout with theme sync and routing outlet
	Appwrite/              # Appwrite auth + CRUD services
	components/            # Reusable UI elements (Header, forms, RTE, LanguageSwitcher, etc.)
	Pages/                 # Route screens (Home, AllPost, Post, Add/Edit, Auth)
	store/                 # Redux slices (auth, post, theme)
	locales/               # i18n translation JSON files (en.json, fr.json, ...)
	utlis/                 # Zod schemas for validation
```

Key flow:

1. `App.jsx` fetches the current user, hydrates Redux auth state, and applies the theme.
2. Routes are defined in `src/main.jsx`, using `<Protected>` wrappers for gated pages.
3. `PostForm` handles both create and edit scenarios, including file uploads via Appwrite Storage.
4. TinyMCE content is sanitized before rendering in `Pages/Post.jsx` to prevent XSS.

## 🔐 Authentication & Posts

- Guests can browse public posts but must log in to create or edit.
- On login, Appwrite session info is stored; Redux keeps the user in state.
- When a post is created:
  - Slug is auto-generated from the title (and kept immutable after publish).
  - Featured image uploads to Appwrite Storage with type validation.
- Edit/delete actions verify author identity before performing operations.

## 🌓 Theming & Language

- Tailwind `darkMode: 'class'` (see `tailwind.config.js`).
- Redux slice `themeSlice` stores `light` or `dark` mode; persisted in `localStorage`.
- Header toggle updates the slice and toggles the root `<html>` class.
- Language selector in the header and mobile menu allows instant language switching.
- Components include matching `dark:` Tailwind utilities for backgrounds, text, and borders.

## 🧪 Linting & Quality

```bash
npm run lint
```

Uses the latest ESLint with React hooks and refresh plugins.

## 🙌 Contributing

1. Fork & branch off `main`.
2. Implement changes and ensure `npm run lint` passes.
3. Consider adding tests (integration/unit) where applicable.
4. Submit a PR with a clear description.

---

---

**Special thanks to [lingo.dev](https://lingo.dev) for powering our fast and easy translation workflow!**

Enjoy using PostMee! Now with full internationalization and a beautiful, mobile-friendly language switcher. Feel free to open issues or feature requests to shape its future.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

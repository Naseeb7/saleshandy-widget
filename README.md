# Saleshandy Testimonials

Saleshandy Testimonials is a full-stack testimonial platform for collecting, reviewing, and publishing customer feedback. It supports the complete testimonial lifecycle:

1. A visitor submits a testimonial.
2. The testimonial is stored as **Pending** in MongoDB.
3. A reviewer approves or rejects it from the moderation dashboard.
4. Approved testimonials automatically appear on the public testimonials wall and embeddable widget.

## Live Demo

- **Application:** https://your-vercel-url.vercel.app
- **Widget:** https://your-vercel-url.vercel.app/widget

> Replace the URLs above with your deployed Vercel application before submission.

---

## Features

### Core

- Public testimonial submission with name, email, company, testimonial, and rating.
- Moderation dashboard for reviewing pending testimonials.
- Approve and reject actions with safe error handling.
- Public testimonials wall displaying approved testimonials only.

### Embeddable Widget

- Lightweight iframe-based embeddable widget.
- Supports both `id="testimonial-widget"` and `data-testimonial-widget` containers.
- Optional `#RRGGBB` accent color customization.
- Responsive loading, empty, and error states.
- Works in modern browsers without additional dependencies.

### Engineering

- Shared client and server-side validation using Zod.
- Thin API route handlers with service-layer business logic.
- Standardized API responses and user-friendly error handling.
- Loading, empty, success, and error states throughout the application.
- Responsive, accessible UI built with reusable components.
- Metadata, canonical URL, `robots.txt`, and `sitemap.xml` support.

---

## Tech Stack

| Layer              | Technology                                      |
| ------------------ | ----------------------------------------------- |
| Frontend           | Next.js 16 App Router, React, TypeScript        |
| Forms & Validation | React Hook Form, Zod                            |
| Backend            | Next.js Route Handlers, Service Layer           |
| Database           | MongoDB Atlas, Mongoose                         |
| Styling            | Tailwind CSS, Semantic Design Tokens            |
| Deployment         | Vercel (or any Node.js-compatible Next.js host) |

---

## Architecture

The project is implemented as a single Next.js application using the App Router.

```
User
   │
   ▼
App Router Pages
   │
   ▼
Route Handlers
   │
   ▼
Service Layer
   │
   ▼
MongoDB
```

Page components compose reusable UI components, while API route handlers delegate business logic and database operations to the service layer. MongoDB access is managed through a cached Mongoose connection. Shared validators, constants, utilities, types, and API helpers are centralized inside `lib/` and reused across the application.

---

## AI-Assisted Development

OpenAI ChatGPT and Codex were used to accelerate implementation, refactoring, documentation, and iterative development. Final architectural decisions, manual verification, testing, and code review were performed manually.

---

## Local Development

### Installation

```bash
npm install
```

Create a local environment file:

```bash
# macOS/Linux
cp .env.example .env

# Windows PowerShell
Copy-Item .env.example .env
```

Configure the required environment variables, then start the development server:

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

### Production Build

```bash
npm run lint
npm run build
npm run start
```

---

## Environment Variables

| Variable               | Required         | Description                                                          |
| ---------------------- | ---------------- | -------------------------------------------------------------------- |
| `MONGODB_URI`          | Yes              | MongoDB Atlas connection string                                      |
| `REJECT_TTL_DAYS`      | Yes              | Number of days rejected testimonials remain before automatic cleanup |
| `NEXT_PUBLIC_SITE_URL` | Yes (Production) | Public application URL used for canonical metadata, sitemap, and SEO |

For local development:

```text
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

For production, use your deployed HTTPS URL.

---

## Project Structure

```text
app/          App Router pages, layouts, metadata, API routes, sitemap, robots
components/   Reusable UI, layout, dashboard, and testimonial components
lib/          Shared utilities, validation, constants, API helpers
models/       Mongoose models
services/     Business logic
types/        Shared TypeScript types
public/       Static assets and widget loader
testing/      Standalone widget integration test page
```

---

## API Overview

All API responses follow a consistent format:

```json
{
  "success": true,
  "data": {}
}
```

or

```json
{
  "success": false,
  "error": {}
}
```

Available endpoints:

| Method | Endpoint                      | Description                                  |
| ------ | ----------------------------- | -------------------------------------------- |
| POST   | `/api/testimonials`           | Submit a new testimonial                     |
| GET    | `/api/testimonials`           | Return approved testimonials only            |
| PATCH  | `/api/testimonials/[id]`      | Approve or reject a testimonial              |
| GET    | `/api/dashboard/testimonials` | Retrieve pending testimonials for moderation |

---

## Widget Usage

Replace the script URL with your deployed application URL.

### Default Embed

```html
<div id="testimonial-widget"></div>
<script src="https://your-vercel-url.vercel.app/widget.js"></script>
```

The data-attribute format is also supported:

```html
<div data-testimonial-widget></div>
<script src="https://your-vercel-url.vercel.app/widget.js"></script>
```

### Accent Customization

`data-accent` is optional and accepts only a six-digit hexadecimal color (`#RRGGBB`).

Invalid values automatically fall back to the default accent color without affecting the host page.

```html
<div data-testimonial-widget data-accent="#2563eb"></div>

<script src="https://your-vercel-url.vercel.app/widget.js"></script>
```

The widget intentionally exposes only accent customization. Layout, fonts, themes, animations, and other styling remain controlled internally.

---

## SEO

The application uses the Next.js App Router Metadata API to provide:

- Page titles
- Descriptions
- Keywords
- Open Graph metadata
- Twitter metadata
- Canonical URLs
- Robots directives

It also automatically generates:

- `/robots.txt`
- `/sitemap.xml`

using `app/robots.ts` and `app/sitemap.ts`.

---

## Accessibility

The application includes:

- Semantic headings and landmarks
- Associated form labels
- Keyboard-accessible navigation
- Visible focus indicators
- Accessible loading and error announcements
- Screen-reader text for ratings
- Responsive layouts across mobile, tablet, and desktop

---

## Verification

Before deployment, the project was verified using:

- `npm run lint`
- `npm run build`
- `git diff --check`
- Manual end-to-end workflow testing
- Widget verification using a standalone HTML integration page
- Responsive testing across desktop, tablet, and mobile layouts

---

## Future Improvements

- Pagination for larger testimonial collections
- Authentication and role-based moderation access
- AI-assisted moderation and spam detection
- Analytics and engagement reporting
- Widget customization beyond accent color (if required)

---

## License

This project was developed as part of the **Saleshandy SDE-1 Take-Home Assignment**.

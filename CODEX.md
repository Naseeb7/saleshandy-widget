# CODEX.md

# Saleshandy SDE-1 Take-Home Assignment

## Objective

Build a production-quality testimonial platform using the technology stack defined below.

The highest priority is completing the following end-to-end workflow before implementing any optional features.

1. Public testimonial submission page
   - Name
   - Email
   - Company
   - Testimonial
   - Star Rating

2. Persist testimonials in MongoDB.

3. Moderation dashboard displaying pending testimonials.

4. Approve or reject testimonials.

5. Public testimonials wall displaying **only approved testimonials**.

This workflow must always remain functional.

Only after completing and verifying this workflow should optional features (such as the embeddable widget) be implemented.

---

This project is time-boxed. Optimize for delivering a polished, working product rather than implementing every possible feature.

---

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- MongoDB Atlas
- Mongoose
- Next.js Route Handlers

Do not introduce:

- Express
- Prisma
- Redux
- Unnecessary third-party libraries

---

## Architecture

Build everything inside a single Next.js application.

Organize the project using:

- app
- components
- lib
- models
- services (only if required)
- types
- hooks (only if required)

Keep business logic outside UI components whenever practical.

---

## Database

The testimonial model should contain:

- name
- email
- company
- testimonial
- rating
- status
  - pending
  - approved
  - rejected
- expiresAt
- createdAt
- updatedAt

Rejected testimonials should automatically expire using MongoDB TTL.

When a testimonial is rejected:

- Set `status` to `rejected`
- Set `expiresAt` to the configured expiry date

Approved and pending testimonials must never expire.

---

## UI Principles

The application should resemble a modern SaaS product.

Prioritize:

- Clean layout
- Consistent spacing
- Good typography
- Responsive design
- Accessibility
- Loading states
- Empty states
- Error states

Avoid unnecessary animations and visual effects.

---

# Frontend Engineering Standards

These standards apply to every frontend implementation unless explicitly overridden.

## Design System

- Use only the established semantic design tokens.
- Never hardcode colors in Tailwind class names.
- Avoid arbitrary values unless absolutely necessary.
- If a new design token is required, define it centrally and reuse it throughout the project.

## UI Components

- Reuse shared UI primitives whenever appropriate.
- Use the shared `cn()` utility for all class name composition.
- Do not use string interpolation for composing class names.
- Components should consume semantic utility classes instead of raw design values.

## Layout

- Keep the DOM shallow.
- Avoid unnecessary wrapper elements.
- Choose the simplest layout primitive:
  - Flexbox for one-dimensional layouts.
  - CSS Grid for two-dimensional layouts.
  - Normal document flow where no layout system is needed.
- Parent layouts should control spacing using `gap`.
- Avoid child margins for layout spacing whenever possible.

## Component Architecture

- Components should have a single responsibility.
- Prefer composition over duplication.
- Keep reusable components generic.
- Keep page components focused on composition.
- Move reusable logic into hooks or utilities where appropriate.
- Keep business logic outside JSX whenever practical.

## Accessibility

- Use semantic HTML.
- Associate labels correctly.
- Support keyboard navigation.
- Provide visible focus states.
- Add ARIA attributes only where appropriate.

## Code Quality

- Maintain strict TypeScript.
- Avoid unnecessary state.
- Avoid unnecessary effects.
- Prefer readability over clever abstractions.
- Keep implementations simple and maintainable.

---

## Development Rules

- Complete one milestone before starting another.
- Deliver working software at every milestone.
- Keep components reusable.
- Prefer simple solutions over clever ones.
- Avoid duplicated logic.
- Use strict TypeScript.
- Do not leave unfinished features or TODOs unless requested.

---

## Collaboration Rules

You are the implementation engineer.

I am the project manager, reviewer and final decision maker.

Do not make product or architectural decisions independently.

If multiple implementation approaches exist:

1. Briefly explain the options.
2. Recommend one.
3. Wait for approval before making architectural changes.

Do not assume requirements that were not explicitly requested.

All generated code should be production-quality and understandable.

---

## Response Format

For every implementation request:

1. Brief implementation plan.
2. Files that will be created or modified.
3. Implementation.
4. Assumptions made.
5. Manual verification steps.

Keep responses concise, implementation-focused and avoid unnecessary explanations.

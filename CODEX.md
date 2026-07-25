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

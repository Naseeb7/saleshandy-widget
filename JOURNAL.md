# JOURNAL.md — Decision Journal

## 1. Prioritization

- Started by creating a `CODEX.md` file containing the project goals, architecture, engineering standards, and AI instructions. This gave me a consistent baseline before implementation.
- Set up the project structure, database model, service layer, and API routes before building the frontend. I wanted stable backend contracts before working on the UI.
- Implemented the testimonial submission flow first because every other feature depends on having testimonials in the database.
- Built the moderation dashboard next so the complete submission → moderation workflow was functional.
- Implemented the public testimonials wall after moderation was working, reusing the existing public API instead of creating another endpoint.
- Added the optional embeddable widget last because it could reuse the same public endpoint and existing UI components.
- Left deployment, documentation, Postman collection, SEO, accessibility review, and repository cleanup until the end to avoid repeatedly updating them while features were still changing.

Skipped / deliberately didn't build:

- Moderator authentication because it wasn't part of the assignment.
- Pagination and filtering because the expected dataset is small.
- Automated tests due to the assignment timeline. I relied on thorough manual verification instead.

---

## 2. Key Decisions

### Decision 1

**Decision:** Use a service layer with thin route handlers.

**Options:** Put MongoDB queries directly inside API route handlers.

**Why:** Keeping business logic inside services makes the routes responsible only for HTTP concerns, keeps logic reusable, and makes future changes easier.

---

### Decision 2

**Decision:** Reuse the existing public API for both the testimonials wall and embeddable widget.

**Options:** Create a dedicated widget endpoint.

**Why:** The widget needs the same approved testimonials as the public wall. Reusing the existing endpoint reduced backend complexity and avoided duplicate business logic.

---

### Decision 3

**Decision:** Store rejected testimonials using MongoDB TTL instead of deleting them immediately.

**Options:** Delete rejected testimonials immediately or keep them forever.

**Why:** TTL keeps the moderation flow simple while allowing rejected entries to expire automatically without additional cleanup logic.

---

### Decision 4

**Decision:** Build a small reusable design system.

**Options:** Style every page independently.

**Why:** Shared UI primitives, semantic design tokens and a common `cn()` utility made the UI more consistent and reduced duplicated styling.

---

### Decision 5

**Decision:** Separate internal database models from public API responses.

**Options:** Return MongoDB documents directly.

**Why:** The public API should never expose moderator-only fields such as email addresses or internal moderation status unless required.

---

### Decision 6

**Decision:** Implement the widget as an iframe with a lightweight loader script.

**Options:** Inject HTML directly into the host page.

**Why:** The iframe isolates styles, prevents CSS conflicts with host websites, and keeps the integration simple.

---

## 3. Working with AI agents

### Tools and models used

- OpenAI Codex (primary implementation assistant)
- ChatGPT GPT-5.5 (architecture discussions, code review, documentation polishing, README, JOURNAL.md)
- Cursor (editing and running the project)

### How I split the work

AI helped generate scaffolding, repetitive implementation, documentation drafts, and suggested refactorings.

I remained responsible for:

- Overall architecture
- Feature ordering
- Reviewing generated code
- Refactoring AI output
- Manual testing
- Debugging
- Final implementation decisions

I did not blindly accept generated code. Every significant implementation was reviewed before becoming part of the project.

### My agent setup

I created a `CODEX.md` file before implementation.

It contains:

- Project goals
- Architecture overview
- Folder structure
- Engineering standards
- UI conventions
- Accessibility expectations
- Coding rules
- AI instructions

This allowed me to keep implementation prompts focused on individual milestones instead of repeating project rules every time.

### My most useful prompts

**Prompt 1**

> Scaffold the project architecture for a Next.js App Router application using a service layer, shared validation, MongoDB and reusable UI components. Do not implement features yet.

This established the project structure before feature work began.

---

**Prompt 2**

> Implement the testimonial submission feature using the existing architecture. Keep route handlers thin and business logic inside services.

This worked well because the architectural decisions had already been made.

---

**Prompt 3**

> Review the backend implementation like a senior engineer. Identify duplicated logic, unsafe typing, unnecessary abstractions and maintainability improvements without changing API behaviour.

This produced several useful refactoring suggestions before frontend development started.

---

**Prompt 4**

> Build the embeddable widget by reusing the existing public API. Avoid introducing new backend endpoints unless absolutely necessary.

This helped keep the widget implementation lightweight.

---

### At least one time AI was wrong

During backend review, AI generated code that explicitly assigned `expiresAt` while the MongoDB schema already handled it using defaults. I removed the duplicated assignment.

Another example was an unsafe type assertion after `.lean()`. I replaced it with type-safe generic types instead.

AI also initially suggested a more generic serializer abstraction. After reviewing it, I simplified the implementation into two small serializers because they were easier to understand.

### Something I rejected

I rejected a more generic serialization layer because it increased complexity without improving the application.

I also rejected introducing additional backend endpoints for the widget since the existing public API already satisfied the requirements.

Note: This journal documents my actual development process. It was polished for clarity with ChatGPT after the implementation was complete.

---

## 4. Verification

Backend

- Manually tested every API endpoint.
- Created a dedicated Postman collection for API testing.
- Verified successful testimonial creation.
- Verified validation failures.
- Verified moderation endpoints.
- Verified invalid testimonial IDs.
- Verified invalid moderation status values.

Frontend

- Tested complete testimonial submission flow.
- Verified client-side and server-side validation.
- Verified loading, success and error states.
- Confirmed duplicate submissions are prevented while requests are in progress.
- Verified form reset after successful submission.

Moderation

- Verified approving testimonials removes them from the moderation dashboard.
- Verified rejecting testimonials removes them from the moderation dashboard.
- Verified loading, empty and retry states.

Public Testimonials Wall

- Confirmed only approved testimonials are displayed.
- Verified loading, empty and error states.
- Confirmed pending and rejected testimonials never appear.

Embeddable Widget

- Tested `/widget` directly.
- Created a standalone HTML page to simulate third-party integration.
- Verified both supported embedding methods.
- Verified multiple widget instances on the same page.
- Verified responsive behaviour.

Project Verification

- Ran `npm run lint`.
- Ran `npm run build`.
- Checked the deployed application manually.
- Verified the Postman collection against both successful and failure scenarios.

Known limitations

- Moderation endpoints are not authenticated because authentication was outside the assignment scope.
- Automated tests (unit/integration/E2E) were not implemented due to time constraints.

---

## 5. If I had 5 more hours

In order, I would:

1. Add moderator authentication and route protection.
2. Add automated unit, integration and Playwright end-to-end tests.
3. Add pagination and filtering for larger testimonial datasets.
4. Improve widget customization (themes, layout options, configurable limits).
5. Add analytics for widget usage and testimonial moderation.

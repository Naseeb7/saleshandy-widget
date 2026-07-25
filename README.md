# Saleshandy Testimonials

A production-ready testimonial workflow built with Next.js, TypeScript, MongoDB, and Mongoose.

The application supports public testimonial submission, moderation, an approved testimonials wall, and an embeddable widget.

## Getting started

Install dependencies and create a local environment file:

```bash
npm install
copy .env.example .env
```

Set the following values in `.env`:

- `MONGODB_URI` — MongoDB Atlas connection string.
- `REJECT_TTL_DAYS` — number of days rejected testimonials remain stored.
- `NEXT_PUBLIC_SITE_URL` — public application URL used for canonical metadata and sitemap links.

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Application routes

- `/` — approved testimonials wall.
- `/submit` — public testimonial submission form.
- `/dashboard` — pending testimonial moderation dashboard.
- `/widget` — compact widget page used by the embed loader.

## Embeddable widget

Add this snippet to another website, replacing the script URL with the deployed application URL:

```html
<div id="testimonial-widget"></div>
<script src="https://your-saleshandy-domain.example/widget.js"></script>
```

The loader also supports any element with the `data-testimonial-widget` attribute:

```html
<div data-testimonial-widget></div>
```

## Validation

```bash
npm run lint
npm run build
```

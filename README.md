# Real-time comments with Serverless Postgres

<p>
  <a href="#introduction"><strong>Introduction</strong></a> ·
  <a href="#demo"><strong>Demo</strong></a> ·
  <a href="#setup"><strong>Setup</strong></a> ·
  <a href="#one-click-deploy"><strong>One-click Deploy</strong></a> ·
  <a href="#tech-stack--features"><strong>Tech Stack + Features</strong></a> ·
  <a href="#author"><strong>Author</strong></a>
</p>

## Introduction

A reusable template to showcase real-time comments with serverless Postgres (by [Neon](https://neon.tech)) and [Ably LiveSync](https://ably.com/docs/livesync/postgres/quickstart). At the core, it uses Postgres' `pg_notify` but there is a lot of heavy lifting that Ably LiveSync does for you to make the real-time operations seamless.

## Demo

https://ably-livesync-neon.vercel.app

## Setup

#### Ably

- TODO

#### Serverless Postgres (Neon)

1. Sign up or log in to your account on Neon.
2. Create a new database (or select an existing one).
3. Navigate to the database settings to find your connection string, which will be your `DATABASE_URL`.

#### Seed the database

```bash
npm run db
```

## One-click Deploy

You can deploy this template to Vercel/Netlify/Render with the buttons below:

<div>
    <a href="https://vercel.com/new/clone?repository-url=https://github.com/neondatabase-labs/ably-livesync-neon&env=DATABASE_URL,SESSION_SECRET,NEXT_PUBLIC_ABLY_API_KEY" target="_blank">
        <img src="https://vercel.com/button" width="103" height="32" />
    </a>
    <a href="https://app.netlify.com/start/deploy?repository=https://github.com/neondatabase-labs/ably-livesync-neon#DATABASE_URL&SESSION_SECRET&NEXT_PUBLIC_ABLY_API_KEY" target="_blank">
        <img src="https://www.netlify.com/img/deploy/button.svg" width="179" height="32" style="height: 30px; width: auto;" />
    </a>
    <a href="https://render.com/deploy?repo=https://github.com/neondatabase-labs/ably-livesync-neon" target="_blank">
        <img src="https://render.com/images/deploy-to-render-button.svg" width="153" height="40" style="height: 30px; width: auto;" />
    </a>
</div>

## Tech Stack + Features

### Frameworks

- [Next.js](https://nextjs.org/) – React framework for building performant apps with the best developer experience.

### Platforms

#### (Postgres) Database

- [Neon](https://neon.tech) – A serverless database platform that provides instant scalability and high performance for your applications, allowing you to focus on building without worrying about infrastructure.

#### Deployment

- [Vercel](https://vercel.com/) – Easily preview & deploy changes with git.
- [Netlify](https://netlify.com/) – A platform that simplifies the deployment process and provides continuous integration for your projects.
- [Render](https://render.com/) – A cloud platform that offers instant deployment and automatic scaling for web applications.

### UI

- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework for rapid UI development.

### Code Quality

- [TypeScript](https://www.typescriptlang.org/) – Static type checker for end-to-end typesafety.
- [Prettier](https://prettier.io/) – Opinionated code formatter for consistent code style.

## Author

- Rishi Raj Jain ([@rishi_raj_jain_](https://twitter.com/rishi_raj_jain_))

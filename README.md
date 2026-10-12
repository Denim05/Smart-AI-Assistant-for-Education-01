# GENzAI — AI Career Coach

GENzAI is a full-stack AI career-coaching project built to explore personalized career guidance through a modern web application.

🎬 **Project demo:** [Watch on YouTube](https://youtu.be/UbXpRv5ApKA)

![GENzAI application preview](https://github.com/user-attachments/assets/eee79242-4056-4d19-b655-2873788979e1)

## ✨ Project overview

The project combines a web application, user authentication, persistent data, and Gemini API integration to explore AI-assisted career guidance.

### Core areas

- AI-powered career guidance using the Gemini API
- Authentication and onboarding with Clerk
- Persistent application data using PostgreSQL and Prisma
- A modern web interface built with Next.js and TypeScript

## 🧰 Tech stack

| Area | Technologies |
| --- | --- |
| Web framework | Next.js, React, TypeScript |
| Styling | Tailwind CSS |
| Authentication | Clerk |
| Database | PostgreSQL |
| ORM | Prisma |
| AI integration | Gemini API |

## ⚙️ Environment setup

Create a local `.env` file in the application root and configure the variables below:

```bash
DATABASE_URL=

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

GEMINI_API_KEY=
```

Add valid credentials from your own PostgreSQL, Clerk, and Gemini configurations. Keep the file local and never commit real secrets.

## ▶️ Run locally

1. Clone the repository.
2. Install dependencies using the package manager and lockfile provided by the project.
3. Configure the required environment variables.
4. Set up the database using the project's Prisma schema and migration workflow.
5. Start the development server using the script defined in `package.json`.

Check the repository's `package.json` and Prisma configuration for the exact commands supported by the current version.

## 🧠 What this project demonstrates

- Integrating a generative AI API into a full-stack application
- Building authenticated user flows
- Connecting an ORM to a relational database
- Organizing a modern React/Next.js codebase

## 🛠️ Potential next steps

- Document example user flows and screenshots
- Add automated tests for key flows
- Improve error handling for AI/API failures
- Document database setup and deployment

---

Built as a project exploring full-stack development and AI-assisted career guidance.

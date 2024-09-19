# Clean Architecture with Next.js

This repo is an example of how to achieve Clean Architecture in Next.js.

The original repo is by [Lazar Nikolov](https://github.com/nikolovlazar), Developer Advocate at Sentry.
This is his repo using drizzle and SQLite [nextjs-clean-architecture](https://github.com/nikolovlazar/nextjs-clean-architecture).

What different from the original repo is I used MongoDB instead of SQLite and use prisma ORM instead of drizzle.

## Features

- Clean Architecture in Next.js
- Using Lucia auth for Authentication
- Making the authentication flow without dependent on framework.
- Using MongoDB for database with Prisma ORM
- Monitors and reports errors in real-time using Sentry and code coverage reports with CodeCov

## Requirements

- Node.js (v14 or later)
- MongoDB (https://www.mongodb.com/)
- Sentry (https://sentry.io/)
- Code Cov (https://about.codecov.io/)

## Introduction

### 1. What is Clean Architecture

Clean Architecture 101
A software design philosophy that emphasizes separating concerns into different layers, popularized by Robert C. Martin (Uncle Bob). The main objectives are to create systems that are:

- <b>Independent of frameworks:</b> The architecture is designed so that switching frameworks or upgrading them is straightforward.
- <b>Testable:</b> Each component is isolated, making it easier to write unit tests.
- <b>Independent of the UI:</b> The core business logic can be reused across different interfaces.
- <b>Independent of Database:</b> Swapping database will be straightforward since business rules are not bound to the database.
- <b>Independent of external services:</b> External dependencies like databases and APIs are decoupled from the core logic.

### 2. What are the layers?

- <b>Frameworks and Drivers Layer:</b> This layer includes all external consumers of the system, such as API handlers, server components, AWS Lambdas, or Stripe webhooks, which interact with the core application logic.
- <b>Interface Adapters:</b> This layer, comprising controllers and presenters, adapts data between the core logic and external interfaces.
- <b>Application Layer (Use Cases):</b> This layer contains application-specific business rules and infrastructure interfaces, ensuring the core logic remains independent of specific technologies.
- <b>Entities Layer:</b> This is where core business models and custom errors are defined, encapsulating the application’s fundamental data and logic.
- <b>Infrastructure Layer:</b> It isolates repositories and services, which depend on specific frameworks and tools like databases (e.g., PostgreSQL or Redis). The core application logic interacts with these through dependency injection (DI), ensuring that the application layer remains independent of the infrastructure.

---

## Getting Started

### 1. Clone the Repository

```
git clone https://github.com/heinhtoo/nextjs-clean-architecture-template.git
cd nextjs-clean-architecture-template
```

### 2. Install Dependencies

Before running the app, make sure to install the necessary packages:

```
npm install
```

### 3. Set Up Environment Variables

Create a .env.local file at the root of the project to configure your Ollama public api url

```
SENTRY_DSN=
NEXT_PUBLIC_SENTRY_DSN=
SENTRY_AUTH_TOKEN=
CODECOV_TOKEN=
DATABASE_URL=
```

### 4. Test the Application

Now you can start the development server:

```
npm run dev
```

### 5. Deploy the App (Optional)

Once development is complete, you can deploy your Next.js app to Vercel or any other preferred hosting service.

---

### Additional Resources

- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) by Uncle Bob
- [Implement Clean Architecture in Next.js](https://www.youtube.com/watch?v=jJVAla0dWJo) by Lazar Nikolov
- [Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/) (a.k.a. Ports and Adapters) by Alistair Cockburn
- [Onion Architecture](https://jeffreypalermo.com/2008/07/the-onion-architecture-part-1/) by Jeffrey Palermo
- [Screaming Architecture](https://blog.cleancoder.com/uncle-bob/2011/09/30/Screaming-Architecture.html) by Uncle Bob
- [Clean Architecture with Next.js: Insights from Lazar Nikolov, Developer Advocate at Sentry](https://medium.com/@heinhtoo/clean-architecture-with-next-js-insights-from-lazar-nikolov-developer-advocate-at-sentry-abe1cb4c7ef3)

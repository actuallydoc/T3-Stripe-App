# Example App: trpc, Next.js, React, NextAuth, Tailwind CSS, and Stripe Integration

This is an example application that demonstrates the integration of various technologies such as trpc, Next.js, React, NextAuth, Tailwind CSS, and Stripe. It showcases how to build a web application with server-side rendering, authentication, and payment processing using these technologies.

![Showcase](https://i.imgur.com/H9AcM7M.png)
## Features

- Server-side rendering with Next.js for improved performance and SEO.
- Authentication using NextAuth, which provides a flexible authentication system supporting multiple providers (such as email/password, social logins, etc.).
- API communication with trpc, a TypeScript-first framework for building scalable API services.
- Seamless integration of Tailwind CSS for styling and component design.
- Payment processing integration using Stripe.

## Prerequisites

Before running the application, ensure you have the following installed on your system:

- Node.js (version 14 or later)
- npm (Node Package Manager)
## Getting Started
1. Clone the repository:

   ```bash
   git clone https://github.com/actuallydoc/T3-Stripe-App.git
   cd T3-Stripe-App
    ```
2. Install dependencies and run the application:

   ```bash
   npm install
   npx prisma db push
   npx prisma generate
   npm run dev
   ```
3. Start Stripe CLI to listen for events(optional) you need to install stripe cli first [here](https://stripe.com/docs/stripe-cli#install):

   ```bash
   npm run stripe::listen
   ```

4. Configure the environment variables:

   ```bash
   cp .env.example .env
   ```

   Then, edit the `.env` file and add the required environment variables.
   The `.env.example` contain's the required variables for the app to work.

# Usage

Once the application is up and running, you can explore its features:

- Authentication: Navigate to the login page and sign in using your preferred authentication method (email/password, social login, etc.), depending on the configuration you set up for NextAuth.
- Payment Processing: The application includes a simple payment flow using Stripe. You can test the payment process by going to the payment page and entering the required payment information. You can use Stripe's test card numbers (e.g., 4242 4242 4242 4242) to simulate successful payments.

# Folder Structure
The key folders and files within this example application are structured as follows:

- `/pages`: Contains the Next.js pages and API routes.
- `/components`: Contains reusable React components.
- `/styles`: Contains Tailwind CSS configuration and utility classes.
- `/lib`: Contains utility functions, API client setup, and NextAuth configuration.
- `/api`: Contains trpc server and API handlers.



Please note that you might need to adjust the content based on your specific use case or add any additional information as necessary.

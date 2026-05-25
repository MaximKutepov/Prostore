# ProStore - Project Overview

## What ProStore Does

ProStore is a full-featured e-commerce platform that allows users to browse and purchase products, manage their shopping cart, complete orders with secure payment processing, and track their purchases. The platform also includes an admin dashboard where administrators can manage products, view orders, monitor users, and analyze sales through interactive dashboards. Users can create accounts, save their shipping addresses and payment preferences, leave product reviews, and view their order history and current order status.

## Technologies & Their Purposes

**Frontend Framework**: We use **Next.js 16** (React 19) with TypeScript for building a fast, scalable user interface with built-in server-side rendering and API routes. Next.js handles both the frontend pages and backend API endpoints, allowing us to build full-stack features within a single project. We leverage the **App Router** for managing page routes and building nested layouts for different user roles (customers, admins, authenticated users).

**UI Components & Styling**: **shadcn/ui** provides pre-built, accessible React components (buttons, forms, dialogs, tables, etc.) that we customize with **Tailwind CSS v3** for rapid UI development. This combination lets us build consistent, modern interfaces without writing CSS from scratch. Tailwind utility classes handle all styling, spacing, colors, and responsive design.

**Database & ORM**: We use **PostgreSQL** (hosted on Neon, a serverless platform) as our relational database to store products, users, orders, cart items, reviews, and customer information. **Prisma** is our Object-Relational Mapping (ORM) tool that provides type-safe database queries and automatic migrations, simplifying database operations and reducing SQL query writing.

**Authentication**: **NextAuth.js v5** handles user registration, login, session management, and role-based access control. It protects routes (like checkout and admin pages) so only authenticated users can access them, and manages session cookies for maintaining user login state across page refreshes.

**Payment Processing**: We integrate **Stripe** and **PayPal** for secure payment handling. These services process credit card and PayPal transactions respectively, and send webhook notifications back to our API when payments succeed or fail, allowing us to update order status in real-time.

**Form Handling & Validation**: **React Hook Form** manages form state and user input (for checkout, product reviews, shipping addresses), while **Zod** validates data on the client-side before submission and on the server-side for security, ensuring only valid data is saved to the database.

**Email Services**: **React Email** allows us to write email templates as React components, and **Resend** sends transactional emails (order confirmations, purchase receipts) to customers, keeping them informed about their orders.

**File Uploads**: **UploadThing** handles product image uploads and storage, providing a simple integration for letting users and admins upload files securely.

**Admin Analytics**: **Recharts** visualizes sales data, order trends, and other metrics on the admin dashboard through interactive charts and graphs.

**Testing**: **Jest** provides the testing framework for writing unit and integration tests to ensure code reliability.

**Development Tools**: **TypeScript** provides static type checking to catch errors early, **ESLint** enforces code quality standards, and **PostCSS** processes our CSS for browser compatibility.

## Architecture Overview

The app is divided into three main sections: **(root)** for customer-facing pages (home, products, cart, checkout), **(auth)** for login and signup pages, **admin** for the management dashboard, and **user** for user account pages. Server-side actions in `lib/actions/` handle database operations, payments, and business logic. The **Prisma schema** defines all data models and relationships, and **NextAuth** configuration manages who can access which routes based on authentication and user role.

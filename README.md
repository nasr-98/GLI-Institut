# GLI-Institut | German Language Institute

A multilingual website for a German language institute, built with **React, Material UI, Node.js, and Express**. The platform provides information about German courses, student registration, contact services, and an administrative dashboard for managing registrations.

---

## Table of Contents

* [Overview](#overview)
* [Features](#features)
* [Technologies](#technologies)
* [Project Structure](#project-structure)
* [Getting Started](#getting-started)
* [Environment Variables](#environment-variables)
* [Running the Application](#running-the-application)
* [Main Pages](#main-pages)
* [Backend API](#backend-api)
* [Database](#database)
* [Deployment](#deployment)
* [Security](#security)
* [Future Improvements](#future-improvements)

---

## Overview

**GLI-Institut** is a web application designed for a German language institute. It helps prospective students explore available German courses, learn about the institute, submit registration forms, and contact the administration.

The project includes a separate frontend and backend:

* **Frontend:** A responsive React application with Material UI.
* **Backend:** A Node.js and Express server providing API endpoints, authentication, email notifications, and database operations.
* **Admin Dashboard:** A protected area for managing student registrations.

The website supports three languages: **German, English, and Arabic**, including right-to-left (RTL) layout support for Arabic.

---

## Features

### Public Website

* Responsive design for desktop, tablet, and mobile devices.
* Multilingual interface (German, English, and Arabic).
* Language switching throughout the website.
* RTL layout support for Arabic.
* Course catalog with different German proficiency levels.
* Course detail pages.
* Course pricing information.
* About the institute page.
* Contact page with a contact form.
* Student registration form.
* German language placement test.
* Legal pages, including:

  * Terms and Conditions (AGB)
  * Privacy Policy (Datenschutz)

### Student Registration

* Registration form with personal and course information.
* Input validation for required fields and contact details.
* Privacy policy acceptance.
* Backend submission and database storage.
* Email notifications using Resend.
* Success and error feedback.

### Admin Dashboard

* Protected dashboard routes.
* Login page with session-based authentication.
* Registration management.
* View registration details.
* Add new registrations.
* Edit existing registrations.
* Delete registrations.
* Search registrations.
* Registration status management, including:

  * Applicant (`Bewerber`)
  * Student (`Student`)
  * Archived (`Archive`)

### Backend

* REST API built with Express.
* SQLite database integration.
* Session-based authentication.
* CORS configuration.
* Email sending through Resend.
* Registration CRUD operations.
* Server-side validation and error handling.

---

## Technologies

### Frontend

| Technology        | Purpose                           |
| ----------------- | --------------------------------- |
| React             | User interface                    |
| Vite              | Development server and build tool |
| Material UI (MUI) | UI components and styling         |
| React Router      | Client-side routing               |
| Axios             | HTTP requests                     |
| Emotion           | Styling and RTL support           |
| JavaScript        | Application logic                 |

### Backend

| Technology      | Purpose                            |
| --------------- | ---------------------------------- |
| Node.js         | JavaScript runtime                 |
| Express.js      | Backend framework                  |
| SQLite          | Database                           |
| express-session | Session management                 |
| connect-sqlite3 | Persistent session storage         |
| Resend          | Email delivery                     |
| EJS             | Server-rendered templates          |
| CORS            | Cross-origin request configuration |
| dotenv          | Environment configuration          |
| UUID            | Unique identifiers                 |

---

## Project Structure

The project is organized into separate frontend and backend directories.

```text
GLI-Institut/
│
├── Frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── Home/
│   │   │   ├── Courses/
│   │   │   ├── Prices/
│   │   │   ├── Contact/
│   │   │   ├── Registration/
│   │   │   ├── GermanTest/
│   │   │   ├── About/
│   │   │   ├── Legal/
│   │   │   └── Dashboard/
│   │   ├── data/
│   │   ├── theme/
│   │   ├── api/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── Backend/
│   ├── routes/
│   ├── views/
│   ├── database.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── README.md
```

*Note: This is a representative structure. Directory and file names may differ depending on the current project version.*

---

## Getting Started

### Prerequisites

Install the following before running the project:

* [Node.js](https://nodejs.org/) (LTS recommended)
* npm
* Git

Clone the repository:

```bash
git clone https://github.com/nasr-98/GLI-Institut.git

cd GLI-Institut
```

Install frontend and backend dependencies separately.

### 1. Frontend Installation

```bash
cd Frontend
npm install
```

### 2. Backend Installation

Open another terminal:

```bash
cd Backend
npm install
```

---

## Environment Variables

Create a `.env` file inside the `Backend` directory.

Example:

```env
PORT=3000

FRONTEND_URL=http://localhost:5173

SESSION_SECRET=your_strong_random_secret

RESEND_API_KEY=your_resend_api_key

EMAIL_FROM=GLI Institut <contact@your-domain.com>

EMAIL_TO=your_institute_email@example.com

NODE_ENV=development
```

Adjust the variable names to match those actually referenced in the backend code.

**Important:**

* Never commit your `.env` file to GitHub.
* Never expose your Resend API key or session secret in the frontend.
* Use a strong, randomly generated session secret.
* Configure the production frontend URL and email domain before deployment.

Add the following to `.gitignore` if not already present:

```gitignore
node_modules/
dist/
.env
.env.*
!.env.example
*.sqlite
*.sqlite3
*.db
```

If your database is intended to be version-controlled for a specific reason, adjust the database exclusions accordingly. In production, database files should generally be stored outside the publicly accessible frontend directory.

---

## Running the Application

The frontend and backend run independently during development.

### Start the Backend

```bash
cd Backend
npm run dev
```

If the backend does not have a `dev` script, use its configured start command, for example:

```bash
node server.js
```

The backend is expected to run at:

```text
http://localhost:3000
```

### Start the Frontend

```bash
cd Frontend
npm run dev
```

Vite typically serves the application at:

```text
http://localhost:5173
```

Open the frontend URL in your browser.

Make sure the backend is running and its CORS configuration allows the frontend development origin.

---

## Main Pages

| Page           | Description                                           |
| -------------- | ----------------------------------------------------- |
| Home           | Introduction to the institute and its services        |
| Courses        | Overview of German courses and proficiency levels     |
| Course Details | Information about individual courses                  |
| Prices         | Course pricing and available options                  |
| About          | Institute information, mission, and teaching approach |
| Contact        | Contact information and inquiry form                  |
| Registration   | Student registration form                             |
| German Test    | German language assessment                            |
| AGB            | Terms and Conditions                                  |
| Datenschutz    | Privacy Policy                                        |
| Login          | Administrative authentication                         |
| Dashboard      | Registration management interface                     |

---

## Backend API

The backend exposes REST endpoints for registration management and other application services.

The examples below describe the intended API structure; verify the exact route names and request fields against the current backend implementation.

### Registrations

Base URL:

```text
http://localhost:3000
```

| Method | Endpoint                 | Description               |
| ------ | ------------------------ | ------------------------- |
| GET    | `/restfull`              | Retrieve registrations    |
| GET    | `/restfull/:id`          | Retrieve one registration |
| POST   | `/restfull`              | Create a registration     |
| PUT    | `/restfull/:id`          | Update a registration     |
| DELETE | `/restfull/:id`          | Delete a registration     |
| GET    | `/restfull/search?q=...` | Search registrations      |

### Authentication

The admin login endpoint should authenticate dashboard users and establish a session.

The frontend should check the authentication state before displaying protected dashboard pages. The backend must independently enforce authentication on protected API routes.

The exact login and logout endpoints depend on the current router configuration.

---

## Database

The backend uses **SQLite** to store registration information.

Registration records may include:

| Field                | Description                     |
| -------------------- | ------------------------------- |
| id                   | Unique registration identifier  |
| first_name           | Student's first name            |
| last_name            | Student's last name             |
| email                | Email address                   |
| phone                | Phone number                    |
| gender               | Gender selection                |
| course_level         | German proficiency level        |
| course_type          | Selected course type            |
| preferred_start_date | Preferred course start date     |
| addInfo              | Additional information          |
| privacy_policy       | Privacy acceptance              |
| status               | Registration status             |
| created_at           | Registration creation timestamp |

The database is used by the backend to persist registrations and support administrative operations.

For production deployment, configure a persistent storage location and implement regular database backups.

---

## Deployment

The application is designed to be deployed with a separate frontend build and a running backend server.

### Frontend

Build the React application:

```bash
cd Frontend
npm run build
```

Vite generates the production files in:

```text
Frontend/dist/
```

Deploy the contents of the `dist` directory to your static hosting directory.

Configure your hosting provider to serve `index.html` for frontend routes that are handled by React Router. Otherwise, refreshing a nested route may return a 404 error.

### Backend

Deploy the Express application to a Node.js-compatible hosting environment.

Before deployment:

1. Install production dependencies.
2. Configure environment variables.
3. Set the production frontend origin in CORS.
4. Configure HTTPS.
5. Set secure session cookie options.
6. Configure persistent storage for SQLite and session data.
7. Verify the email sender domain and Resend API key.
8. Test registration, authentication, and dashboard API endpoints.

### Hostinger

If deploying on Hostinger, confirm that your hosting plan supports the Node.js backend and the required runtime configuration.

The React frontend can be hosted as static files, while the Express backend needs a compatible Node.js hosting environment. A static hosting plan alone cannot run the Express server.

---

## Security

The application handles personal information and administrative access. Production deployment should include:

* HTTPS for all public traffic.
* Secure session cookies (`httpOnly`, `secure`, and an appropriate `sameSite` setting).
* A strong session secret.
* Server-side validation of all submitted data.
* Authentication and authorization checks for protected endpoints.
* Restricted CORS origins.
* Protection against unauthorized registration updates and deletions.
* Secure storage of API keys and database files.
* Appropriate session expiration and logout handling.
* Privacy-compliant collection and retention of student information.

Never rely solely on frontend route protection to secure administrative data. Authorization must also be enforced on the backend.

---

## Future Improvements

Potential areas for further development include:

* Password reset and account management.
* More detailed student management.
* Exporting registrations to CSV or Excel.
* Improved dashboard filtering and reporting.
* Course scheduling and attendance management.
* More comprehensive automated tests.
* Enhanced accessibility and performance.
* Additional language-learning resources.

---

## License

No license has been specified yet.


---

## Author

**Nasr Al-Qershi**

GitHub: [@nasr-98](https://github.com/nasr-98)

**Project:** GLI-Institut — German Language Institute

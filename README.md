# Emaily - Email Survey Platform

A full-stack web application for creating and sending email surveys with response tracking.

## 🚀 Quick Start

### Prerequisites
- Node.js (v24.11.1+)
- npm (v11.7.0+)
- MongoDB database
- Google OAuth credentials
- Mailgun account
- Stripe account

### Installation

1. **Install dependencies:**
   
   cd server
   npm install
   cd client
   npm install
   cd ..

2. **Set up environment variables:**

   Create `.env` in `server/` directory:
   
   - MONGO_URI=your_mongodb_connection_string
   - GOOGLE_CLIENT_ID=your_google_client_id
   - GOOGLE_CLIENT_SECRET=your_google_client_secret
   - COOKIE_KEY=your_random_cookie_key
   - STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   - STRIPE_SECRET_KEY=your_stripe_secret_key
   - MAILGUN_API_KEY=your_mailgun_api_key
   - MAILGUN_DOMAIN=your_mailgun_domain
   - REDIRECT_DOMAIN=http://localhost:5173
   - NODE_ENV=development
   
   Create `.env` in `server/client/` directory:
   
   - VITE_STRIPE_KEY=your_stripe_publishable_key
   
### Running the Application

**Development (runs both server and client):**  

npm run dev  

**Or run separately:**

Terminal 1 - Server:  
npm run server  
Terminal 2 - Client:  
npm run client  
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`

## 📋 Features

- Google OAuth authentication
- Create and send email surveys
- Track YES/NO responses
- Credit-based payment system (Stripe)
- Survey management (create, view, delete, sort)
- Custom sender email address

## 🛠️ Tech Stack

**Backend:** Node.js, Express, MongoDB, Passport.js, Mailgun, Stripe  
**Frontend:** React, Redux Toolkit, Tailwind CSS, daisyUI

## 📝 Usage

1. Sign in with Google
2. Purchase credits via Stripe
3. Create a survey with title, subject, body, and recipient emails
4. Send survey and track responses
5. View statistics in dashboard

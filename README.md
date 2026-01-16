# Saas Smart Expense Tracker

Smart Expense Tracker is a full-stack web application built with Next.js and Supabase. It allows authenticated users to track expenses, manage budgets, and analyze spending data through a responsive dashboard.

## Features

- User authentication with Supabase
- Protected routes (dashboard, expenses, analytics, settings)
- Add and delete expenses
- Budget management by category
- Expense analytics with charts
- Responsive design (desktop and mobile)
- Mobile sidebar with hamburger menu

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Supabase (Auth & Database)
- Recharts

## Getting Started

npm install

Create a .env.local file with:
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url  
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

Run the app:
npm run dev

Open http://localhost:3000

## Project Structure

app/
(protected)/ dashboard expenses analytics settings layout.tsx  
login  
register  
components/ Sidebar.tsx Header.tsx  
lib/ supabase.ts getUser.ts

\*\* How to Use the Application

Open the landing page

Click Get Started

Create an account (Sign Up)

Confirm your email address (Supabase email verification)

Log in with your credentials

You are redirected to the Dashboard

Start adding expenses, setting budgets, and viewing analytics

## Notes

This project focuses on clean architecture, real authentication flow, responsive UI, and practical data visualization.

## Author

Junior Kamtchoua

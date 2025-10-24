# Mini Campaign Manager

A **Mini Campaign Manager** is a responsive web application built with **Next.js (SSR), TypeScript, TailwindCSS, allowing users to manage campaigns efficiently. The app demonstrates a clean dashboard-style interface with campaign listing, creation, and tracking functionalities. Optional backend integration is implemented using **NestJS/Express.js**.

---

## Table of Contents

- Features  
- Tech Stack
- Screenshots
- Getting Started
- Project Structure
- Frontend (SSR)
  
---

## Features

### Dashboard
- Summary cards: Active Campaigns, Emails Sent, Replies, Meetings Booked  
- Responsive chart using **Recharts**  
- Sidebar navigation: Dashboard, Campaigns, Create campaign  

### Campaign List
- Table view showing campaign details: Name, Status, Sent, Replies, Created At  
- "Create New Campaign" button opens a modal or navigates to campaign creation page  
- View campaign details and increment `Sent` and `Replies` count  

### Create Campaign
- Form fields: Campaign Name, Type (Email / WhatsApp), Description  
- Field validation using **React Hook Form + Zod**  
- Save campaign data to **localStorage** or backend API  
- Success toast/modal confirmation  

### Backend Integration (Optional)
- `GET /campaigns` → Returns static/dummy campaigns  
- `POST /campaigns` → Accepts new campaign data and stores it in memory/JSON file  
- `PATCH /campaigns/:id` → Updates `Sent` and `Replies` count for a specific campaign  
- Frontend communicates with API using **Axios** or **Fetch**

---

## Tech Stack

- Next.js (SSR)  
- TypeScript  
- TailwindCSS  
- React Hook Form + Zod  
- Recharts (Charts)  
- MongoDB

---

## Screenshots

**Dashboard:**  
![Dashboard](screenshots/dashboard.png)  

**Campaign List:**  
![Campaign List](screenshots/campaign-list.png)  

**Create Campaign Form:**  
![Create Campaign](screenshots/create-campaign.png)  

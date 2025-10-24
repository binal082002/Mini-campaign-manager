# Mini Campaign Manager

A **Mini Campaign Manager** is a responsive web application built with **Next.js (SSR), TypeScript, TailwindCSS, and shadcn/ui**, allowing users to manage campaigns efficiently. The app demonstrates a clean dashboard-style interface with campaign listing, creation, and tracking functionalities. Optional backend integration is implemented using **NestJS/Express.js**.

---

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Screenshots](#screenshots)  
- [Getting Started](#getting-started)  
- [Project Structure](#project-structure)  
- [Frontend (SSR)](#frontend-ssr)  
- [Backend (Optional)](#backend-optional)  
- [Future Improvements](#future-improvements)  
- [Author](#author)  

---

## Features

### Dashboard
- Summary cards: Active Campaigns, Emails Sent, Replies, Meetings Booked  
- Responsive chart using **Recharts**  
- Sidebar navigation: Dashboard, Campaigns, Settings  

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
- Frontend communicates with API using **Axios** or **Fetch**  

---

## Tech Stack

**Frontend**  
- Next.js (SSR)  
- TypeScript  
- TailwindCSS  
- shadcn/ui  
- React Hook Form + Zod  
- Recharts (Charts)  

**Backend (Optional)**  
- NestJS or Express.js  
- Node.js  
- In-memory or JSON file storage  

---

## Screenshots

> Add your screenshots here  

**Dashboard:**  
![Dashboard](screenshots/dashboard.png)  

**Campaign List:**  
![Campaign List](screenshots/campaign-list.png)  

**Create Campaign Form:**  
![Create Campaign](screenshots/create-campaign.png)  

---

## Getting Started

### Prerequisites
- Node.js (>=18.x)  
- npm or yarn  

### Frontend Setup (Next.js SSR)
1. Clone the repository:
```bash
git clone https://github.com/<your-username>/mini-campaign-manager.git
cd mini-campaign-manager/frontend

2. Install dependencies:
```bash
npm install
# or
yarn install

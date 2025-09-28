# FoodApp - A Manifest-powered Recipe Sharing Platform

This is a complete full-stack application for sharing and discovering recipes, built entirely with React and Manifest.

## Overview

FoodApp allows users to browse a public collection of recipes. Authenticated users with the 'chef' role can contribute by adding their own recipes, complete with descriptions, preparation times, and photos. The backend is powered exclusively by Manifest, handling data storage, user authentication, file uploads, and access control policies automatically based on a simple YAML schema.

## Features

- **Manifest Backend**: Zero backend code. All logic is defined in `manifest.yml`.
- **User Authentication**: Secure user signup and login handled by the Manifest SDK.
- **Role-Based Access Control**: Different permissions for regular users, chefs, and admins.
- **Recipe Management**: Chefs can create, update, and delete their own recipes.
- **Image Uploads**: Recipe photos are handled seamlessly by Manifest's file storage.
- **Public Recipe Feed**: All published recipes are visible to everyone.
- **Responsive UI**: A clean, modern interface built with React and Tailwind CSS.
- **Health Check**: A visual indicator shows the status of the backend connection.

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn
- A running Manifest backend instance.

### Frontend Setup

1.  **Clone the repository** (or use the generated files).
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Configure Environment Variables**:
    Create a `.env` file in the root of the project and add your Manifest backend URL and App ID:
    ```
    VITE_BACKEND_URL=https://your-manifest-backend-url.com
    VITE_APP_ID=your-app-id
    ```
4.  **Run the application**:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

### How to Use

- **Explore**: Visit the homepage to see all public recipes.
- **Demo Login**: Click 'Login as Demo Chef' to log in with a pre-configured chef account (`chef@example.com` / `password`).
- **Create Recipes**: Once logged in as a chef, you can use the 'New Recipe' form to add your own creations.
- **Admin Panel**: Access the auto-generated admin panel at `/admin` on your backend URL to manage users, recipes, and reviews directly.

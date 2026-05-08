# VBS 2026 — The Atrium Church

A premium, highly interactive web application for **The Atrium Church's Vacation Bible School 2026**. This platform provides a cinematic landing experience and a seamless registration workflow for parents in Ilorin and Lagos.

![VBS 2026 Logo](/logo.png)

## 🚀 Key Features

-   **Cinematic Hero Experience**: Features a high-performance, GPU-accelerated "Arc Gallery" that showcases VBS memories with smooth spring animations.
-   **3D Interactive Walkthrough**: A scroll-linked 3D circular gallery that lets users explore event highlights in an immersive environment.
-   **Multi-Campus Support**: Fully localized content and logistics for both **Ilorin** and **Lagos** campuses, including campus-specific pricing and addresses.
-   **Modern Registration System**:
    -   Secure payment integration via **Paystack**.
    -   Dynamic multi-child registration forms with real-time validation (Zod + React Hook Form).
    -   Automated bookkeeping via Google Sheets webhooks.
-   **Premium Aesthetics**: A custom design system built with Tailwind CSS, featuring glassmorphism, cinematic entry animations (Framer Motion), and a playful yet professional "VBS Confetti" theme.
-   **Responsive Masonry Gallery**: A high-performance gallery featuring 80+ images from both campuses with intelligent filtering and lazy loading.

## 🛠 Tech Stack

-   **Frontend**: React 18 (Vite), TypeScript
-   **Styling**: Tailwind CSS
-   **Animations**: Framer Motion
-   **Form Management**: React Hook Form, Zod
-   **Icons**: Lucide React
-   **Payments**: Paystack API
-   **State/API**: Custom hooks with environment-driven configurations.

## 📦 Project Structure

```text
src/
├── features/
│   ├── landing/       # Hero, Vision, 3D Gallery, CTAs
│   ├── registration/  # Multi-step forms, Payment, Success views
│   └── gallery/       # Masonry grid, Category filters, Manifest
├── shared/
│   └── ui/            # Reusable premium components (ArcGallery, Buttons, etc.)
└── assets/            # Global styles and static assets
```

## ⚙️ Development

1.  **Clone the repo**:
    ```bash
    git clone git@github.com:asejik/vbs.git
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Setup Environment Variables**:
    Create a `.env` file with your Paystack and Webhook keys (refer to `.env.example`).
4.  **Run locally**:
    ```bash
    npm run dev
    ```

## 🔒 Security

-   **Environment Protection**: All API keys and secrets are managed via `.env` and are never committed to version control.
-   **Build Integrity**: Type-safe codebase with strict TypeScript enforcement.

---
© 2026 The Atrium Church. All rights reserved.

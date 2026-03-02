## FinnTrack

Track your finances with ease. FinnTrack is a personal finance tracker that lets you log income, organize expenses into categories, and visualize your spending with charts, powered by Next.js and Firebase.

## Features

- **Authentication**
  - Google sign-in with Firebase Auth.
  - Per-user data isolation (each user sees only their own income and expenses).

- **Income tracking**
  - Add income entries with amount, description, and timestamp.
  - See an income history list with delete support.
  - Balance automatically recomputes when you add or remove income.

- **Expense tracking**
  - Create customizable expense categories (title + color).
  - Add expense items to categories; category totals update automatically.
  - View full expense history per category; delete individual items or whole categories.

- **Time-based views**
  - Dashboard supports three views:
    - **This month**
    - **Last month**
    - **All time** (original behavior)
  - Balance, category totals, and charts all respect the selected time filter.

- **Visual stats**
  - Doughnut chart of expense distribution across categories.
  - Empty states when there is no data for the selected period.

- **UX & responsiveness**
  - Responsive layout optimized for mobile and desktop.
  - Consistent Tailwind-based design system with shared `Button` and `Card` components.
  - Clear empty states for:
    - No income entries.
    - No expense categories.
    - No expenses in the selected period.

- **Accessibility**
  - Labeled form inputs with proper `id` / `htmlFor`.
  - Accessible modals (`role="dialog"`, `aria-modal`, Escape/backdrop to close, focus trap).
  - Visible focus outlines and reduced-motion support.

## Tech stack

- **Framework**: Next.js 14 (App Router)
- **Frontend**: React, Tailwind CSS, React Icons
- **Backend/data**: Firebase (Auth + Firestore)
- **Charts**: chart.js + react-chartjs-2
- **Testing**: Jest, React Testing Library

## Configuration

FinnTrack requires a Firebase project. Create a web app in Firebase and copy the client config values, then create a `.env.local` file in the project root based on `.env.example`:

```bash
cp .env.example .env.local
```

Update `.env.local` with your Firebase settings:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

> Note: Secrets are **not** committed. `.env` and `.env*.local` are ignored by git; use `.env.example` as the template for collaborators.

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. Sign in with Google to start tracking income and expenses.

## Testing

Run the Jest test suite (unit and component tests):

```bash
npm test
```

## Changelog

See [`CHANGELOG.md`](./CHANGELOG.md) for a summary of recent improvements (starting from v2.0.0).

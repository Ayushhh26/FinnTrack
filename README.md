## FinnTrack

Track your finances with ease. FinnTrack is a personal finance tracker that lets you log income, organize expenses into categories, and visualize your spending with charts, powered by Next.js and Firebase.

## Tech stack

- **Framework**: Next.js 14 (App Router)
- **Frontend**: React, Tailwind CSS, React Icons
- **Backend/data**: Firebase (Auth + Firestore)
- **Charts**: chart.js + react-chartjs-2

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

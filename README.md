# IRCTC Clone

The frontend is a React single-page app. Its route components and shared UI are
JavaScript files in `js/` and use JSX through esbuild's `.js` loader. The
Express/Mongoose API remains in `backend/`.

## Run locally

Install the frontend dependencies from the repository root:

```powershell
npm install
```

In one terminal, start the React frontend:

```powershell
npm run dev
```

Open `http://localhost:3000`. To rebuild the production bundle and Tailwind CSS,
run `npm run build`.

In a second terminal, install and start the existing backend:

```powershell
npm --prefix backend install
if (-not (Test-Path backend\.env)) { Copy-Item backend\.env.example backend\.env }
npm --prefix backend start
```

Set `MONGODB_URI` in `backend\.env` to the MongoDB connection string for your
database. The frontend uses the existing API at `http://localhost:5000/api`.
The backend requires MongoDB to be available.

The development server serves `index.html` as the fallback for React Router
paths such as `/pages/home.html`. Production hosting should use the same
single-page-app fallback behavior.

To update Tailwind CSS while developing, run `npm run watch` in another
terminal.

# PathGenie

PathGenie is a MERN-based delivery management and route planning application for managing deliveries, drivers, vehicles, routes, reports, and live updates.

## Stack

- **Frontend:** React, Vite, React Router, Axios, Leaflet, Chart.js, Socket.IO Client
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Socket.IO

## Project Structure

```text
PathGenie/
├── client/                 # React frontend
│   ├── public/             # Static files
│   └── src/                # Components, pages, services, routes, and assets
└── server/                 # Express backend
    ├── config/             # Database configuration
    ├── controllers/        # Request handlers
    ├── middleware/         # Authentication and roles
    ├── models/             # Mongoose models
    ├── routes/             # API routes
    ├── services/           # Business and external services
    ├── sockets/            # Socket.IO events
    ├── app.js              # Express configuration
    └── server.js           # Server startup
```

## Setup

Install dependencies:

```bash
cd client && npm install
cd ../server && npm install
```

Create `server/.env`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/pathgenie
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
```

Optional client configuration in `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

## Run Locally

Run the backend and frontend in separate terminals:

```bash
cd server
npm run dev
```

```bash
cd client
npm run dev
```

Open `http://localhost:5173` in your browser.

## Commands

| Location | Command | Purpose |
|---|---|---|
| `client` | `npm run dev` | Start frontend |
| `client` | `npm run build` | Create production build |
| `client` | `npm run lint` | Run ESLint |
| `server` | `npm run dev` | Start backend with Nodemon |
| `server` | `npm start` | Start backend normally |

## API Groups

`/api/auth`, `/api/users`, `/api/deliveries`, `/api/vehicles`, `/api/routes`, `/api/location`, `/api/dashboard`, `/api/reports`, `/api/notifications`, `/api/settings`, and `/api/driver`.

Do not commit `.env` files, secrets, or uploaded files. The root `.gitignore` excludes them.

## License

ISC

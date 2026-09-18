# PathGenie

PathGenie is a full-stack MERN delivery management and route optimization platform. It provides a web interface for managing deliveries, drivers, vehicles, routes, notifications, reports, and operational dashboards.

The repository contains two independent applications:

- `client/` — React and Vite frontend
- `server/` — Express, MongoDB, and Socket.IO backend API

## Features

- User registration, login, and authenticated access
- Delivery and vehicle management
- Driver management, attendance, earnings, and notifications
- Route planning and location services
- Dashboard metrics and reports
- Interactive maps using Leaflet and React Leaflet
- Charts and data visualizations
- PDF and spreadsheet report exports
- Real-time communication through Socket.IO
- Toast notifications and responsive user interface

## Technology Stack

### Frontend

- React 19
- Vite
- React Router
- Axios
- Leaflet and React Leaflet
- Chart.js, React Chart.js, and Recharts
- Socket.IO Client
- React Hook Form
- React Icons
- React Hot Toast and React Toastify
- `xlsx`, `file-saver`, `jspdf`, and `jspdf-autotable`

### Backend

- Node.js with ES modules
- Express 5
- MongoDB with Mongoose
- Socket.IO
- JSON Web Tokens
- bcryptjs
- CORS, cookie-parser, dotenv, and Morgan
- ExcelJS and PDFKit for report generation
- Axios for external service requests

## Prerequisites

Install the following before starting the project:

- Node.js 18 or later
- npm
- MongoDB, either locally or through MongoDB Atlas

## Project Setup

Clone the repository and install dependencies separately for the frontend and backend:

```bash
cd PathGenie/client
npm install

cd ../server
npm install
```

The root folder does not currently define a combined start script. Run the client and server in separate terminals.

### Configure the server

Create `server/.env`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/pathgenie
JWT_SECRET=replace_with_a_long_random_secret
CLIENT_URL=http://localhost:5173
```

For MongoDB Atlas, replace `MONGO_URI` with the connection string supplied by Atlas. Do not commit `.env` files or expose `JWT_SECRET` publicly.

### Configure the client

The client defaults to `http://localhost:5000/api`. To use another backend URL, create `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Vite only exposes variables prefixed with `VITE_` to browser code.

## Running the Applications

Start the backend in one terminal:

```bash
cd server
npm run dev
```

The API runs on `http://localhost:5000` by default.

Start the frontend in a second terminal:

```bash
cd client
npm run dev
```

The frontend runs on `http://localhost:5173` by default.

### Production commands

Backend:

```bash
cd server
npm start
```

Frontend:

```bash
cd client
npm run build
npm run preview
```

## Available Scripts

### Client scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the production build |

### Server scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the API with Nodemon |
| `npm start` | Start the API with Node.js |

## API Route Groups

The backend mounts the following route groups under `/api`:

| Route prefix | Responsibility |
|---|---|
| `/api/auth` | Registration, login, and authentication |
| `/api/users` | User management |
| `/api/deliveries` | Delivery management |
| `/api/vehicles` | Vehicle management |
| `/api/routes` | Route planning and route data |
| `/api/location` | Location and geocoding-related operations |
| `/api/dashboard` | Dashboard summaries and metrics |
| `/api/reports` | Report data and exports |
| `/api/notifications` | General notifications |
| `/api/settings` | Application and user settings |
| `/api/driver` | Driver operations |
| `/api/driver/attendance` | Driver attendance |
| `/api/driver/earnings` | Driver earnings |
| `/api/driver/notifications` | Driver-specific notifications |

The root endpoint, `GET /`, returns a basic API health/welcome response.

## Project Structure

```text
PathGenie/
├── README.md                         # Documentation for the complete project
├── package.json                      # Root package metadata
├── package-lock.json                 # Root npm lockfile
│
├── client/                           # React frontend application
│   ├── public/                       # Public static files
│   ├── src/
│   │   ├── assets/                   # Icons, images, illustrations, logos, and SVGs
│   │   ├── components/               # Reusable UI and feature components
│   │   │   ├── common/               # Shared landing/common components
│   │   │   ├── dashboard/            # Dashboard-specific components
│   │   │   ├── delivery/             # Delivery-specific components
│   │   │   ├── driver/               # Driver-specific components
│   │   │   ├── landing/              # Landing page sections
│   │   │   ├── map/                  # Map-specific components
│   │   │   └── ui/                   # Generic Button, Input, Card, Logo, and title components
│   │   ├── config/                   # Frontend configuration, including map settings
│   │   ├── constants/                # Shared frontend constants
│   │   ├── context/                  # React Context providers, including Socket context
│   │   ├── hooks/                    # Custom React hooks
│   │   ├── layouts/                  # Auth, dashboard, and main layouts
│   │   ├── pages/                    # Route-level page components
│   │   │   ├── auth/                 # Login and registration pages
│   │   │   ├── dashboard/            # Dashboard pages
│   │   │   ├── deliveries/           # Delivery pages
│   │   │   ├── drivers/              # Driver pages
│   │   │   ├── profile/              # Profile pages
│   │   │   ├── reports/              # Reporting pages
│   │   │   └── routes/               # Route planner pages
│   │   ├── routes/                   # React Router configuration
│   │   ├── services/                 # API service modules
│   │   ├── styles/                   # Theme and shared styles
│   │   ├── utils/                    # Axios and other helper utilities
│   │   ├── App.jsx                   # Root React component
│   │   ├── index.css                 # Global CSS
│   │   └── main.jsx                  # Frontend entry point
│   ├── eslint.config.js              # Frontend ESLint configuration
│   ├── index.html                    # Vite HTML entry document
│   ├── package.json                  # Frontend dependencies and scripts
│   ├── vite.config.js                # Vite configuration
│   └── README.md                     # Frontend-specific documentation
│
└── server/                           # Express backend application
    ├── algorithms/                   # Route and optimization algorithms
    ├── config/                       # Server configuration and database connection
    │   └── db.js                     # MongoDB connection helper
    ├── controllers/                  # Request handlers and business logic
    ├── middleware/                   # Authentication and role middleware
    ├── models/                       # Mongoose models
    ├── routes/                       # Express API route definitions
    ├── services/                     # External and domain services
    │   ├── geocodingService.js       # Geocoding service integration
    │   └── osrmService.js            # OSRM route service integration
    ├── sockets/                      # Socket.IO initialization and events
    ├── uploads/                      # Upload storage directory
    ├── utils/                        # Backend helper utilities
    ├── validations/                  # Request validation modules
    ├── app.js                        # Express app and route registration
    ├── server.js                     # Database, HTTP, Socket.IO, and server startup
    └── package.json                  # Backend dependencies and scripts
```

Some feature directories are currently prepared for future modules and may be empty until their related functionality is added.

## Backend Architecture

1. `server.js` loads environment variables, connects to MongoDB, creates the HTTP server, and initializes Socket.IO.
2. `app.js` configures Express middleware and mounts the API route groups.
3. Route files map HTTP endpoints to controller functions.
4. Controllers process requests and coordinate models and services.
5. Models define MongoDB document structures with Mongoose.
6. Middleware handles authentication and role-based access.
7. Socket handlers provide real-time events to connected clients.

## Frontend Architecture

- `pages/` contains route-level screens.
- `layouts/` provides shared page shells.
- `components/` contains reusable and feature-specific UI.
- `services/` and `utils/` centralize API communication.
- `context/` manages shared React state and Socket.IO connections.
- `config/`, `constants/`, and `styles/` hold shared configuration and presentation values.

## Troubleshooting

### Client cannot reach the API

- Confirm the backend is running.
- Check `client/.env` and the `VITE_API_URL` value.
- Restart Vite after changing environment variables.
- Confirm `CLIENT_URL` on the server matches the frontend origin.

### Server cannot connect to MongoDB

- Confirm MongoDB is running or the Atlas cluster is available.
- Verify `MONGO_URI` in `server/.env`.
- Check that the database user has access to the requested database.

### Authentication or Socket.IO problems

- Verify `JWT_SECRET` is present in the server environment.
- Confirm the client and server URLs use the expected ports.
- Check browser and server logs for CORS or connection errors.

## Development Guidelines

- Keep frontend and backend responsibilities separate.
- Add API calls to service modules instead of scattering Axios requests through components.
- Protect private server routes with the existing authentication middleware.
- Keep secrets and local environment files out of version control.
- Run the client lint and production build before submitting frontend changes.
- Test API changes against the relevant route, controller, model, and client service.

## License

The project currently uses the license metadata specified in `server/package.json` (`ISC`). Update this section if the project adopts a different license for the complete repository.

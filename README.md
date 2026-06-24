# CK Mysuru Tournament Manager

A robust and responsive chess tournament management software for managing chess tournaments using Swiss rules, supporting player registration, tournament setup, live pairing, result capture, and standings generation with comprehensive tiebreak systems.

## Features

- **User Authentication & RBAC**: Secure login with role-based access (Arbiter, Player, Spectator)
- **Tournament Setup**: Configure tournaments with Swiss rules, time controls, and tiebreak systems
- **Player Management**: Manual entry, bulk import (CSV/Excel), and player status tracking
- **Swiss Pairing Algorithm**: FIDE-compliant pairing generation with no double encounters
- **Result Management**: Fast result entry, validation, and round locking
- **Standings & Tiebreaks**: Automatic calculation with Buchholz, Sonneborn-Berger, and more
- **Printing & Publishing**: Print-ready formats and optional public result sharing
- **Audit Logging**: Complete change history with user tracking
- **Multi-Tournament Support**: Manage multiple simultaneous tournaments
- **Responsive Design**: Mobile-first UI accessible on all devices
- **Security & Compliance**: GDPR-compliant with encrypted data and secure authentication
- **Backup & Recovery**: Daily automated backups with disaster recovery

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **TailwindCSS** for styling
- **React Router** for navigation
- **Zustand** for state management
- **React Query** for server state
- **Axios** for HTTP requests
- **Zod** for form validation
- **Recharts** for data visualization

### Backend
- **FastAPI** with Python 3.9+
- **Pydantic** for data validation
- **SQLAlchemy** or **Motor** for MongoDB async operations
- **FastAPI-JWT-Extended** for JWT authentication
- **Passlib** for password hashing
- **Celery** for async tasks (backups, notifications)

### Database
- **MongoDB** for document storage
- **Redis** for caching and session management (optional)

### DevOps
- **Docker** & **Docker Compose** for containerization
- **GitHub Actions** for CI/CD
- **pytest** for testing

## Project Structure

```
ckm-tournament-manager/
├── backend/                      # FastAPI application
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py              # FastAPI app initialization
│   │   ├── config.py            # Configuration management
│   │   ├── core/
│   │   │   ├── security.py      # JWT, password hashing
│   │   │   ├── constants.py     # App constants
│   │   │   └── exceptions.py    # Custom exceptions
│   │   ├── models/              # Pydantic models
│   │   │   ├── user.py
│   │   │   ├── tournament.py
│   │   │   ├── player.py
│   │   │   ├── round.py
│   │   │   ├── pairing.py
│   │   │   └── result.py
│   │   ├── schemas/             # Pydantic schemas (request/response)
│   │   │   ├── user.py
│   │   │   ├── tournament.py
│   │   │   ├── player.py
│   │   │   └── result.py
│   │   ├── db/
│   │   │   ├── database.py      # MongoDB connection
│   │   │   ├── base.py          # Base model
│   │   │   └── migrations/      # Database migrations
│   │   ├── api/
│   │   │   ├── v1/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── endpoints/
│   │   │   │   │   ├── auth.py
│   │   │   │   │   ├── tournaments.py
│   │   │   │   │   ├── players.py
│   │   │   │   │   ├── rounds.py
│   │   │   │   │   ├── pairings.py
│   │   │   │   │   ├── results.py
│   │   │   │   │   └── standings.py
│   │   │   │   └── dependencies.py
│   │   ├── services/            # Business logic
│   │   │   ├── auth_service.py
│   │   │   ├── tournament_service.py
│   │   │   ├── pairing_service.py
│   │   │   ├── standing_service.py
│   │   │   ├── export_service.py
│   │   │   └── audit_service.py
│   │   ├── utils/
│   │   │   ├── swiss_algorithm.py  # Swiss pairing logic
│   │   │   ├── validators.py
│   │   │   └── helpers.py
│   │   └── tasks/               # Celery tasks
│   │       ├── backup.py
│   │       └── notifications.py
│   ├── tests/                   # Test files
│   │   ├── conftest.py
│   │   ├── test_auth.py
│   │   ├── test_tournaments.py
│   │   ├── test_swiss_algorithm.py
│   │   └── ...
│   ├── requirements.txt         # Python dependencies
│   ├── .env.example             # Environment variables template
│   └── Dockerfile
│
├── frontend/                    # React application
│   ├── src/
│   │   ├── main.tsx            # Entry point
│   │   ├── App.tsx             # Root component
│   │   ├── pages/              # Page components
│   │   │   ├── LoginPage.tsx
│   │   │   ├── DashboardPage.tsx
│   │   │   ├── TournamentPage.tsx
│   │   │   ├── PlayersPage.tsx
│   │   │   ├── RoundsPage.tsx
│   │   │   ├── PairingsPage.tsx
│   │   │   ├── ResultsPage.tsx
│   │   │   ├── StandingsPage.tsx
│   │   │   └── AdminPage.tsx
│   │   ├── components/         # Reusable components
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.tsx
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   └── Layout.tsx
│   │   │   ├── forms/
│   │   │   │   ├── TournamentForm.tsx
│   │   │   │   ├── PlayerForm.tsx
│   │   │   │   ├── ResultForm.tsx
│   │   │   │   └── LoginForm.tsx
│   │   │   ├── tables/
│   │   │   │   ├── PlayersTable.tsx
│   │   │   │   ├── PairingsTable.tsx
│   │   │   │   ├── ResultsTable.tsx
│   │   │   │   └── StandingsTable.tsx
│   │   │   ├── modals/
│   │   │   │   ├── ConfirmModal.tsx
│   │   │   │   ├── EditPlayerModal.tsx
│   │   │   │   └── AdjustPairingModal.tsx
│   │   │   └── common/
│   │   │       ├── Button.tsx
│   │   │       ├── Card.tsx
│   │   │       ├── Input.tsx
│   │   │       ├── Select.tsx
│   │   │       ├── Badge.tsx
│   │   │       └── Spinner.tsx
│   │   ├── hooks/              # Custom hooks
│   │   │   ├── useAuth.ts
│   │   │   ├── useTournament.ts
│   │   │   ├── useRounds.ts
│   │   │   └── usePagination.ts
│   │   ├── services/           # API calls
│   │   │   ├── api.ts
│   │   │   ├── authService.ts
│   │   │   ├── tournamentService.ts
│   │   │   ├── playerService.ts
│   │   │   ├── roundService.ts
│   │   │   └── resultService.ts
│   │   ├── store/              # Zustand stores
│   │   │   ├── authStore.ts
│   │   │   ├── tournamentStore.ts
│   │   │   └── uiStore.ts
│   │   ├── types/              # TypeScript types
│   │   │   ├── user.ts
│   │   │   ├── tournament.ts
│   │   │   ├── player.ts
│   │   │   ├── round.ts
│   │   │   └── api.ts
│   │   ├── utils/              # Utility functions
│   │   │   ├── formatters.ts
│   │   │   ├── validators.ts
│   │   │   ├── constants.ts
│   │   │   └── helpers.ts
│   │   ├── styles/
│   │   │   ├── globals.css
│   │   │   └── tailwind.css
│   │   └── App.css
│   ├── public/                 # Static assets
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── .env.example
│   └── Dockerfile
│
├── docker-compose.yml          # Docker Compose configuration
├── .github/
│   ├── workflows/
│   │   ├── backend-tests.yml
│   │   ├── frontend-tests.yml
│   │   └── deploy.yml
│   └── ISSUE_TEMPLATE/
│       ├── bug.md
│       ├── feature.md
│       └── task.md
├── docs/                       # Documentation
│   ├── API.md                  # API documentation
│   ├── SETUP.md                # Setup instructions
│   ├── ARCHITECTURE.md         # Architecture overview
│   ├── SWISS_ALGORITHM.md      # Swiss pairing explanation
│   └── DEPLOYMENT.md           # Deployment guide
└── .env.example               # Environment variables template
```

## Getting Started

### Prerequisites
- Docker & Docker Compose
- Python 3.9+
- Node.js 16+
- MongoDB 4.4+

### Quick Start with Docker

```bash
# Clone the repository
git clone https://github.com/suhasn/ckm-tournament-manager.git
cd ckm-tournament-manager

# Copy environment files
cp .env.example .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Start with Docker Compose
docker-compose up -d

# Application will be available at:
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000
# API Docs: http://localhost:8000/docs
```

### Development Setup

#### Backend
```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment
cp .env.example .env

# Run migrations
python -m alembic upgrade head

# Start development server
uvicorn app.main:app --reload --port 8000
```

#### Frontend
```bash
cd frontend

# Install dependencies
npm install

# Set up environment
cp .env.example .env

# Start development server
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/refresh` - Refresh JWT token
- `POST /api/v1/auth/logout` - Logout user

### Tournaments
- `GET /api/v1/tournaments` - List all tournaments
- `POST /api/v1/tournaments` - Create tournament
- `GET /api/v1/tournaments/{id}` - Get tournament details
- `PUT /api/v1/tournaments/{id}` - Update tournament
- `DELETE /api/v1/tournaments/{id}` - Delete tournament

### Players
- `GET /api/v1/tournaments/{tournament_id}/players` - List players
- `POST /api/v1/tournaments/{tournament_id}/players` - Add player
- `PUT /api/v1/players/{id}` - Update player
- `DELETE /api/v1/players/{id}` - Delete player
- `POST /api/v1/tournaments/{tournament_id}/players/import` - Bulk import

### Rounds & Pairings
- `POST /api/v1/tournaments/{tournament_id}/rounds/generate` - Generate pairings
- `GET /api/v1/tournaments/{tournament_id}/rounds` - List rounds
- `PUT /api/v1/rounds/{id}/start` - Start round
- `PUT /api/v1/pairings/{id}/adjust` - Adjust pairing

### Results
- `POST /api/v1/results` - Enter result
- `PUT /api/v1/results/{id}` - Update result
- `POST /api/v1/rounds/{id}/finalize` - Finalize round

### Standings
- `GET /api/v1/tournaments/{tournament_id}/standings` - Get standings
- `GET /api/v1/tournaments/{tournament_id}/standings/export` - Export standings

## Testing

```bash
# Backend tests
cd backend
pytest

# Frontend tests
cd frontend
npm test

# Coverage
pytest --cov=app tests/
```

## Documentation

- [Setup Guide](docs/SETUP.md)
- [Architecture](docs/ARCHITECTURE.md)
- [API Documentation](docs/API.md)
- [Swiss Algorithm](docs/SWISS_ALGORITHM.md)
- [Deployment Guide](docs/DEPLOYMENT.md)

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -am 'Add feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Open a Pull Request

## License

MIT License - see LICENSE file for details

## Support

For issues and feature requests, please create an issue on GitHub.

---

**CK Mysuru Tournament Manager** - Making chess tournaments simple and efficient

# SIH2025 Government Dashboard

Full-stack project (FastAPI + React + Tailwind) for Smart India Hackathon 2025.

---

##  Project Structure
```
SIH2025_GOVT_DASHBOARD/
│── backend/        # FastAPI backend
│── frontend/       # React + Tailwind frontend
│── tests/          # Testing
```

---

##  Backend Setup

1. Go to `backend/`:
   ```bash
   cd backend
   ```

2. Create a `.env` file (see `.env.example`):
   ```env
   MONGO_URL=your_mongo_connection_string
   DB_NAME=your_database_name
   CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run server:
   ```bash
   uvicorn main:app --reload
   ```

Backend will be available at  `http://localhost:8000`

---

##  Frontend Setup

1. Go to `frontend/`:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Start development server:
   ```bash
   yarn start
   ```

Frontend will be available at  `http://localhost:3000`

---

##  Tech Stack
- **Backend:** FastAPI, MongoDB, Motor
- **Frontend:** React, Tailwind CSS
- **Other:** Docker (optional), Yarn, Uvicorn

---
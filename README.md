# ☁️ CloudShare — Next Generation File Sharing Platform

A full-stack cloud file sharing application built with **React** (frontend) and **Spring Boot** (backend).

---

## 📁 Project Structure

```
CloudShare/
│
├── frontend/                 # React + Vite + Clerk
│   ├── src/                  # React source code
│   │   ├── assets/           # Images, data, static assets
│   │   ├── components/       # Reusable UI components
│   │   ├── context/          # React context providers
│   │   ├── layout/           # Layout components
│   │   └── pages/            # Page components (routes)
│   ├── public/               # Static public assets
│   ├── package.json          # Node.js dependencies & scripts
│   ├── package-lock.json     # Dependency lock file
│   ├── vite.config.js        # Vite build configuration
│   ├── eslint.config.js      # ESLint configuration
│   ├── index.html            # HTML entry point
│   ├── .env.example          # Environment variables template
│   └── .gitignore            # Frontend-specific git ignores
│
├── backend/                  # Spring Boot + MongoDB
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/         # Java source code
│   │   │   └── resources/    # Application config (YAML)
│   │   └── test/             # Test source code
│   ├── .mvn/                 # Maven wrapper config
│   ├── pom.xml               # Maven dependencies & build config
│   ├── mvnw                  # Maven wrapper (Linux/macOS)
│   ├── mvnw.cmd              # Maven wrapper (Windows)
│   └── .gitignore            # Backend-specific git ignores
│
├── .gitignore                # Root-level git ignores
└── README.md                 # This file
```

---

## 🛠️ Tech Stack

| Layer      | Technology                                |
| ---------- | ----------------------------------------- |
| Frontend   | React 19, Vite 8, TailwindCSS 4, Clerk   |
| Backend    | Spring Boot 3.5, Java 21, Lombok          |
| Database   | MongoDB                                   |
| HTTP       | Axios (frontend), Spring Web (backend)    |
| Routing    | React Router DOM v7                       |
| Auth       | Clerk (frontend)                          |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18 and **npm** ≥ 9
- **Java** 21 (JDK)
- **MongoDB** (local instance or Atlas connection)
- **Clerk** account for authentication keys

---

### Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Create your environment file
cp .env.example .env
# Edit .env and add your Clerk publishable key:
# VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here

# Start development server
npm run dev
```

The frontend will start on **http://localhost:5173**

**Available Scripts:**

| Command            | Description                    |
| ------------------ | ------------------------------ |
| `npm run dev`      | Start Vite dev server with HMR |
| `npm run build`    | Build for production           |
| `npm run preview`  | Preview production build       |
| `npm run lint`     | Run ESLint                     |

---

### Backend Setup

```bash
# Navigate to backend
cd backend

# Run the Spring Boot application (Windows)
mvnw.cmd spring-boot:run

# Run the Spring Boot application (Linux/macOS)
./mvnw spring-boot:run
```

The backend will start on **http://localhost:8080**

> **Note:** Ensure MongoDB is running before starting the backend. Configure your MongoDB connection in `backend/src/main/resources/application.yaml`.

---

## 📝 Environment Variables

### Frontend (`frontend/.env`)

| Variable                        | Description                   |
| ------------------------------- | ----------------------------- |
| `VITE_CLERK_PUBLISHABLE_KEY`    | Clerk publishable API key     |

> ⚠️ `.env` files are gitignored. Use `.env.example` as a template.

---

## 📄 License

This project is private and not licensed for public use.

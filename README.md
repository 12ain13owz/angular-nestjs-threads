# Threads App (Angular + NestJS)

## Folder Structure

```bash
angular-nestjs-threads/
├── development/       # Environment Configs
    ├── backend/       # NestJS Backend
    ├── frontend/      # Angular Frontend
├── README.md          # Project Documentation
```

## Prerequisites

- Node.js (v18+)
- MongoDB
- Angular CLI
- NestJS CLI

## Setup Instructions

### 1. Clone the Repository

```sh
git clone https://github.com/your-repo/angular-nestjs-threads.git
cd angular-nestjs-threads
```

### 2. Configure Environment Variables

create **backend/.env.dev**

```env
MONGO_URI=mongodb://localhost:27017/threads
```

### 3. Install Dependencies

```sh
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 4. Start the Application

```sh
# Backend (NestJS)
cd backend
npm run start:dev

# Frontend (Angular)
cd ../frontend
ng serve
```

URL: `http://localhost:4200/`

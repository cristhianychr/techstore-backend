# 🛒 TechStore Backend

Backend for an e-commerce application built with Node.js, Express and MongoDB.

## 🚀 Features

- Authentication & Authorization (JWT, Roles)
- Product & Category management
- Order system with stock control
- MongoDB Transactions (data consistency)
- Audit logging system
- Error handling middleware

## 🧱 Tech Stack

- Node.js
- Express
- MongoDB (Mongoose)
- PostgreSQL (Audit logs)

## 📦 Installation

```bash
npm install
```

## ⚙️ Environment variables

Create a .env file:

```bash
PORT=3000
MONGO_URI=your_mongo_uri
POSTGRES_URI=your_postgres_uri
JWT_SECRET=your_secret
JWT_EXPIRES_IN=
```

## ▶️ Run project

```bash
npm run dev
```

📌 API Endpoints

Auth

POST /api/auth/register

POST /api/auth/login

Products

GET /api/products

POST /api/products

PUT /api/products/:id

DELETE /api/products/:id

Categories

GET /api/categories

POST /api/categories

PUT /api/categories/:id

DELETE /api/categories/:id

Orders

POST /api/orders

GET /api/orders

GET /api/orders/:id

PATCH /api/orders/:id/status

🧠 Author

Cristhian Chanamé
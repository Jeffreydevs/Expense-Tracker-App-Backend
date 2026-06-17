# Expense Tracker App Backend

Backend API for an expense tracker app built with Node.js, Express, MongoDB, and Mongoose.

## Live API

https://spendifi-backend.onrender.com/

## Features

- Create expenses
- List all expenses
- Update an expense
- Delete an expense
- Connects to MongoDB through a `MONGO_URI` environment variable

## Tech Stack

- Node.js
- Express
- MongoDB
- Mongoose
- CORS
- dotenv

## Getting Started

Install dependencies:

```bash
npm install
```

Create a `.env` file in the project root:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the server:

```bash
npm start
```

## API Routes

| Method | Route | Description |
| --- | --- | --- |
| `GET` | `/` | Health check route |
| `GET` | `/api/expenses` | Get all expenses |
| `POST` | `/api/expenses` | Create a new expense |
| `PUT` | `/api/expenses/:id` | Update an expense |
| `DELETE` | `/api/expenses/:id` | Delete an expense |

## Expense Object

```json
{
  "name": "Groceries",
  "amount": 1200,
  "category": "Food",
  "date": "2026-06-15"
}
```

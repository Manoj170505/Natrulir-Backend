# Natrulir-Backend 🌿

RESTful API backend for **Natrulir** organic microgreens e-commerce and admin operations. Built with Express.js, Prisma ORM, and MongoDB Atlas.

## 🚀 Features

- **Product API**:
  - `GET /api/products` — Filter by category, badge, search, and sort.
  - `GET /api/products/:id` — Single product details.
  - `POST /api/products` — Create new microgreen product (Admin).
  - `PUT /api/products/:id` — Update product info & stock (Admin).
  - `DELETE /api/products/:id` — Delete product (Admin).
- **Order API**:
  - `POST /api/orders` — Place customer orders and auto-deduct stock.
  - `GET /api/orders` — List customer orders with filters and search (Admin).
  - `GET /api/orders/:id` — Order lookup by ID or order number (e.g. `MG-2026-XXXX`).
  - `PATCH /api/orders/:id/status` — Fast status transitions (`Pending`, `Processing`, `Order Picked`, `Denied`, `Delivered`).
  - `DELETE /api/orders/:id` — Delete order.
- **Analytics & Dashboard API**:
  - `GET /api/stats/dashboard` — Revenue, order status distribution, stock counts, and recent orders.
- **Health Check**:
  - `GET /api/health` — Database connectivity status.

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas
- **ORM**: Prisma ORM (`@prisma/client`)
- **Middleware**: CORS, Morgan logger, Dotenv

## 🏃 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Configure .env
# Create .env with DATABASE_URL and PORT

# 3. Push schema to database
npx prisma db push

# 4. (Optional) Seed demo products
npm run seed

# 5. Start server
npm start
```

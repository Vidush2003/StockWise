# StockWise — Inventory Management System

> **Track Stock. Manage Inventory. Make Better Decisions.**

StockWise is a full-stack, production-quality Inventory Management System built with Node.js, Express.js, MongoDB (Mongoose), and React.js with Tailwind CSS. It is designed to demonstrate full-stack software development principles, clean architecture, REST API design, role-based authorization (RBAC), data consistency, and meaningful business logic.

---

## 📖 Quick Links & Documentation

- [Manual Testing Guide](file:///d:/projects/InventorySys/manual_testing_guide.md) — Step-by-step walkthrough to test every single feature manually.
- [Folder Structure & Progress Log](file:///d:/projects/InventorySys/folderstructure.md) — Complete folder tree and progress tracker.
- [Interview Preparation Guide](file:///C:/Users/Asus/.gemini/antigravity-ide/brain/81d3e94b-d2ae-4c5a-9698-bec18a256df9/interview_guide.md) — 60-second pitch, architecture breakdown, and Top 30 interview Q&As.

---

## 🌟 Key Features

1. **Role-Based Authentication & Authorization (RBAC)**:
   - **Admin**: Full Product CRUD capabilities, price & threshold adjustments, stock intake/issuance, audit logs, and analytics.
   - **Staff**: View product catalog, record Stock-In / Stock-Out inventory movements, view transactions & dashboard metrics. Protected by backend middleware.
2. **Product Catalog Management**:
   - Create, edit, and soft-delete products.
   - Unique SKU enforcement, category management, pricing, and supplier tracking.
   - Multi-field search (Name, SKU, Category, Supplier), category filtering, status filtering, sorting, and server-side pagination.
3. **Core Inventory Business Logic & Safety**:
   - **Automatic Stock Status Detection**: Dynamic status evaluation (`IN_STOCK`, `LOW_STOCK`, `OUT_OF_STOCK`).
   - **Stock-In Flow**: Record incoming shipments and calculate updated stock levels.
   - **Stock-Out Flow**: Record stock issuance with strict negative quantity guard (`requested > current` rejected with `400 Bad Request`).
   - **Audit Trail**: Every inventory mutation atomically logs an `InventoryTransaction` record (product, type, quantity, previous quantity, new quantity, reason, performing user, timestamp).
4. **SaaS Dashboard & Interactive Analytics**:
   - 4 KPI Stat Cards: Total Products, Total Inventory Value ($\sum \text{price} \times \text{quantity}$), Low Stock Items, Out of Stock Items.
   - Recharts Visualizations: Stock Quantity by Category & 7-Day Stock Movement trends (Stock In vs Stock Out).
   - Real-time Low & Out of Stock Alert table.
5. **Interview-First Code Quality**:
   - Service layer separating business logic from controllers (`inventoryService.js`, `dashboardService.js`).
   - MongoDB indexes on `email`, `sku`, `name`, `category`, and `createdAt`.
   - Comprehensive error handling returning standardized `{ success: false, message: ... }` responses.

---

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js & Express.js
- **Database**: MongoDB & Mongoose ORM
- **Authentication**: JWT (JSON Web Tokens) & bcryptjs (Password Hashing)
- **Validation & CORS**: Express CORS & custom validation middleware

### Frontend
- **Framework**: React.js 18 (Vite build tool)
- **Styling**: Tailwind CSS (Dark SaaS theme & custom scrollbar)
- **Routing**: React Router v6
- **State Management**: React Context API (`AuthContext`)
- **HTTP Client**: Axios with JWT request/response interceptors
- **Data Visualization**: Recharts & Lucide Icons

---

## 📐 System Architecture

```text
React (Client)
   │
   ▼  HTTP Requests (Axios + JWT Authorization Header)
Express REST API (Server)
   │
   ├── Routes (/api/auth, /api/products, /api/transactions, /api/dashboard)
   ├── Middleware (requireAuth, requireRole, errorHandler)
   ├── Controllers (authController, productController, inventoryController, etc.)
   ├── Services (inventoryService, dashboardService)
   └── Models (User, Product, InventoryTransaction)
   │
   ▼  Mongoose Driver
MongoDB Database
```

---

## 🔑 Demo Accounts & Seed Data

The project includes an automated database seeder script. Run `npm run seed` in `/server` to clear and populate demo records:

| Role | Email | Password | Permissions |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@stockwise.com` | `password123` | Full CRUD, Stock Adjustments, All Reports |
| **Staff** | `staff@stockwise.com` | `password123` | View Catalog, Record Stock In/Out, View Logs |
| **Staff** | `john@stockwise.com` | `password123` | View Catalog, Record Stock In/Out, View Logs |

---

## 🚀 Quick Start & Installation

### 1. Prerequisites
- Node.js (v18+)
- MongoDB running locally on `mongodb://127.0.0.1:27017` or a MongoDB Atlas URI.

### 2. Backend Setup
```bash
cd server
npm install
npm run seed     # Populates DB with admin, staff, 18 products & transactions
npm start        # Starts server on http://localhost:5000
```

### 3. Frontend Setup
```bash
cd client
npm install
npm run dev      # Starts React Vite app on http://localhost:5173
```

---

## 📡 API Endpoint Reference

### Authentication
- `POST /api/auth/register` — Register a new account
- `POST /api/auth/login` — Login and receive JWT token
- `GET /api/auth/me` — Get current logged-in user profile (`requireAuth`)

### Product Management
- `GET /api/products` — List paginated products (`?search=...&category=...&status=...&page=1&limit=10`)
- `GET /api/products/:id` — Get single product details + recent audit history
- `POST /api/products` — Create new product (`Admin Only`)
- `PUT /api/products/:id` — Update product details (`Admin Only`)
- `DELETE /api/products/:id` — Soft-delete product (`Admin Only`)

### Inventory Mutations
- `POST /api/products/:id/stock-in` — Record Stock-In (+ quantity)
- `POST /api/products/:id/stock-out` — Record Stock-Out (- quantity, validates against current stock)

### Transaction History & Analytics
- `GET /api/transactions` — Get paginated audit trail logs (`?type=...&product=...`)
- `GET /api/dashboard/summary` — Get total products, total inventory value, low stock counts
- `GET /api/dashboard/category-stats` — Get category breakdown aggregation
- `GET /api/dashboard/stock-movement` — Get 7-day stock movement history
- `GET /api/dashboard/low-stock-alerts` — Get low stock items list

---

## 🎓 Interview Talking Points

1. **Why separate Product and InventoryTransaction models?**
   - Direct quantity updates lose historical context. By logging an immutable transaction for every stock mutation, StockWise maintains a complete audit trail (who changed what, when, and why).
2. **How does StockWise prevent negative inventory?**
   - Inside `inventoryService.js`, before executing a stock-out update, the service validates `requestedQuantity <= currentQuantity`. If requested exceeds available, it throws a 400 status error without mutating the database.
3. **How is inventory valuation calculated?**
   - Inventory value is computed via MongoDB aggregation $\sum (\text{price} \times \text{quantity})$ for all active products.
4. **How is Security & Role Authorization handled?**
   - Passwords are hashed using `bcryptjs` with salt rounds. Endpoints enforce `requireAuth` (JWT validation) and `requireRole('admin')` for destructive/admin operations.

---

# 🚚 TransportLogix

### *Smart Logistics & Fleet Management System*

TransportLogix is a high-performance, full-stack web application designed for the modern logistics industry. It empowers companies to manage fleet operations, track shipments with precision, and provide a seamless booking experience for clients.

---

## 🌟 Key Features

* **🔐 Secure Authentication**: Multi-level user access using **Express Sessions** for robust security and data privacy.
* **📦 Dynamic Booking**: Effortless shipment scheduling with automated validation for pickup and delivery locations.
* **📍 Real-Time Tracking**: Instant shipment status retrieval using unique **24-character MongoDB identifiers**.
* **📊 Executive Dashboard**: A centralized "Mission Control" for administrators to monitor all active shipments, update delivery statuses, and manage records.
* **📧 Integrated Communication**: A professional-grade contact system that archives user inquiries directly to the database.
* **📱 Universal Responsiveness**: A mobile-first design philosophy ensuring a perfect experience on smartphones, tablets, and desktops.

---

## 🛠️ Technology Stack

| Layer | Technology |
| --- | --- |
| **Frontend** | EJS Templates, CSS3 (Custom Grid/Flexbox), Vanilla JavaScript |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB with Mongoose ODM |
| **DevOps** | Git, Dotenv, Body-Parser, Express-Session |

---

## 🚀 Getting Started

### Prerequisites

* Node.js (v14+ recommended)
* MongoDB installed and running locally (or an Atlas URI)

### Installation & Setup

1. **Clone the Repository**
```bash
git clone https://github.com/ashutoshs20051107-debug/transport-and-logistic-web.git
cd transport-and-logistic-web

```


2. **Install Dependencies**
```bash
npm install

```


3. **Environment Configuration**
Create a `.env` file in the root directory:
```env
MONGO_URI=mongodb://localhost:27017/transportLogix
PORT=3000
SESSION_SECRET=your_secret_key_here

```


4. **Launch the App**
```bash
node app.js

```


Visit: `http://localhost:3000`

---

## 📁 Project Architecture

```text
├── models/           # Mongoose Schemas (User, Booking, Contact)
├── public/           # Static Assets (Modular CSS, JS, Images)
├── views/            # EJS Templates (Logic-driven HTML)
│   └── partials/     # Modular UI Components (Navbar, Footer)
├── app.js            # Express Server & Route Configuration
├── .env              # Private Environment Variables
└── .gitignore        # Version Control Exclusions

```

---

## 📄 License

This project is licensed under the **MIT License**.

---

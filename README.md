
```markdown
# TransportLogix - Smart Logistics Management System

TransportLogix is a full-stack web application built using **Node.js**, **Express**, and **EJS**, with **MongoDB** as the database. It is designed to help logistics companies manage fleet operations, track shipments in real-time, and handle user bookings efficiently.

## 🚀 Features

* **User Authentication**: Secure Login and Registration system using Express Sessions.
* **Shipment Booking**: Registered users can book new shipments with pickup and delivery details.
* **Live Tracking**: Real-time shipment status lookup using unique 24-character MongoDB IDs.
* **Admin Dashboard**: Centralized management to view all shipments, update status to "Delivered", or delete records.
* **Professional Contact Form**: Functional feedback system that saves messages to the database.
* **Responsive Design**: Fully optimized for mobile, tablet, and desktop views.

## 🛠️ Tech Stack

* **Frontend**: EJS (Embedded JavaScript), CSS3, Vanilla JavaScript
* **Backend**: Node.js, Express.js
* **Database**: MongoDB (Mongoose ODM)
* **Tools**: Git, dotenv, Body-parser
```

## 📦 Installation & Setup
1. **Clone the repository:**
   ```bash
   git clone [https://github.com/ashutoshs20051107-debug/transport-and-logistic-web.git](https://github.com/ashutoshs20051107-debug/transport-and-logistic-web.git)
   cd transport-and-logistic-web

```
2. **Install dependencies:**
```bash
npm install

```


3. **Configure Environment Variables:**
Create a `.env` file in the root directory and add your MongoDB URI:
```env
MONGO_URI=mongodb://localhost:27017/transportLogix
PORT=3000

```



4. **Run the application:**
```bash
node app.js

```


Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) in your browser.

## 📁 Project Structure

```text
├── models/           # Mongoose Schemas (User, Booking, Contact)
├── public/           # Static assets (CSS, JS, Images)
├── views/            # EJS Templates
│   └── partials/     # Reusable components (Header, Footer)
├── app.js            # Main server file
└── .env              # Sensitive configurations (ignored by Git)

```

## 📄 License

This project is licensed under the MIT License.

```

---


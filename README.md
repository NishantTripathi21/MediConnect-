# 🏥 Full Stack Appointment Booking System
### (Multi-Role Authentication)
A robust, full-stack appointment booking platform designed for hospitals and doctors. The system features a **3-level authentication architecture** (Patient, Doctor, Admin) allowing seamless scheduling, earnings tracking, and hospital management.

---

## 🚀 Overview
This project uses a scalable **MERN-style architecture** with three distinct components:
1.  **Frontend:** For patients to book appointments.
2.  **Admin Panel:** For hospital administrators to manage doctors and system settings.
3.  **Backend:** A unified API server handling logic, database, and security.

---

## ✨ Key Features

### 👤 Patient Panel
* **Secure Auth:** JWT-based Signup & Login.
* **Booking System:** Browse doctors, check availability, and book appointments.
* **Dashboard:** View booking history, reschedule, or cancel appointments.
* **Payments:** Integrated **Stripe** & **Razorpay** for secure transactions.
* **Profile:** Manage personal details and medical history.

### 🧑‍⚕️ Doctor Panel
* **Dashboard:** View upcoming appointments and patient details.
* **Earnings Tracker:** Monitor financial performance.
* **Profile Management:** Update availability and bio.
* **Image Uploads:** Profile picture management via **Multer + Cloudinary**.

### 🛠️ Admin Panel (Dedicated App)
* **Doctor Management:** Add, edit, or remove doctors from the system.
* **Appointment Oversight:** View all system-wide bookings.
* **System Control:** Monitor overall platform activity and user data.

---

## 🧱 Tech Stack

| Component | Technologies |
| :--- | :--- |
| **Frontend** | React.js, Vite, Tailwind CSS, React Router, Axios, React Toastify |
| **Backend** | Node.js, Express.js, MongoDB, Mongoose |
| **Authentication** | JWT (JSON Web Tokens), bcrypt |
| **File Storage** | Cloudinary (via Multer) |
| **Payments** | Stripe, Razorpay |

---

## 🔐 3-Level Security Architecture

The system enforces strict role-based access control:

| Role | Access Level | Description |
| :--- | :--- | :--- |
| **Patient** | `User` | Can search doctors and manage own appointments. |
| **Doctor** | `Provider` | Can view own schedule and earnings only. |
| **Admin** | `Root` | Full access to all data, doctors, and settings. |

---

## ⚙️ Installation & Setup

Follow these steps to run the complete system locally.

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/NishantTripathi21/MediConnect-
cd MediConnect-
```

### 2️⃣ Backend Setup
Start the server first to ensure APIs are ready.
```bash
cd backend
npm install
```

**Configure Environment Variables:**
Create a `.env` file in the `backend` folder:
```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
ADMIN_EMAIL=YOUR_ADMIN_EMAIL
ADMIN_PASSWORD=ADMIN_PASSWORD
CURRENCY=INR

# Image Upload
CLOUDINARY_CLOUD_NAME = "your_cloud_name"
CLOUDINARY_API_KEY = "your_api_key"
CLOUDINARY_API_SECRET = "your_api_secret"

# Payments
STRIPE_SECRET_KEY=your_stripe_secret_key
RAZORPAY_KEY_ID=your_razorpay_key_id
```

**Run Server:**
```bash
npm run server
```

### 3️⃣ Frontend Setup (Patient App)
Open a new terminal:
```bash
cd frontend
npm install
npm run dev
```

### 4️⃣ Admin Panel Setup
Open a third terminal:
```bash
cd admin
npm install
npm run dev
```

---

## 🗂 Project Structure

```text
/root
│
├── /backend         # Express API Server & Database Models
│   ├── controllers  # Logic for Doctors, Users, Admin
│   ├── models       # Mongoose Schemas
│   └── routes       # API Endpoints
│
├── /frontend        # Patient React Application
│   ├── src/pages    # Login, Doctors, MyProfile, etc.
│   └── src/components
│
└── /admin           # Admin React Application
    ├── src/pages    # Dashboard, AddDoctor, AllAppointments
    └── src/context  # Admin State Management
```

---

## 📸 Screenshots

### 🏠 Home Page
*(Add your screenshot path here, e.g., `![Home](screenshots/home.png)`)*

### 📅 Doctor Booking Flow
*(Add your screenshot path here)*

### 🛠️ Admin Dashboard
*(Add your screenshot path here)*

---

## 🤝 Contribution
Contributions are welcome!
1. Fork the repo.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit your changes.
4. Push to the branch and open a Pull Request.

---

## 👨‍💻 Author
**Your Name**
* [GitHub Profile](https://github.com/your-username)
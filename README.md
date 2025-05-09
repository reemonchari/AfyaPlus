```markdown
# Afia Plus

Afia Plus is a full-stack healthcare access platform built with Flask (Python) for the backend and React for the frontend. It enables patients to register, book appointments with providers offering specific services, and manage their healthcare journey seamlessly.

---

## 📁 Project Structure

```
afia-plus/
│
├── client/                 # React frontend
│   ├── public/
│   │   └── image_001.jpg   # Background image
│   └── src/
│       ├── components/
│       │   ├── Navbar.js
│       │   ├── Login.js
│       │   ├── LogoutButton.js
│       │   ├── Signup.js
│       │   ├── HomePage.js
│       │   ├── AppointmentPage.js
│       │   ├── EditAppointment.js
│       │   ├── ServicePage.js
│       │   ├── ProviderRegistration.js
│       │   ├── ProviderProfile.js
│       │   ├── EditProvider.js
│       │   ├── PatientRegistration.js
│       │   ├── PatientProfile.js
│       │   ├── EditPatient.js
│       │   ├── MyAppointments.js
│       ├── App.js
│       └── index.css
│
└── server/                 # Flask backend
    ├── app.py
    ├── config.py
    ├── seed.py
    ├── generate_secret.py
    └── models/
        ├── __init__.py
        ├── appointment.py
        ├── patient.py
        ├── provider.py
        ├── service.py
        └── user.py
```

---

## ⚙️ Tech Stack

### Frontend
- React
- React Router DOM
- CSS Modules (`index.css`)
- LocalStorage for session handling

### Backend
- Flask
- SQLAlchemy
- Flask-CORS
- SQLite (or other DBMS)

---

## ✨ Features

- Patient and Provider registration & login
- Conditional navigation based on user type
- Patients can:
  - View services
  - Select providers by service
  - Book appointments
  - Edit or delete their appointments
- Providers can:
  - Manage their profile
  - Offer multiple services
- Many-to-many relationship between Providers and Services
- Appointment edit and status update
- Secure route redirection and user-based data handling

---

## 🚀 Getting Started

### Backend Setup

1. Navigate to the backend folder:

```bash
cd server
```

2. Create and activate a virtual environment using Pipenv:

```bash
pipenv install
pipenv shell
```

3. Run database seed script:

```bash
python seed.py
```

4. Start the Flask server:

```bash
flask run
```

---

### Frontend Setup

1. Navigate to the frontend:

```bash
cd client
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

---

## 🌐 API Endpoints (Sample)

- `GET /services` – List all services
- `GET /services/<id>` – Get one service
- `GET /providers/by-service/<service_id>` – Get providers for a service
- `POST /appointments` – Book appointment
- `GET /appointments/<id>` – Get one appointment
- `PUT /appointments/<id>` – Update appointment
- `DELETE /appointments/<id>` – Delete appointment

---

## 🔐 Authentication

- Simple role-based login using `localStorage`
- No session tokens used (for learning/demo purposes)
- `user_type` determines redirect path after login

---

## 🎨 Styling

- Global background image: `/public/image_001.jpg`
- Shared `hero-container` and `hero-text` styling across all pages
- All main components use consistent layout

---

## ✍️ Author

**Afia Plus** by Rebecca Monchari

---

## 📝 License

This project is open-source and available for educational and learning purposes.
```

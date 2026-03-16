# DeliverEase AI

Next-generation food delivery with AI-predicted ETAs.

## Prerequisites
- Node.js (v20+)
- MySQL
- Python (v3.10+)

## Setup Instructions

### 1. Database Setup
- Create a MySQL database named `deliverease_db`.
- Update `backend/.env` with your MySQL credentials.

### 2. Backend Setup
```bash
cd backend
npm install
npm run dev
```

### 3. ML Service Setup
```bash
cd ml_service
pip install -r requirements.txt
python app.py
```

### 4. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## AI ETA Features
The application uses a Flask-based ML service that implements a feature-rich prediction model based on:
- Delivery person age and ratings
- Distance (GPS coordinates)
- Traffic density
- Weather conditions
- Vehicle type and condition

??$$$ - All components are styled with a premium, modern aesthetic using Tailwind CSS and custom glassmorphism effects.
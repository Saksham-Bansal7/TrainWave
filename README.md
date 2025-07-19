# 🏋️ TrainWave - AI-Powered Fitness Tracker

[![Live Demo](https://img.shields.io/badge/Live%20Demo-train--wave.vercel.app-blue?style=for-the-badge&logo=vercel)](https://train-wave.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-TrainWave-181717?style=for-the-badge&logo=github)](https://github.com/Saksham-Bansal7/TrainWave)

> **TrainWave** is a modern, AI-powered fitness tracking application that combines computer vision technology with intelligent coaching to help users achieve their fitness goals. Built with cutting-edge web technologies, it offers real-time exercise tracking, personalized AI trainer chat, and comprehensive progress monitoring.

## 🌟 Features

### 🤖 AI-Powered Exercise Tracking

- **Real-time Pose Detection**: Using MediaPipe for accurate exercise form tracking
- **Automatic Rep Counting**: AI counts your reps in real-time for 7 different exercises
- **Exercise Types Supported**:
  - Push-ups
  - Pull-ups
  - Bicep Curls
  - Shoulder Raises
  - Press (Overhead Press)
  - Squats
  - Deadlifts

### 💬 Intelligent AI Trainer Chat

- **FitBot Integration**: Powered by Groq LLaMA 3 8B model
- **Personalized Advice**: Get workout plans, form corrections, and nutrition tips
- **24/7 Availability**: Your AI trainer is always ready to help
- **Message History**: Conversation history with TTL (expires after 24 hours)

### 📊 Progress Tracking & Analytics

- **Personal Dashboard**: Track your workout progress over time
- **Exercise History**: View detailed workout logs with timestamps
- **Global Leaderboard**: Compete with other users worldwide
- **Performance Statistics**: Analyze your fitness journey

### 🎨 Modern User Interface

- **Glass-morphism Design**: Beautiful modern UI with backdrop blur effects
- **Responsive Layout**: Optimized for all devices (desktop, tablet, mobile)
- **Dark Theme**: Eye-friendly design with gradient backgrounds
- **Smooth Animations**: Engaging user experience with seamless transitions

### 🔐 Secure Authentication

- **JWT-based Authentication**: Secure user sessions
- **Password Encryption**: bcrypt hashing for password security
- **Protected Routes**: Secure access to user-specific features

## 🛠️ Technology Stack

### Frontend

- **React 19.1.0** - Modern UI library with latest features
- **Vite 7.0.4** - Lightning-fast build tool and dev server
- **React Router Dom 7.7.0** - Client-side routing
- **Redux Toolkit 2.8.2** - State management
- **Redux Persist 6.0.0** - Persist store data
- **Tailwind CSS 4.1.11** - Utility-first CSS framework
- **React Hook Form 7.60.0** - Form handling and validation

### AI & Computer Vision

- **MediaPipe Pose 0.5.1675469404** - Google's pose estimation model
- **MediaPipe Camera Utils 0.3.1675466862** - Camera handling utilities
- **MediaPipe Drawing Utils 0.3.1675466124** - Pose visualization
- **React Webcam 7.2.0** - Camera access component

### UI & Icons

- **Lucide React 0.525.0** - Beautiful icon library
- **Heroicons React 2.2.0** - Additional icon set

### HTTP & API

- **Axios 1.10.0** - HTTP client for API calls

### Backend

- **Node.js** - Runtime environment
- **Express.js 5.1.0** - Web application framework
- **MongoDB & Mongoose 8.16.4** - NoSQL database and ODM
- **JWT (jsonwebtoken 9.0.2)** - Authentication tokens
- **bcryptjs 3.0.2** - Password hashing
- **CORS 2.8.5** - Cross-origin resource sharing

### AI Integration

- **Groq SDK 0.27.0** - AI chat integration with LLaMA models

### Development Tools

- **Nodemon 3.1.10** - Development server auto-restart
- **dotenv 17.2.0** - Environment variable management

## 🏗️ Project Architecture

```
TrainWave/
├── frontend/                    # React application
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── ExerciseCard.jsx       # Exercise selection
│   │   │   ├── ExerciseHistory.jsx    # Workout history
│   │   │   ├── Leaderboard.jsx        # Global rankings
│   │   │   ├── Login.jsx              # Authentication
│   │   │   ├── Navbar.jsx             # Navigation
│   │   │   ├── PoseTracker.jsx        # AI pose tracking
│   │   │   ├── SignUp.jsx             # User registration
│   │   │   └── TrainerChat.jsx        # AI chat interface
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx          # Main workout interface
│   │   │   └── LandingPage.jsx        # Homepage
│   │   ├── store/
│   │   │   └── store.js               # Redux store
│   │   ├── utils/
│   │   │   ├── apiPaths.js            # API endpoints
│   │   │   └── axiosInstance.js       # HTTP configuration
│   │   └── assets/                    # Static assets
│   ├── public/                        # Public files
│   └── package.json                   # Dependencies
│
├── backend/                     # Express.js API
│   ├── config/
│   │   ├── db.js                      # Database connection
│   │   └── groqApi.js                 # AI chat configuration
│   ├── controllers/
│   │   ├── exerciseController.js      # Exercise logic
│   │   ├── trainerChatController.js   # Chat logic
│   │   └── userController.js          # User management
│   ├── middleware/
│   │   └── authMiddleware.js          # Authentication
│   ├── models/
│   │   ├── exerciseModel.js           # Exercise schema
│   │   ├── trainerChatModel.js        # Chat schema
│   │   └── userModel.js               # User schema
│   ├── routes/
│   │   ├── exerciseRoutes.js          # Exercise endpoints
│   │   ├── trainerChatRoutes.js       # Chat endpoints
│   │   └── userRoutes.js              # Auth endpoints
│   └── server.js                      # Application entry
│
└── vercel.json                  # Deployment configuration
```

## 🚀 Live Demo

Experience TrainWave live at: **[https://train-wave.vercel.app](https://train-wave.vercel.app)**

### Key Features to Try:

1. **Sign Up/Login** - Create your account
2. **Dashboard** - Start an AI-tracked workout session
3. **AI Pose Tracking** - Try different exercises with real-time counting
4. **AI Trainer Chat** - Ask FitBot for fitness advice
5. **Leaderboard** - See global rankings
6. **Progress Tracking** - View your workout history

## 🔧 Installation & Setup

### Prerequisites

- Node.js (v18+)
- MongoDB Atlas account
- Groq API key

### Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.template .env

# Add your environment variables to .env:
# DB_CONNECTION_STRING="mongodb+srv://..."
# JWT_SECRET="your_secret_here"
# GROQ_API_KEY="your_groq_key_here"
# PORT=5000

# Start development server
npm run dev
```

### Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Variables

#### Backend (.env)

```env
PORT=5000
DB_CONNECTION_STRING="mongodb+srv://username:password@cluster.mongodb.net/trainwave"
JWT_SECRET="your_jwt_secret_here"
JWT_EXPIRE="30d"
GROQ_API_KEY="your_groq_api_key_here"
```

## 🤖 AI Features

### MediaPipe Pose Detection

- **Real-time Processing**: 30+ FPS pose detection
- **Exercise Recognition**: Custom algorithms for each exercise type

### Groq AI Chat Integration

- **Model**: LLaMA 3 8B (llama3-8b-8192)
- **Context Aware**: Maintains conversation history
- **Specialized Prompting**: Fitness trainer personality
- **Smart Responses**: Motivational and educational content

### Production Environment

- **Frontend**: Vercel
- **Backend**: Vercel
- **Database**: MongoDB Atlas
- **AI**: Groq Cloud API

## 👨‍💻 Author

**Saksham Bansal**

- GitHub: [@Saksham-Bansal7](https://github.com/Saksham-Bansal7)
- Project Link: [https://github.com/Saksham-Bansal7/TrainWave](https://github.com/Saksham-Bansal7/TrainWave)

## 🙏 Acknowledgments

- **Google MediaPipe** - For the amazing pose detection technology
- **Groq** - For providing fast AI inference
- **MongoDB Atlas** - For reliable database hosting
- **Vercel** - For seamless deployment experience

---

<p align="center">
  <strong>🏋️ Start your fitness journey with TrainWave today! 💪</strong>
</p>

<p align="center">
  Made with ❤️ and lots of ☕ by <a href="https://github.com/Saksham-Bansal7">Saksham Bansal</a>
</p>

# Smart Learning Path Generator

A full-stack MERN application that generates personalized learning roadmaps based on career goals, skill levels, and available study time.

## Features

- **User Authentication**: Simple email/password authentication with sessions
- **Roadmap Generation**: Dynamic learning paths based on user inputs
- **Progress Tracking**: Complete topics and track overall progress
- **Analytics**: Visual progress indicators and completion statistics
- **Responsive Design**: Built with Tailwind CSS

## Tech Stack

- **Frontend**: React.js, Tailwind CSS, React Router
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: Session-based (no JWT)
- **Database**: MongoDB (local or MongoDB Compass)

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Compass)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file (already created) and update if needed:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/learning_path_db
   SESSION_SECRET=your_session_secret_key_here
   ```

4. Start MongoDB service on your machine

5. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Initialize Tailwind CSS:
   ```bash
   npx tailwindcss init -p
   ```

4. Start the frontend development server:
   ```bash
   npm start
   ```

### Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Usage

1. **Register/Login**: Create an account or login with existing credentials
2. **Generate Roadmap**: Select career goal, skill level, and study time
3. **Track Progress**: Mark topics as complete and monitor your progress
4. **View Analytics**: Check completion statistics and weekly progress

## Project Structure

```
ROADMAP/
├── backend/
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── utils/           # Helper functions
│   ├── server.js        # Main server file
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── utils/       # Utility functions
│   │   └── App.js       # Main App component
│   └── package.json
└── README.md
```

## Available Career Paths

- Web Development (Beginner/Intermediate)
- Data Science (Beginner)
- Mobile Development (Coming soon)
- DevOps (Coming soon)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { logout } from '../utils/auth';

function Dashboard({ user }) {
  const [roadmaps, setRoadmaps] = useState([]);

  useEffect(() => {
    fetchRoadmaps();
  }, []);

  const fetchRoadmaps = async () => {
    try {
      const response = await axios.get('/api/roadmap/my-roadmaps', { withCredentials: true });
      setRoadmaps(response.data);
    } catch (error) {
      console.error('Error fetching roadmaps:', error);
    }
  };

  const handleLogout = async () => {
    await logout();
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Learning Path Generator</h1>
          <div className="flex items-center gap-4">
            <span>Welcome, {user.username}</span>
            <button onClick={handleLogout} className="text-red-600 hover:text-red-800">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">My Learning Roadmaps</h2>
          <Link 
            to="/generate" 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Generate New Roadmap
          </Link>
        </div>

        {roadmaps.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No roadmaps yet. Create your first learning path!</p>
            <Link 
              to="/generate" 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Get Started
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {roadmaps.map(roadmap => (
              <div key={roadmap._id} className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold capitalize">{roadmap.careerGoal}</h3>
                    <p className="text-gray-600">Level: {roadmap.skillLevel}</p>
                    <p className="text-gray-600">{roadmap.totalWeeks} weeks</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">{roadmap.progress}%</div>
                    <div className="text-sm text-gray-600">Complete</div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${roadmap.progress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="mt-4">
                  <Link 
                    to={`/roadmap/${roadmap._id}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    View Roadmap →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
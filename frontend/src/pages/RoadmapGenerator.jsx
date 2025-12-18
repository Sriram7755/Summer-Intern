import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function RoadmapGenerator() {
  const [formData, setFormData] = useState({
    careerGoal: '',
    skillLevel: '',
    studyTime: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const careerOptions = [
    { value: 'web-development', label: 'Web Development' },
    { value: 'data-science', label: 'Data Science' },
    { value: 'mobile-development', label: 'Mobile Development' },
    { value: 'devops', label: 'DevOps' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post('/api/roadmap/generate', formData, { withCredentials: true });
      navigate(`/roadmap/${response.data._id}`);
    } catch (error) {
      console.error('Error generating roadmap:', error);
      alert('Failed to generate roadmap');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold mb-6">Generate Your Learning Roadmap</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Career Goal</label>
              <select
                className="w-full p-3 border rounded-lg"
                value={formData.careerGoal}
                onChange={(e) => setFormData({...formData, careerGoal: e.target.value})}
                required
              >
                <option value="">Select your career goal</option>
                {careerOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Current Skill Level</label>
              <div className="space-y-2">
                {['beginner', 'intermediate', 'advanced'].map(level => (
                  <label key={level} className="flex items-center">
                    <input
                      type="radio"
                      name="skillLevel"
                      value={level}
                      checked={formData.skillLevel === level}
                      onChange={(e) => setFormData({...formData, skillLevel: e.target.value})}
                      className="mr-2"
                      required
                    />
                    <span className="capitalize">{level}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Study Time (hours per week)</label>
              <input
                type="number"
                min="1"
                max="40"
                className="w-full p-3 border rounded-lg"
                value={formData.studyTime}
                onChange={(e) => setFormData({...formData, studyTime: e.target.value})}
                placeholder="e.g., 10"
                required
              />
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="flex-1 bg-gray-300 text-gray-700 p-3 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Generating...' : 'Generate Roadmap'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RoadmapGenerator;
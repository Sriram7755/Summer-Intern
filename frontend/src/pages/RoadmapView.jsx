import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function RoadmapView() {
  const { id } = useParams();
  const [roadmap, setRoadmap] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRoadmap();
    fetchAnalytics();
  }, [id]);

  const fetchRoadmap = async () => {
    try {
      const response = await axios.get(`/api/roadmap/${id}`, { withCredentials: true });
      setRoadmap(response.data);
    } catch (error) {
      console.error('Error fetching roadmap:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const response = await axios.get(`/api/progress/analytics/${id}`, { withCredentials: true });
      setAnalytics(response.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  const toggleTopicCompletion = async (weekIndex, topicIndex, completed) => {
    try {
      await axios.put(
        `/api/progress/topic/${id}/${weekIndex}/${topicIndex}`,
        { completed },
        { withCredentials: true }
      );
      fetchRoadmap();
      fetchAnalytics();
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!roadmap) {
    return <div className="text-center py-12">Roadmap not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link to="/dashboard" className="text-blue-600 hover:text-blue-800">
            ← Back to Dashboard
          </Link>
          <h1 className="text-xl font-bold capitalize">{roadmap.careerGoal} Roadmap</h1>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">{roadmap.progress}%</div>
            <div className="text-sm text-gray-600">Complete</div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-6">
        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {roadmap.weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="bg-white rounded-lg shadow-sm border">
                  <div className="p-6 border-b">
                    <h3 className="text-lg font-semibold">Week {week.weekNumber}: {week.title}</h3>
                    <p className="text-gray-600">Estimated: {week.estimatedHours} hours</p>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-4">
                      {week.topics.map((topic, topicIndex) => (
                        <div key={topicIndex} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3">
                                <input
                                  type="checkbox"
                                  checked={topic.completed}
                                  onChange={(e) => toggleTopicCompletion(weekIndex, topicIndex, e.target.checked)}
                                  className="w-5 h-5"
                                />
                                <h4 className={`font-medium ${topic.completed ? 'line-through text-gray-500' : ''}`}>
                                  {topic.title}
                                </h4>
                              </div>
                              <p className="text-gray-600 mt-1 ml-8">{topic.description}</p>
                            </div>
                          </div>
                          
                          <div className="mt-4 ml-8">
                            <h5 className="font-medium mb-2">Resources:</h5>
                            <div className="space-y-2">
                              {topic.resources.map((resource, resourceIndex) => (
                                <div key={resourceIndex} className="flex items-center gap-2">
                                  <span className={`px-2 py-1 text-xs rounded ${
                                    resource.type === 'video' ? 'bg-red-100 text-red-700' :
                                    resource.type === 'article' ? 'bg-blue-100 text-blue-700' :
                                    'bg-green-100 text-green-700'
                                  }`}>
                                    {resource.type}
                                  </span>
                                  <a 
                                    href={resource.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800"
                                  >
                                    {resource.title}
                                  </a>
                                  <span className="text-gray-500 text-sm">({resource.duration})</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="font-semibold mb-4">Progress Overview</h3>
              {analytics && (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">{analytics.overallProgress}%</div>
                    <div className="text-sm text-gray-600">Overall Progress</div>
                  </div>
                  
                  <div className="space-y-2">
                    {analytics.weeklyProgress.map((week, index) => (
                      <div key={index} className="text-sm">
                        <div className="flex justify-between">
                          <span>Week {week.weekNumber}</span>
                          <span>{week.progress}%</span>
                        </div>
                        <div className="bg-gray-200 rounded-full h-1 mt-1">
                          <div 
                            className="bg-blue-600 h-1 rounded-full" 
                            style={{ width: `${week.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoadmapView;
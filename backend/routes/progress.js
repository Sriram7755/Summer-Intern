const express = require('express');
const Roadmap = require('../models/Roadmap');
const router = express.Router();


router.put('/topic/:roadmapId/:weekIndex/:topicIndex', async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const { roadmapId, weekIndex, topicIndex } = req.params;
    const { completed } = req.body;

    const roadmap = await Roadmap.findOne({ 
      _id: roadmapId, 
      userId: req.session.userId 
    });

    if (!roadmap) {
      return res.status(404).json({ message: 'Roadmap not found' });
    }

    roadmap.weeks[weekIndex].topics[topicIndex].completed = completed;
    
    
    const totalTopics = roadmap.weeks.reduce((sum, week) => sum + week.topics.length, 0);
    const completedTopics = roadmap.weeks.reduce((sum, week) => 
      sum + week.topics.filter(topic => topic.completed).length, 0
    );
    roadmap.progress = Math.round((completedTopics / totalTopics) * 100);

    await roadmap.save();
    res.json({ message: 'Progress updated', progress: roadmap.progress });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.get('/analytics/:roadmapId', async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const roadmap = await Roadmap.findOne({ 
      _id: req.params.roadmapId, 
      userId: req.session.userId 
    });

    if (!roadmap) {
      return res.status(404).json({ message: 'Roadmap not found' });
    }

    const analytics = {
      totalWeeks: roadmap.totalWeeks,
      overallProgress: roadmap.progress,
      weeklyProgress: roadmap.weeks.map(week => ({
        weekNumber: week.weekNumber,
        title: week.title,
        totalTopics: week.topics.length,
        completedTopics: week.topics.filter(t => t.completed).length,
        progress: Math.round((week.topics.filter(t => t.completed).length / week.topics.length) * 100)
      }))
    };

    res.json(analytics);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
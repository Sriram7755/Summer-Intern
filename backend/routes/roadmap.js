const express = require('express');
const Roadmap = require('../models/Roadmap');
const User = require('../models/User');
const { generateRoadmap } = require('../utils/roadmapGenerator');
const router = express.Router();

// Generate roadmap
router.post('/generate', async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const { careerGoal, skillLevel, studyTime } = req.body;
    
    // Update user profile
    await User.findByIdAndUpdate(req.session.userId, {
      careerGoal,
      skillLevel,
      studyTime
    });

    // Generate roadmap
    const roadmapData = generateRoadmap(careerGoal, skillLevel, studyTime);
    
    const roadmap = new Roadmap({
      userId: req.session.userId,
      careerGoal,
      skillLevel,
      ...roadmapData
    });

    await roadmap.save();
    res.json(roadmap);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user roadmaps
router.get('/my-roadmaps', async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const roadmaps = await Roadmap.find({ userId: req.session.userId });
    res.json(roadmaps);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get specific roadmap
router.get('/:id', async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const roadmap = await Roadmap.findOne({ 
      _id: req.params.id, 
      userId: req.session.userId 
    });
    
    if (!roadmap) {
      return res.status(404).json({ message: 'Roadmap not found' });
    }

    res.json(roadmap);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
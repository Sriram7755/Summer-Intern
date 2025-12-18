const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  title: String,
  type: { type: String, enum: ['video', 'article', 'practice'] },
  url: String,
  duration: String
});

const topicSchema = new mongoose.Schema({
  title: String,
  description: String,
  resources: [resourceSchema],
  completed: { type: Boolean, default: false }
});

const weekSchema = new mongoose.Schema({
  weekNumber: Number,
  title: String,
  topics: [topicSchema],
  estimatedHours: Number
});

const roadmapSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  careerGoal: String,
  skillLevel: String,
  totalWeeks: Number,
  weeks: [weekSchema],
  progress: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Roadmap', roadmapSchema);
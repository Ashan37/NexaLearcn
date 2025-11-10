import mongoose from 'mongoose';

const userActivitySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  weekStart: {
    type: String,
    required: true // Format: YYYY-MM-DD (Monday of the week)
  },
  activity: [{
    day: {
      type: String,
      required: true,
      enum: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    hours: {
      type: Number,
      default: 0
    },
    lessons: {
      type: Number,
      default: 0
    }
  }],
  totalHours: {
    type: Number,
    default: 0
  },
  totalLessons: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for efficient queries
userActivitySchema.index({ user: 1, weekStart: 1 });

const UserActivity = mongoose.model('UserActivity', userActivitySchema);

export default UserActivity;

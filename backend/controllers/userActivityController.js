import UserActivity from '../models/UserActivity.js';

// Get week start date (Monday)
const getWeekStart = () => {
  const now = new Date();
  const day = now.getDay();
  const diff = now.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(now.setDate(diff));
  monday.setHours(0, 0, 0, 0);
  return monday.toISOString().split('T')[0];
};

// Get weekly activity
export const getWeeklyActivity = async (req, res) => {
  try {
    const userId = req.user.id;
    const weekStart = getWeekStart();

    let userActivity = await UserActivity.findOne({
      user: userId,
      weekStart: weekStart
    });

    if (!userActivity) {
      // Create default weekly activity for new week
      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      const activity = days.map(day => ({ day, hours: 0, lessons: 0 }));

      userActivity = new UserActivity({
        user: userId,
        weekStart: weekStart,
        activity: activity,
        totalHours: 0,
        totalLessons: 0
      });

      await userActivity.save();
    }

    res.status(200).json({
      success: true,
      activity: userActivity.activity,
      totalHours: userActivity.totalHours,
      totalLessons: userActivity.totalLessons,
      weekStart: userActivity.weekStart
    });
  } catch (error) {
    console.error('Error fetching weekly activity:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch weekly activity',
      error: error.message
    });
  }
};

// Update weekly activity
export const updateWeeklyActivity = async (req, res) => {
  try {
    const userId = req.user.id;
    const weekStart = getWeekStart();
    const { activity } = req.body;

    if (!activity || !Array.isArray(activity)) {
      return res.status(400).json({
        success: false,
        message: 'Activity data is required and must be an array'
      });
    }

    // Calculate totals
    const totalHours = activity.reduce((sum, day) => sum + (day.hours || 0), 0);
    const totalLessons = activity.reduce((sum, day) => sum + (day.lessons || 0), 0);

    let userActivity = await UserActivity.findOne({
      user: userId,
      weekStart: weekStart
    });

    if (userActivity) {
      // Update existing activity
      userActivity.activity = activity;
      userActivity.totalHours = totalHours;
      userActivity.totalLessons = totalLessons;
      await userActivity.save();
    } else {
      // Create new activity record
      userActivity = new UserActivity({
        user: userId,
        weekStart: weekStart,
        activity: activity,
        totalHours: totalHours,
        totalLessons: totalLessons
      });
      await userActivity.save();
    }

    res.status(200).json({
      success: true,
      message: 'Weekly activity updated successfully',
      activity: userActivity.activity,
      totalHours: userActivity.totalHours,
      totalLessons: userActivity.totalLessons
    });
  } catch (error) {
    console.error('Error updating weekly activity:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update weekly activity',
      error: error.message
    });
  }
};

// Track a learning session (add hours and lessons to today)
export const trackLearningSession = async (req, res) => {
  try {
    const userId = req.user.id;
    const weekStart = getWeekStart();
    const { hours, lessons } = req.body;

    if (hours === undefined || lessons === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Hours and lessons are required'
      });
    }

    // Get current day
    const today = new Date().getDay();
    const currentDayIndex = today === 0 ? 6 : today - 1; // Convert to Mon=0, Sun=6
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const currentDay = days[currentDayIndex];

    let userActivity = await UserActivity.findOne({
      user: userId,
      weekStart: weekStart
    });

    if (!userActivity) {
      // Create new activity record
      const activity = days.map(day => ({ day, hours: 0, lessons: 0 }));
      activity[currentDayIndex].hours = hours;
      activity[currentDayIndex].lessons = lessons;

      userActivity = new UserActivity({
        user: userId,
        weekStart: weekStart,
        activity: activity,
        totalHours: hours,
        totalLessons: lessons
      });
    } else {
      // Update today's activity
      const dayActivity = userActivity.activity.find(a => a.day === currentDay);
      if (dayActivity) {
        dayActivity.hours += hours;
        dayActivity.lessons += lessons;
      }

      // Recalculate totals
      userActivity.totalHours = userActivity.activity.reduce((sum, day) => sum + day.hours, 0);
      userActivity.totalLessons = userActivity.activity.reduce((sum, day) => sum + day.lessons, 0);
    }

    await userActivity.save();

    res.status(200).json({
      success: true,
      message: 'Learning session tracked successfully',
      activity: userActivity.activity,
      totalHours: userActivity.totalHours,
      totalLessons: userActivity.totalLessons
    });
  } catch (error) {
    console.error('Error tracking learning session:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to track learning session',
      error: error.message
    });
  }
};

// Get user's all-time statistics
export const getUserStatistics = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get all activities for the user
    const activities = await UserActivity.find({ user: userId });

    const totalHours = activities.reduce((sum, activity) => sum + activity.totalHours, 0);
    const totalLessons = activities.reduce((sum, activity) => sum + activity.totalLessons, 0);
    const totalWeeks = activities.length;

    // Get current streak
    let streak = 0;
    const today = new Date();
    let checkDate = new Date(today);

    for (let i = 0; i < 30; i++) {
      const dayOfWeek = checkDate.getDay();
      const dayIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      
      // Get week start for this date
      const day = checkDate.getDay();
      const diff = checkDate.getDate() - day + (day === 0 ? -6 : 1);
      const monday = new Date(checkDate);
      monday.setDate(diff);
      monday.setHours(0, 0, 0, 0);
      const weekStart = monday.toISOString().split('T')[0];

      const activity = await UserActivity.findOne({
        user: userId,
        weekStart: weekStart
      });

      if (activity) {
        const dayActivity = activity.activity[dayIndex];
        if (dayActivity && dayActivity.hours > 0) {
          streak++;
        } else {
          break;
        }
      } else {
        break;
      }

      checkDate.setDate(checkDate.getDate() - 1);
    }

    res.status(200).json({
      success: true,
      statistics: {
        totalHours: totalHours.toFixed(1),
        totalLessons,
        totalWeeks,
        streak,
        averageHoursPerWeek: totalWeeks > 0 ? (totalHours / totalWeeks).toFixed(1) : 0,
        averageLessonsPerWeek: totalWeeks > 0 ? Math.round(totalLessons / totalWeeks) : 0
      }
    });
  } catch (error) {
    console.error('Error fetching user statistics:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user statistics',
      error: error.message
    });
  }
};

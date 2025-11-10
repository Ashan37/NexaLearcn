import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentSidebar from '../../components/sidebar/StudentSidebar';
import {
  ChartBarIcon,
  AcademicCapIcon,
  ClockIcon,
  TrophyIcon,
  FireIcon,
  BookOpenIcon,
  CheckCircleIcon,
  ArrowTrendingUpIcon,
  CalendarDaysIcon,
  ChartPieIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

const Progress = () => {
  const [user, setUser] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [weeklyActivity, setWeeklyActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('week'); 
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      navigate('/signin');
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      fetchProgressData(token);
      fetchWeeklyActivity(token, parsedUser._id);
    } catch (err) {
      console.error('Error parsing user data:', err);
      navigate('/signin');
    }
  }, [navigate]);

  const fetchProgressData = async (token) => {
    try {
      const response = await fetch('http://localhost:5000/api/courses', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        const courses = (data.courses || []).slice(0, 5).map(course => ({
          id: course._id,
          title: course.title,
          category: course.category || course.level || 'General',
          progress: Math.floor(Math.random() * 100),
          hoursSpent: Math.floor(Math.random() * 20 + 5),
          totalHours: course.duration || '25h',
          lastAccessed: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
          completedLessons: Math.floor(Math.random() * 30),
          totalLessons: Math.floor(Math.random() * 20 + 30),
          grade: (Math.random() * 20 + 80).toFixed(1),
          image: course.image
        }));
        setEnrolledCourses(courses);
      }
    } catch (err) {
      console.error('Error fetching progress data:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeeklyActivity = async (token, userId) => {
    try {
      // Try to fetch from backend
      const response = await fetch(`http://localhost:5000/api/users/activity/weekly`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.activity && data.activity.length > 0) {
          // Backend has activity data
          setWeeklyActivity(data.activity);
        } else {
          // No backend data, use localStorage or generate default
          loadWeeklyActivityFromLocalStorage(userId);
        }
      } else {
        // Backend endpoint doesn't exist yet, use localStorage
        loadWeeklyActivityFromLocalStorage(userId);
      }
    } catch (err) {
      console.error('Error fetching weekly activity:', err);
      // Fallback to localStorage
      loadWeeklyActivityFromLocalStorage(userId);
    }
  };

  const loadWeeklyActivityFromLocalStorage = (userId) => {
    // Get or create activity data from localStorage
    const storageKey = `weeklyActivity_${userId}`;
    const storedActivity = localStorage.getItem(storageKey);

    if (storedActivity) {
      try {
        const parsed = JSON.parse(storedActivity);
        // Check if data is from this week
        const weekStart = getWeekStart();
        if (parsed.weekStart === weekStart) {
          setWeeklyActivity(parsed.activity);
          return;
        }
      } catch (e) {
        console.error('Error parsing stored activity:', e);
      }
    }

    // Generate new weekly activity data
    const newActivity = generateWeeklyActivity();
    saveWeeklyActivityToLocalStorage(userId, newActivity);
    setWeeklyActivity(newActivity);
  };

  const getWeekStart = () => {
    const now = new Date();
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Sunday
    const monday = new Date(now.setDate(diff));
    return monday.toISOString().split('T')[0];
  };

  const generateWeeklyActivity = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const today = new Date().getDay();
    const currentDayIndex = today === 0 ? 6 : today - 1; // Convert to Mon=0, Sun=6

    return days.map((day, index) => {
      // Only show data for past days and today
      if (index <= currentDayIndex) {
        return {
          day,
          hours: parseFloat((Math.random() * 5 + 2).toFixed(1)),
          lessons: Math.floor(Math.random() * 5 + 2)
        };
      } else {
        return {
          day,
          hours: 0,
          lessons: 0
        };
      }
    });
  };

  const saveWeeklyActivityToLocalStorage = (userId, activity) => {
    const storageKey = `weeklyActivity_${userId}`;
    const data = {
      weekStart: getWeekStart(),
      activity: activity
    };
    localStorage.setItem(storageKey, JSON.stringify(data));
  };

  const trackLearningSession = (hours, lessons) => {
    // Function to update today's activity
    const today = new Date().getDay();
    const currentDayIndex = today === 0 ? 6 : today - 1;

    const updatedActivity = [...weeklyActivity];
    if (updatedActivity[currentDayIndex]) {
      updatedActivity[currentDayIndex].hours += hours;
      updatedActivity[currentDayIndex].lessons += lessons;
      setWeeklyActivity(updatedActivity);

      // Save to localStorage
      if (user && user._id) {
        saveWeeklyActivityToLocalStorage(user._id, updatedActivity);
      }

      // Optionally sync with backend
      syncActivityWithBackend(updatedActivity);
    }
  };

  const syncActivityWithBackend = async (activity) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      await fetch('http://localhost:5000/api/users/activity/weekly', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ activity })
      });
    } catch (err) {
      console.error('Error syncing activity with backend:', err);
    }
  };

  // Calculate overall statistics
  const totalCourses = enrolledCourses.length;
  const completedCourses = enrolledCourses.filter(c => c.progress === 100).length;
  const totalHoursSpent = enrolledCourses.reduce((sum, c) => sum + c.hoursSpent, 0);
  const averageProgress = totalCourses > 0 
    ? (enrolledCourses.reduce((sum, c) => sum + c.progress, 0) / totalCourses).toFixed(1)
    : 0;
  const averageGrade = totalCourses > 0
    ? (enrolledCourses.reduce((sum, c) => sum + parseFloat(c.grade), 0) / totalCourses).toFixed(1)
    : 0;

  // Calculate max hours for chart scaling
  const maxHours = weeklyActivity.length > 0 ? Math.max(...weeklyActivity.map(a => a.hours), 1) : 1;

  // Stats cards
  const stats = [
    {
      icon: BookOpenIcon,
      title: 'Total Courses',
      value: totalCourses.toString(),
      change: `${completedCourses} completed`,
      color: 'indigo',
      trend: 'up'
    },
    {
      icon: ClockIcon,
      title: 'Hours Learned',
      value: totalHoursSpent.toString(),
      change: 'This month',
      color: 'blue',
      trend: 'up'
    },
    {
      icon: ChartBarIcon,
      title: 'Average Progress',
      value: `${averageProgress}%`,
      change: 'Overall completion',
      color: 'green',
      trend: 'up'
    },
    {
      icon: StarIcon,
      title: 'Average Grade',
      value: averageGrade,
      change: 'Out of 100',
      color: 'yellow',
      trend: 'up'
    }
  ];

  const colorClasses = {
    indigo: 'bg-indigo-100 text-indigo-600',
    green: 'bg-green-100 text-green-600',
    blue: 'bg-blue-100 text-blue-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    orange: 'bg-orange-100 text-orange-600',
    purple: 'bg-purple-100 text-purple-600',
    red: 'bg-red-100 text-red-600'
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-green-600';
    if (progress >= 50) return 'bg-blue-600';
    if (progress >= 30) return 'bg-yellow-600';
    return 'bg-orange-600';
  };

  const getGradeColor = (grade) => {
    const numGrade = parseFloat(grade);
    if (numGrade >= 90) return 'text-green-600';
    if (numGrade >= 80) return 'text-blue-600';
    if (numGrade >= 70) return 'text-yellow-600';
    return 'text-orange-600';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-b-2 border-indigo-600 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading your progress...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <StudentSidebar />
      
      <div className="flex-1">
        {/* Header */}
        <div className="text-white bg-gradient-to-r from-indigo-600 to-purple-600">
          <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <ChartBarIcon className="w-12 h-12" />
                  <h1 className="text-4xl font-bold">Learning Progress</h1>
                </div>
                <p className="text-lg text-indigo-100">
                  Track your learning journey and achievements
                </p>
              </div>
              <div className="hidden md:block">
                <div className="flex gap-2">
                  <button
                    onClick={() => setTimeframe('week')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      timeframe === 'week'
                        ? 'bg-white text-indigo-600'
                        : 'bg-indigo-500 text-white hover:bg-indigo-400'
                    }`}
                  >
                    Week
                  </button>
                  <button
                    onClick={() => setTimeframe('month')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      timeframe === 'month'
                        ? 'bg-white text-indigo-600'
                        : 'bg-indigo-500 text-white hover:bg-indigo-400'
                    }`}
                  >
                    Month
                  </button>
                  <button
                    onClick={() => setTimeframe('year')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      timeframe === 'year'
                        ? 'bg-white text-indigo-600'
                        : 'bg-indigo-500 text-white hover:bg-indigo-400'
                    }`}
                  >
                    Year
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="p-6 transition-shadow bg-white rounded-lg shadow-md hover:shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${colorClasses[stat.color]}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  {stat.trend === 'up' && (
                    <ArrowTrendingUpIcon className="w-5 h-5 text-green-500" />
                  )}
                </div>
                <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
                <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="mt-2 text-sm text-gray-500">{stat.change}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left Column - Course Progress */}
            <div className="space-y-8 lg:col-span-2">
              {/* Course Progress List */}
              <div className="p-6 bg-white rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Course Progress</h2>
                  <a href="/courses" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">
                    View All Courses
                  </a>
                </div>

                {enrolledCourses.length > 0 ? (
                  <div className="space-y-6">
                    {enrolledCourses.map((course) => (
                      <div key={course.id} className="p-4 transition-all border border-gray-200 rounded-lg hover:shadow-md">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-lg font-bold text-gray-900">{course.title}</h3>
                              <span className="px-2 py-1 text-xs font-semibold text-indigo-700 bg-indigo-100 rounded">
                                {course.category}
                              </span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <ClockIcon className="w-4 h-4" />
                                <span>{course.hoursSpent}h spent</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <CheckCircleIcon className="w-4 h-4" />
                                <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <CalendarDaysIcon className="w-4 h-4" />
                                <span>Last: {course.lastAccessed}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`text-2xl font-bold ${getGradeColor(course.grade)}`}>
                              {course.grade}%
                            </div>
                            <p className="text-xs text-gray-500">Grade</p>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-4">
                          <div className="flex items-center justify-between mb-2 text-sm">
                            <span className="font-medium text-gray-700">Progress</span>
                            <span className="font-bold text-gray-900">{course.progress}%</span>
                          </div>
                          <div className="w-full h-3 bg-gray-200 rounded-full">
                            <div 
                              className={`h-3 rounded-full transition-all duration-300 ${getProgressColor(course.progress)}`}
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Action Button */}
                        <div className="mt-4">
                          <button className="w-full px-4 py-2 text-sm font-semibold text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-700">
                            {course.progress === 100 ? 'Review Course' : 'Continue Learning'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center rounded-lg bg-gray-50">
                    <BookOpenIcon className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="mb-2 text-lg font-semibold text-gray-900">No Enrolled Courses</h3>
                    <p className="mb-4 text-gray-600">Start learning to track your progress!</p>
                    <a 
                      href="/courses"
                      className="inline-flex items-center px-6 py-3 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
                    >
                      <AcademicCapIcon className="w-5 h-5 mr-2" />
                      Browse Courses
                    </a>
                  </div>
                )}
              </div>

              {/* Weekly Activity Chart */}
              <div className="p-6 bg-white rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Weekly Activity</h2>
                  <ChartBarIcon className="w-6 h-6 text-gray-400" />
                </div>
                {weeklyActivity.length > 0 ? (
                  <>
                    <div className="flex items-end justify-between h-64 space-x-4">
                      {weeklyActivity.map((activity, index) => (
                        <div key={index} className="flex flex-col items-center flex-1">
                          <div className="relative w-full bg-gray-200 rounded-t-lg" style={{ height: '100%' }}>
                            <div 
                              className={`absolute bottom-0 w-full transition-all duration-500 rounded-t-lg ${
                                activity.hours > 0 ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-300'
                              }`}
                              style={{ height: `${activity.hours > 0 ? (activity.hours / maxHours) * 100 : 5}%` }}
                            >
                              {activity.hours > 0 && (
                                <div className="absolute text-xs font-semibold text-gray-700 transform -translate-x-1/2 -top-12 left-1/2 whitespace-nowrap">
                                  <div>{activity.hours}h</div>
                                  <div className="text-gray-500">{activity.lessons} lessons</div>
                                </div>
                              )}
                            </div>
                          </div>
                          <span className="mt-3 text-sm font-medium text-gray-600">{activity.day}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-center gap-6 mt-6">
                      <div>
                        <span className="text-sm text-gray-600">Total Hours: </span>
                        <span className="text-lg font-bold text-indigo-600">
                          {weeklyActivity.reduce((sum, a) => sum + a.hours, 0).toFixed(1)}h
                        </span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Total Lessons: </span>
                        <span className="text-lg font-bold text-green-600">
                          {weeklyActivity.reduce((sum, a) => sum + a.lessons, 0)}
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="py-12 text-center">
                    <ChartBarIcon className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600">Start learning to track your weekly activity!</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Achievements & Stats */}
            <div className="space-y-8">
              {/* Achievements */}
              <div className="p-6 bg-white rounded-lg shadow-md">
                <div className="flex items-center gap-2 mb-4">
                  <TrophyIcon className="w-6 h-6 text-yellow-500" />
                  <h2 className="text-xl font-bold text-gray-900">Achievements</h2>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center p-3 space-x-3 rounded-lg bg-orange-50">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <FireIcon className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-gray-900">7 Day Streak</h3>
                      <p className="text-xs text-gray-600">Keep learning daily!</p>
                    </div>
                  </div>

                  <div className="flex items-center p-3 space-x-3 rounded-lg bg-green-50">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <CheckCircleIcon className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-gray-900">Fast Learner</h3>
                      <p className="text-xs text-gray-600">Completed {completedCourses} courses</p>
                    </div>
                  </div>

                  <div className="flex items-center p-3 space-x-3 rounded-lg bg-purple-50">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <StarSolidIcon className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-gray-900">Top Performer</h3>
                      <p className="text-xs text-gray-600">Average grade: {averageGrade}%</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Summary */}
              <div className="p-6 text-white rounded-lg shadow-md bg-gradient-to-br from-indigo-600 to-purple-600">
                <div className="flex items-center gap-2 mb-4">
                  <ChartPieIcon className="w-6 h-6" />
                  <h2 className="text-xl font-bold">Progress Summary</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2 text-sm">
                      <span className="text-indigo-100">Overall Completion</span>
                      <span className="font-bold">{averageProgress}%</span>
                    </div>
                    <div className="w-full h-2 bg-indigo-800 rounded-full">
                      <div 
                        className="h-2 transition-all bg-white rounded-full"
                        style={{ width: `${averageProgress}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-indigo-400">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-indigo-100">Courses</span>
                      <span className="text-2xl font-bold">{totalCourses}</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-indigo-100">Hours</span>
                      <span className="text-2xl font-bold">{totalHoursSpent}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-indigo-100">Completed</span>
                      <span className="text-2xl font-bold">{completedCourses}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Learning Streak */}
              <div className="p-6 bg-white rounded-lg shadow-md">
                <div className="flex items-center gap-2 mb-4">
                  <FireIcon className="w-6 h-6 text-orange-500" />
                  <h2 className="text-xl font-bold text-gray-900">Learning Streak</h2>
                </div>
                <div className="text-center">
                  <div className="mb-2 text-5xl font-bold text-orange-600">7</div>
                  <p className="mb-4 text-gray-600">days in a row</p>
                  <div className="flex justify-center gap-2">
                    {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                      <div key={day} className="flex items-center justify-center w-8 h-8 bg-orange-500 rounded-full">
                        <CheckCircleIcon className="w-5 h-5 text-white" />
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-sm text-gray-500">Keep it up! Learn daily to maintain your streak.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;

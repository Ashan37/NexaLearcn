import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentSidebar from '../components/sidebar/StudentSidebar';
import {
  AcademicCapIcon,
  BookOpenIcon,
  ChartBarIcon,
  ClockIcon,
  TrophyIcon,
  SparklesIcon,
  PlayCircleIcon,
  CheckCircleIcon,
  FireIcon,
  BellIcon,
  Cog6ToothIcon,
  ArrowTrendingUpIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [learningActivity, setLearningActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      navigate('/signin');
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      fetchUserData(token);
      fetchEnrolledCourses(token);
      fetchRecommendedCourses(token);
      generateLearningActivity();
    } catch (err) {
      console.error('Error parsing user data:', err);
      navigate('/signin');
    }
  }, [navigate]);

  const fetchUserData = async (token) => {
    try {
      // You can create a dedicated endpoint for user dashboard data
      // For now, we'll use the stored user data and enhance it
      setLoading(false);
    } catch (err) {
      console.error('Error fetching user data:', err);
      setError('Failed to load user data');
      setLoading(false);
    }
  };

  const fetchEnrolledCourses = async (token) => {
    try {
      // Fetch all courses and filter for demo purposes
      // In production, you'd have an endpoint like /api/users/enrolled-courses
      const response = await fetch('http://localhost:5000/api/courses', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        // For demo, take first 3 courses as "enrolled"
        setEnrolledCourses((data.courses || []).slice(0, 3));
      }
    } catch (err) {
      console.error('Error fetching courses:', err);
    }
  };

  const fetchRecommendedCourses = async (token) => {
    try {
      const response = await fetch('http://localhost:5000/api/courses', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        const allCourses = data.courses || [];
        
        // Get random 2 courses for recommendations (excluding enrolled ones)
        const enrolledIds = enrolledCourses.map(c => c._id);
        const availableCourses = allCourses.filter(c => !enrolledIds.includes(c._id));
        
        // Shuffle and take 2
        const shuffled = availableCourses.sort(() => 0.5 - Math.random());
        const recommended = shuffled.slice(0, 2).map(course => ({
          id: course._id,
          title: course.title,
          instructor: course.instructor || 'Expert Instructor',
          rating: (4.5 + Math.random() * 0.5).toFixed(1), // Generate rating between 4.5-5.0
          students: Math.floor(Math.random() * 50000 + 5000).toLocaleString(),
          duration: course.duration || '15h',
          level: course.level ? course.level.charAt(0).toUpperCase() + course.level.slice(1) : 'Intermediate',
          description: course.description,
          image: course.image
        }));

        setRecommendedCourses(recommended);
      }
    } catch (err) {
      console.error('Error fetching recommended courses:', err);
    }
  };

  const generateLearningActivity = () => {
    // Generate realistic learning activity data for the past week
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const activity = days.map(day => ({
      day,
      hours: parseFloat((Math.random() * 5 + 2).toFixed(1)) // Random hours between 2-7
    }));
    setLearningActivity(activity);
  };


  // Calculate stats from real data
  const stats = [
    {
      icon: BookOpenIcon,
      title: 'Courses Enrolled',
      value: enrolledCourses.length.toString(),
      change: user ? 'Active learner' : 'Loading...',
      color: 'indigo'
    },
    {
      icon: CheckCircleIcon,
      title: 'Completed',
      value: '0',
      change: 'Start learning today',
      color: 'green'
    },
    {
      icon: ClockIcon,
      title: 'Learning Hours',
      value: '0',
      change: 'Track your progress',
      color: 'blue'
    },
    {
      icon: TrophyIcon,
      title: 'Certificates',
      value: '0',
      change: 'Complete courses to earn',
      color: 'yellow'
    }
  ];

  // Transform enrolled courses to display format
  const activeCourses = enrolledCourses.map((course, index) => ({
    id: course._id,
    title: course.title,
    instructor: course.instructor || 'Instructor',
    progress: Math.floor(Math.random() * 100), // Random progress for demo
    thumbnail: course.image || `https://via.placeholder.com/300x200/4F46E5/FFFFFF?text=${encodeURIComponent(course.title.substring(0, 20))}`,
    nextLesson: 'Continue Learning',
    duration: course.duration || 'Self-paced',
    category: course.category || course.level || 'General'
  }));

  const achievements = [
    {
      title: 'Fast Learner',
      description: 'Completed 5 courses this month',
      icon: FireIcon,
      date: '2 days ago',
      color: 'orange'
    },
    {
      title: 'Consistent Learner',
      description: '7 day learning streak',
      icon: TrophyIcon,
      date: '5 days ago',
      color: 'yellow'
    },
    {
      title: 'AI Expert',
      description: 'Completed ML specialization',
      icon: SparklesIcon,
      date: '1 week ago',
      color: 'purple'
    }
  ];

  const maxHours = learningActivity.length > 0 ? Math.max(...learningActivity.map(a => a.hours)) : 1;
  const totalWeeklyHours = learningActivity.reduce((sum, a) => sum + a.hours, 0);

  const colorClasses = {
    indigo: 'bg-indigo-100 text-indigo-600',
    green: 'bg-green-100 text-green-600',
    blue: 'bg-blue-100 text-blue-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    orange: 'bg-orange-100 text-orange-600',
    purple: 'bg-purple-100 text-purple-600'
  };

  const handleAIChat = () => {
    navigate('/ai');
  };

  const handleContinueCourse = (courseId) => {
    // Navigate to course detail page or learning interface
    alert(`Course learning interface coming soon! Course ID: ${courseId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-b-2 border-indigo-600 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
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
        <div className="bg-white border-b border-gray-200">
        <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user.name}! 👋
              </h1>
              <p className="mt-1 text-gray-600">
                {user.email} • Member since {new Date(user.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </p>
            </div>
            <div className="flex items-center mt-4 space-x-4 md:mt-0">
              <button className="p-2 text-gray-600 transition-colors rounded-lg hover:text-gray-900 hover:bg-gray-100">
                <BellIcon className="w-6 h-6" />
              </button>
              <button className="p-2 text-gray-600 transition-colors rounded-lg hover:text-gray-900 hover:bg-gray-100">
                <Cog6ToothIcon className="w-6 h-6" />
              </button>
              <button className="p-2 text-gray-600 transition-colors rounded-lg hover:text-gray-900 hover:bg-gray-100">
                <UserCircleIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="p-6 transition-shadow bg-white rounded-lg shadow-md hover:shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${colorClasses[stat.color]}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <ArrowTrendingUpIcon className="w-5 h-5 text-green-500" />
              </div>
              <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
              <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
              <p className="mt-2 text-sm text-gray-500">{stat.change}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">

          <div className="space-y-8 lg:col-span-2">

            <div className="p-6 bg-white rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {activeCourses.length > 0 ? 'Continue Learning' : 'Start Learning'}
                </h2>
                <a href="/courses" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">
                  Browse Courses
                </a>
              </div>
              {activeCourses.length > 0 ? (
                <div className="space-y-6">
                  {activeCourses.map((course) => (
                    <div key={course.id} className="overflow-hidden transition-shadow border border-gray-200 rounded-lg hover:shadow-lg">
                      <div className="flex flex-col sm:flex-row">
                        <img 
                          src={course.thumbnail} 
                          alt={course.title}
                          className="object-cover w-full h-32 sm:w-48"
                        />
                        <div className="flex-1 p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <span className="inline-block px-2 py-1 mb-2 text-xs font-semibold text-indigo-700 bg-indigo-100 rounded">
                                {course.category}
                              </span>
                              <h3 className="text-lg font-bold text-gray-900">{course.title}</h3>
                              <p className="text-sm text-gray-600">by {course.instructor}</p>
                            </div>
                          </div>
                          <div className="mt-3">
                            <div className="flex items-center justify-between mb-2 text-sm">
                              <span className="text-gray-600">Progress</span>
                              <span className="font-semibold text-gray-900">{course.progress}%</span>
                            </div>
                            <div className="w-full h-2 mb-3 bg-gray-200 rounded-full">
                              <div 
                                className="h-2 transition-all duration-300 bg-indigo-600 rounded-full"
                                style={{ width: `${course.progress}%` }}
                              ></div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center text-sm text-gray-600">
                                <ClockIcon className="w-4 h-4 mr-1" />
                                {course.duration}
                              </div>
                              <button 
                                onClick={() => handleContinueCourse(course.id)}
                                className="flex items-center px-4 py-2 text-sm font-semibold text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-700"
                              >
                                <PlayCircleIcon className="w-5 h-5 mr-2" />
                                Continue
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center rounded-lg bg-gray-50">
                  <BookOpenIcon className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">No Enrolled Courses Yet</h3>
                  <p className="mb-4 text-gray-600">Start your learning journey by enrolling in a course!</p>
                  <a 
                    href="/courses"
                    className="inline-flex items-center px-6 py-3 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
                  >
                    <AcademicCapIcon className="w-5 h-5 mr-2" />
                    Explore Courses
                  </a>
                </div>
              )}
            </div>

            <div className="p-6 bg-white rounded-lg shadow-md">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">Weekly Learning Activity</h2>
              {learningActivity.length > 0 ? (
                <>
                  <div className="flex items-end justify-between h-64 space-x-4">
                    {learningActivity.map((activity, index) => (
                      <div key={index} className="flex flex-col items-center flex-1">
                        <div className="relative w-full bg-gray-200 rounded-t-lg" style={{ height: '100%' }}>
                          <div 
                            className="absolute bottom-0 w-full transition-all duration-500 bg-indigo-600 rounded-t-lg hover:bg-indigo-700"
                            style={{ height: `${(activity.hours / maxHours) * 100}%` }}
                          >
                            <span className="absolute text-sm font-semibold text-gray-700 transform -translate-x-1/2 -top-8 left-1/2">
                              {activity.hours}h
                            </span>
                          </div>
                        </div>
                        <span className="mt-3 text-sm font-medium text-gray-600">{activity.day}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-center mt-6">
                    <span className="text-sm text-gray-600">Total this week: </span>
                    <span className="ml-2 text-lg font-bold text-indigo-600">
                      {totalWeeklyHours.toFixed(1)} hours
                    </span>
                  </div>
                </>
              ) : (
                <div className="py-12 text-center">
                  <ChartBarIcon className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600">Start learning to track your activity!</p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-8">

            <div className="p-6 bg-white rounded-lg shadow-md">
              <h2 className="mb-4 text-xl font-bold text-gray-900">Recent Achievements</h2>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start p-3 space-x-3 transition-colors rounded-lg bg-gray-50 hover:bg-gray-100">
                    <div className={`p-2 rounded-lg ${colorClasses[achievement.color]}`}>
                      <achievement.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-gray-900">{achievement.title}</h3>
                      <p className="mt-1 text-xs text-gray-600">{achievement.description}</p>
                      <p className="mt-1 text-xs text-gray-500">{achievement.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 text-white rounded-lg shadow-md bg-gradient-to-br from-indigo-600 to-purple-600">
              <div className="flex items-center mb-4">
                <SparklesIcon className="w-8 h-8 mr-3" />
                <h2 className="text-xl font-bold">AI Learning Assistant</h2>
              </div>
              <p className="mb-4 text-sm text-indigo-100">
                Get instant help with your courses, personalized recommendations, and study tips.
              </p>
              <button 
                onClick={handleAIChat}
                className="w-full px-4 py-3 font-semibold text-indigo-600 transition-colors bg-white rounded-lg hover:bg-indigo-50"
              >
                Start AI Chat
              </button>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-md">
              <h2 className="mb-4 text-xl font-bold text-gray-900">Recommended for You</h2>
              {recommendedCourses.length > 0 ? (
                <div className="space-y-4">
                  {recommendedCourses.map((course, index) => (
                    <div key={course.id || index} className="p-4 transition-all border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md">
                      <h3 className="mb-2 text-sm font-semibold text-gray-900 line-clamp-2">{course.title}</h3>
                      <p className="mb-3 text-xs text-gray-600">by {course.instructor}</p>
                      <div className="flex items-center justify-between mb-3 text-xs text-gray-600">
                        <span className="flex items-center">
                          ⭐ {course.rating}
                        </span>
                        <span>{course.students} students</span>
                      </div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2 py-1 text-xs text-gray-700 bg-gray-100 rounded">
                          {course.level}
                        </span>
                        <span className="text-xs text-gray-600">{course.duration}</span>
                      </div>
                      <a 
                        href="/courses"
                        className="block w-full px-4 py-2 text-sm font-semibold text-center text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-700"
                      >
                        Enroll Now
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center">
                  <AcademicCapIcon className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                  <p className="text-sm text-gray-600">Loading recommendations...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Dashboard;

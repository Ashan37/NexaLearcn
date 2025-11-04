import React, { useState } from 'react';

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


  const stats = [
    {
      icon: BookOpenIcon,
      title: 'Courses Enrolled',
      value: '8',
      change: '+2 this month',
      color: 'indigo'
    },
    {
      icon: CheckCircleIcon,
      title: 'Completed',
      value: '5',
      change: '62.5% completion',
      color: 'green'
    },
    {
      icon: ClockIcon,
      title: 'Learning Hours',
      value: '47.5',
      change: '+12.5 hrs this week',
      color: 'blue'
    },
    {
      icon: TrophyIcon,
      title: 'Certificates',
      value: '5',
      change: '3 pending',
      color: 'yellow'
    }
  ];

  const activeCourses = [
    {
      id: 1,
      title: 'Advanced React & TypeScript',
      instructor: 'Sarah Johnson',
      progress: 75,
      thumbnail: 'https://via.placeholder.com/300x200/4F46E5/FFFFFF?text=React+Course',
      nextLesson: 'Custom Hooks Deep Dive',
      duration: '2h 30m remaining',
      category: 'Development'
    },
    {
      id: 2,
      title: 'Machine Learning Fundamentals',
      instructor: 'Dr. Michael Chen',
      progress: 45,
      thumbnail: 'https://via.placeholder.com/300x200/7C3AED/FFFFFF?text=ML+Course',
      nextLesson: 'Neural Networks Basics',
      duration: '6h 15m remaining',
      category: 'AI & ML'
    },
    {
      id: 3,
      title: 'UI/UX Design Mastery',
      instructor: 'Emily Rodriguez',
      progress: 30,
      thumbnail: 'https://via.placeholder.com/300x200/EC4899/FFFFFF?text=Design+Course',
      nextLesson: 'Design Systems',
      duration: '8h 45m remaining',
      category: 'Design'
    }
  ];

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

  const recommendedCourses = [
    {
      title: 'Advanced AI Chat Development',
      instructor: 'Alex Thompson',
      rating: 4.9,
      students: '12,450',
      duration: '15h',
      level: 'Advanced'
    },
    {
      title: 'Data Structures & Algorithms',
      instructor: 'James Wilson',
      rating: 4.8,
      students: '23,890',
      duration: '20h',
      level: 'Intermediate'
    }
  ];


  const learningActivity = [
    { day: 'Mon', hours: 4.5 },
    { day: 'Tue', hours: 6.2 },
    { day: 'Wed', hours: 3.8 },
    { day: 'Thu', hours: 7.5 },
    { day: 'Fri', hours: 5.0 },
    { day: 'Sat', hours: 8.2 },
    { day: 'Sun', hours: 4.0 }
  ];

  const maxHours = Math.max(...learningActivity.map(a => a.hours));

  const colorClasses = {
    indigo: 'bg-indigo-100 text-indigo-600',
    green: 'bg-green-100 text-green-600',
    blue: 'bg-blue-100 text-blue-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    orange: 'bg-orange-100 text-orange-600',
    purple: 'bg-purple-100 text-purple-600'
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="bg-white border-b border-gray-200">
        <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
              <p className="mt-1 text-gray-600">Welcome back! Continue your learning journey</p>
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
                <h2 className="text-2xl font-bold text-gray-900">Continue Learning</h2>
                <a href="#" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">
                  View All
                </a>
              </div>
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
                            <button className="flex items-center px-4 py-2 text-sm font-semibold text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-700">
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
            </div>

            <div className="p-6 bg-white rounded-lg shadow-md">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">Weekly Learning Activity</h2>
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
                  {learningActivity.reduce((sum, a) => sum + a.hours, 0).toFixed(1)} hours
                </span>
              </div>
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
              <button className="w-full px-4 py-3 font-semibold text-indigo-600 transition-colors bg-white rounded-lg hover:bg-indigo-50">
                Start AI Chat
              </button>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-md">
              <h2 className="mb-4 text-xl font-bold text-gray-900">Recommended for You</h2>
              <div className="space-y-4">
                {recommendedCourses.map((course, index) => (
                  <div key={index} className="p-4 transition-all border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md">
                    <h3 className="mb-2 text-sm font-semibold text-gray-900">{course.title}</h3>
                    <p className="mb-3 text-xs text-gray-600">by {course.instructor}</p>
                    <div className="flex items-center justify-between mb-3 text-xs text-gray-600">
                      <span className="flex items-center">
                        ⭐ {course.rating}
                      </span>
                      <span>{course.students} students</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-1 text-xs text-gray-700 bg-gray-100 rounded">
                        {course.level}
                      </span>
                      <span className="text-xs text-gray-600">{course.duration}</span>
                    </div>
                    <button className="w-full px-4 py-2 mt-3 text-sm font-semibold text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-700">
                      Enroll Now
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

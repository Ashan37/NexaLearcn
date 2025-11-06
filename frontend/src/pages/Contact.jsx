import React, { useState } from 'react';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  PaperAirplaneIcon,
  UserIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setSuccess('Thank you for contacting us! We will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setLoading(false);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: EnvelopeIcon,
      title: 'Email Us',
      details: 'support@nexalearn.com',
      subdetails: 'info@nexalearn.com',
      color: 'indigo'
    },
    {
      icon: PhoneIcon,
      title: 'Call Us',
      details: '+94 11 123-4567',
      subdetails: 'Mon-Fri, 9AM-6PM EST',
      color: 'indigo'
    },
    {
      icon: MapPinIcon,
      title: 'Visit Us',
      details: '123 JohnStreet',
      subdetails: 'Colombo, Sri Lanka',
      color: 'indigo'
    },
    {
      icon: ClockIcon,
      title: 'Business Hours',
      details: 'Monday - Friday',
      subdetails: '9:00 AM - 6:00 PM EST',
      color: 'indigo'
    }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: '📘', url: '#' },
    { name: 'Twitter', icon: '🐦', url: '#' },
    { name: 'LinkedIn', icon: '💼', url: '#' },
    { name: 'Instagram', icon: '📷', url: '#' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="text-white bg-gradient-to-r from-indigo-600 to-indigo-800">
        <div className="px-4 py-24 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <ChatBubbleLeftRightIcon className="w-16 h-16 mx-auto mb-6 text-indigo-200" />
            <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
              Get In Touch
            </h1>
            <p className="max-w-3xl mx-auto text-xl text-indigo-100 md:text-2xl">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </div>

 
      <div className="px-4 mx-auto -mt-12 max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 mb-16 md:grid-cols-2 lg:grid-cols-4">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="p-6 transition-shadow duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl"
            >
              <div className="flex items-center justify-center w-12 h-12 mb-4 bg-indigo-100 rounded-lg">
                <info.icon className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-gray-900">
                {info.title}
              </h3>
              <p className="font-medium text-gray-700">{info.details}</p>
              <p className="mt-1 text-sm text-gray-500">{info.subdetails}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">

          <div className="p-8 bg-white rounded-lg shadow-lg">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">
              Send Us a Message
            </h2>
            <p className="mb-8 text-gray-600">
              Fill out the form below and our team will get back to you within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-200">
                  <UserIcon className="w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Ethan Hunt"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full text-gray-900 placeholder-gray-400 bg-transparent focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-200">
                  <EnvelopeIcon className="w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    placeholder="ethan@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full text-gray-900 placeholder-gray-400 bg-transparent focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Subject
                </label>
                <div className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-200">
                  <ChatBubbleLeftRightIcon className="w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="subject"
                    placeholder="How can we help you?"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full text-gray-900 placeholder-gray-400 bg-transparent focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  name="message"
                  rows="6"
                  placeholder="Tell us more about your inquiry..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-3 text-gray-900 placeholder-gray-400 border border-gray-300 rounded-lg resize-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                ></textarea>
              </div>

              {error && (
                <div className="p-3 text-sm text-red-600 border border-red-200 rounded-lg bg-red-50">
                  {error}
                </div>
              )}

              {success && (
                <div className="p-3 text-sm text-green-600 border border-green-200 rounded-lg bg-green-50">
                  {success}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center w-full gap-2 py-3 font-semibold text-white transition-all duration-200 bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-400 disabled:cursor-not-allowed"
              >
                {loading ? (
                  'Sending...'
                ) : (
                  <>
                    <PaperAirplaneIcon className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="space-y-8">
  
            <div className="p-8 bg-white rounded-lg shadow-lg">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="mb-2 font-semibold text-gray-900">
                    What are your response times?
                  </h3>
                  <p className="text-sm text-gray-600">
                    We typically respond to all inquiries within 24 hours during business days.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-gray-900">
                    Do you offer phone support?
                  </h3>
                  <p className="text-sm text-gray-600">
                    Yes! You can reach our support team at +1 (555) 123-4567 during business hours.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-gray-900">
                    Can I schedule a demo?
                  </h3>
                  <p className="text-sm text-gray-600">
                    Absolutely! Mention it in your message and we'll arrange a personalized demo for you.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8 text-white bg-indigo-600 rounded-lg shadow-lg">
              <h2 className="mb-4 text-2xl font-bold">Connect With Us</h2>
              <p className="mb-6 text-indigo-100">
                Follow us on social media for updates, tips, and community highlights.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className="flex items-center gap-3 p-3 transition-colors bg-indigo-700 rounded-lg hover:bg-indigo-800"
                  >
                    <span className="text-2xl">{social.icon}</span>
                    <span className="font-medium">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="p-8 bg-white rounded-lg shadow-lg">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Our Location
              </h2>
              <div className="flex items-center justify-center w-full h-64 bg-gray-200 rounded-lg">
                <div className="text-center">
                  <MapPinIcon className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                  <p className="font-medium text-gray-600">123 John Street</p>
                  <p className="text-sm text-gray-500">Colombo, Sri Lanka</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;

import React, { useState } from 'react';
import { Calendar, Clock, BookOpen, Check } from 'lucide-react';
import './BookingForm.css' ;
const BookingForm = ({ roomId }) => {
  const [formData, setFormData] = useState({
    user: 1, // replace with dynamic user id
    room: roomId,
    date: '',
    start_time: '',
    end_time: '',
    purpose: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [bookingDetails, setBookingDetails] = useState(null);

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://127.0.0.1:8000/api/uni/bookings/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        setBookingDetails(data);
        setSuccess(true);
      } else {
        setError(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  // Success message component
  if (success) {
    return (
      <div className="max-w-md mx-auto my-8 p-6 bg-green-50 rounded-lg shadow-lg border-2 border-green-200">
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="bg-green-100 p-3 rounded-full mb-4">
            <Check className="h-12 w-12 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-green-700 mb-2">Booking Successful!</h2>
          <p className="text-green-600 text-center mb-4">
            Your room has been booked successfully.
          </p>
        </div>

        {/* Booking Details */}
        <div className="bg-white p-4 rounded-lg border border-green-200 mb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Booking Details</h3>
          <div className="space-y-2 text-gray-700">
            <p><span className="font-medium">Date:</span> {formData.date}</p>
            <p><span className="font-medium">Time:</span> {formData.start_time} - {formData.end_time}</p>
            <p><span className="font-medium">Purpose:</span> {formData.purpose}</p>
            <p><span className="font-medium">Booking ID:</span> {bookingDetails?.id || 'Generated'}</p>
          </div>
        </div>

        <button
          onClick={() => setSuccess(false)}
          className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
        >
          <BookOpen className="h-5 w-11 mr-2 " />

<div className="book-again-wrapper">
  <button className="book-again-button">
    <span className="book-again-text">Book Again</span>
    <div className="new-badge">
      <span>New</span>
    </div>
  </button>
</div>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-lg shadow-lg border border-blue-100">
      <div className="flex items-center justify-center mb-6">
        <div className="bg-blue-100 p-3 rounded-full">
          <BookOpen className="h-8 w-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-blue-700 ml-3">Book Room</h2>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="pl-10 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
            <div className="relative">
              <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="time"
                name="start_time"
                value={formData.start_time}
                onChange={handleChange}
                required
                className="pl-10 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
            <div className="relative">
              <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="time"
                name="end_time"
                value={formData.end_time}
                onChange={handleChange}
                required
                className="pl-10 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Purpose</label>
          <textarea
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            required
            rows={3}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Please describe the purpose of your booking..."
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Processing...' : 'Book Room'}
        </button>
      </div>
    </div>
  );
};

export default BookingForm;
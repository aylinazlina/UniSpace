import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import React from 'react';
import './Routine.css';

const Routine = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [authError, setAuthError] = useState(false);

  useEffect(() => {
    const fetchRoutines = async () => {
      try {
        const fullURL = `/api/uni/rooms/${id}/routines/`;
        console.log("Fetching routines from:", fullURL);
        console.log("Current origin:", window.location.origin);

        // Check if token exists
        const token = localStorage.getItem('access_token');
        if (!token) {
          console.log("No access token found - continuing as request may not require auth");
        }

        // Log the full request URL being constructed
        console.log("Full request URL:", window.location.origin + fullURL);

        // Try fetching with axios instance
        const response = await axiosInstance.get(fullURL);

        console.log("Routine API response:", response);

        if (Array.isArray(response.data)) {
          console.log(`Successfully loaded ${response.data.length} routine entries`);
          setRoutines(response.data);

          // Set room number from the first routine entry if available
          if (response.data.length > 0 && response.data[0].room_number) {
            setRoomNumber(response.data[0].room_number);
          }
        } else {
          console.error("Expected array but got:", typeof response.data, response.data);
          setRoutines([]);
        }
      } catch (err) {
        console.error("Routine fetch error:", err);

        // Handle different error types
        if (err.message === 'Network Error') {
          console.error("Network error - API endpoint might be unreachable");
          setError("Cannot connect to the server. Please check your internet connection or contact support.");

          // Log additional debugging info
          console.log("API endpoint:", `/api/uni/rooms/${id}/routines/`);
          console.log("Browser location:", window.location.href);

        } else if (err.response?.status === 401) {
          console.error("Authentication error - redirecting to login");
          setAuthError(true);
        } else {
          setError(
            err.response?.data?.message ||
            err.response?.data?.detail ||
            `Failed to load routine data: ${err.message}`
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRoutines();
  }, [id, navigate]);
  // Handle authentication error
  useEffect(() => {
    if (authError) {
      // You could redirect to login
      // navigate('/login');

      // Or just show the auth error message
      setError("Authentication required. Please log in to view this data.");
    }
  }, [authError, navigate]);

  // Format time to HH:MM without seconds
  const formatTime = (timeString) => {
    if (!timeString) return '—';
    return timeString.substring(0, 5); // Takes "14:00:00" → "14:00"
  };

  return (
    <div className="routine-page">
      <h2>Routine for Room {roomNumber || id}</h2>

      {loading ? (
        <p>Loading routine...</p>
      ) : error ? (
        <div className="error-message">
          <p style={{ color: "red" }}>{error}</p>
          {authError && (
            <button
              onClick={() => navigate('/login')}
              className="login-button"
            >
              Go to Login
            </button>
          )}
        </div>
      ) : routines.length === 0 ? (
        <p>No routine available for this room.</p>
      ) : (
        <>
          <p>Found {routines.length} routine entries</p>
          <table className="routine-table">
            <thead>
              <tr>
                <th>Day</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Subject/Purpose</th>
              </tr>
            </thead>
            <tbody>
              {routines.map((routine) => (
                <tr key={routine.id}>
                  <td>{routine.day_display}</td>
                  <td>{formatTime(routine.start_time)}</td>
                  <td>{formatTime(routine.end_time)}</td>
                  <td>{routine.subject_or_purpose || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Routine;
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react'

const Routine = () => {
  const { id } = useParams();
  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
  axiosInstance
    .get(`/rooms/${id}/routines/`)
    .then((res) => {
      console.log("Routine response:", res.data);
      if (Array.isArray(res.data)) {
        setRoutines(res.data);
      } else {
        setRoutines([]);
      }
      setLoading(false);
    })
    .catch((err) => {
      console.error("Routine fetch error:", err);
      setError("Failed to load routine.");
      setLoading(false);
    });
}, [id]);
  return (
    <div className="routine-page">
      <h2>Routine for Room {id}</h2>

      {loading ? (
        <p>Loading routine...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : routines.length === 0 ? (
        <p>No routine available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Day</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Subject/Purpose</th>
            </tr>
          </thead>
          <tbody>
            {routines.map((routine, index) => (
              <tr key={index}>
                <td>{routine.day}</td>
                <td>{routine.start_time}</td>
                <td>{routine.end_time}</td>
                <td>{routine.subject_or_purpose || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Routine;

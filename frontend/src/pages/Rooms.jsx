import React, { useEffect, useState } from 'react';
import './Rooms.css'; // We'll use this for our custom styles
import { Link } from 'react-router-dom';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      try {
        const res = await fetch('http://127.0.0.1:8000/api/uni/rooms/');

        if (!res.ok) {
          throw new Error(`Server responded with status: ${res.status}`);
        }

        const data = await res.json();

        // Handle both array response and object with rooms array
        if (Array.isArray(data)) {
          setRooms(data);
        } else if (data && Array.isArray(data.rooms)) {
          setRooms(data.rooms);
        } else {
          console.log('Unexpected data format:', data);
          setRooms([]); // Set empty array as fallback
          setError('Received unexpected data format from server');
        }
      } catch (err) {
        setError('Error fetching rooms: ' + err.message);
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  if (loading) return (
    <div className="loading-container">
      <div className="loader"></div>
      <p>Loading rooms...</p>
    </div>
  );

  if (error) return (
    <div className="error-container">
      <p>Error: {error}</p>
    </div>
  );

  if (!rooms.length) return (
    <div className="no-rooms-container">
      <p>No rooms available.</p>
    </div>
  );

  return (
    <div className="page-container">
      <div className="page-title">
        <h1>Available Rooms</h1>
        <p>Browse our selection of university spaces</p>
      </div>

      <div className="rooms-container">
        {rooms.map(room => (
          <div key={room.id} className="room-card">
            <div className="room-image-container">
              <img
                src={room.room_pic?.startsWith('http')
                  ? room.room_pic
                  : `http://127.0.0.1:8000${room.room_pic}`}
                alt={`${room.room_type || 'Room'}`}
                className="room-img"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                }}
              />
              <div className="room-type-badge">
                {room.room_type || 'Room'}
              </div>
            </div>

            <div className="room-info">
              <h3 className="room-number">Room #{room.room_no || 'N/A'}</h3>

              <div className="room-details">
                <div className="detail-item">
                  <span className="detail-label">Building:</span>
                  <span className="detail-value">{room.building_name || 'Not specified'}</span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Category:</span>
                  <span className="detail-value">{room.room_category || 'Not specified'}</span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Capacity:</span>
                  <span className="detail-value">{room.room_capacity || 'N/A'} people</span>
                </div>
              </div>

              <Link to={`/rooms/${room.id}`} className="view-details-btn">
  View Details
</Link>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rooms;
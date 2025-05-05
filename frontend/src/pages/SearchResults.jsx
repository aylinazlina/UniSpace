import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchResults.css'; // optional for styling

const RoomCard = ({ room }) => (
  <div className="room-card">
    <h3>Room {room.room_no}</h3>
    {room.room_pic && !room.room_pic.includes('Default_pic.jpg') && (
      <img
        src={`http://localhost:8000${room.room_pic}`}
        alt={`Room ${room.room_no}`}
        className="room-image"
      />
    )}
    <div className="room-details">
      <p><strong>Building:</strong> {room.building_name}</p>
      <p><strong>Type:</strong> {room.room_type}</p>
      <p><strong>Category:</strong> {room.room_category}</p>
      <p><strong>Capacity:</strong> {room.room_capacity}</p>
      {room.room_description && <p><strong>Description:</strong> {room.room_description}</p>}
    </div>
  </div>
);

const SearchResults = () => {
  const location = useLocation();
  const [searchResult, setSearchResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const query = new URLSearchParams(location.search).get('q') || '';

  useEffect(() => {
    if (query.trim()) {
      fetchRoomByNumber(query);
    }
  }, [query]);

  const fetchRoomByNumber = async (roomNo) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:8000/api/uni/search/?q=${roomNo}`);
      if (!response.ok) throw new Error('Failed to fetch room data');

      const data = await response.json();
      if (Array.isArray(data)) {
        setSearchResult(data);
      } else {
        setError(data.message || 'No rooms found');
        setSearchResult([]);
      }
    } catch (err) {
      setError(err.message);
      setSearchResult([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="search-results-container">
      <h2>Search Results</h2>
      {isLoading && <p className="searching-message">Searching rooms...</p>}
      {error && <p className="error-message">{error}</p>}
      {searchResult && (
        <>
          {searchResult.length > 0 ? (
            <div className="search-results-grid">
              {searchResult.map((room) => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          ) : (
            <p className="no-results-message">
              No room found with number "{query}"
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default SearchResults;

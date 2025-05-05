import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const DeleteRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/api/rooms/${id}/`)
      .then((res) => res.json())
      .then((data) => setRoom(data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/api/rooms/delete/${id}/`, {
        method: 'DELETE',
      });

      if (response.status === 204) {
        navigate('/rooms'); // navigate back to rooms list
      } else {
        alert('Failed to delete room');
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!room) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-lg mx-auto mt-20 bg-white shadow-md rounded-xl p-6 text-center">
      <p className="text-lg mb-6">
        Are you sure you want to delete <strong>"{room.room_no}"</strong>?
      </p>
      <form onSubmit={handleDelete}>
        <div className="flex justify-center gap-4">
          <Link to="/rooms">
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
          </Link>
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeleteRoom;


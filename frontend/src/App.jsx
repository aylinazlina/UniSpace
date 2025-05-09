import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateRoom from './pages/CreateRoom';
import Home from './pages/Home'; // example
import Rooms from './pages/Rooms';
import RoomDetails from "./pages/RoomDetails";
import UpdateRoom from './pages/UpdateRoom';
import DeleteRoom from './pages/DeleteRoom';
import Registration from './pages/Registration';
import LoginPage from './pages/LoginPage';
import Profile from "./pages/Profile";
import HeaderAndNavbar from "./pages/HeaderAndNavbar";
import ProfileForm from './pages/ProfileForm';
import ChatPage from './pages/ChatPage';
import ContactPage from './pages/ContactPage';
import SearchResults from './pages/SearchResults';
import Routine from './pages/Routine'
import ProtectedRoute from './pages/ProtectedRoute';




import RootLayout from './rootlayout/RootLayout';

function App() {



  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Registration/>} />
        <Route path="/login" element={<LoginPage />} />

         <Route path="/" element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/profile" element={<Profile />} />
         <Route path="/profileForm" element={<ProfileForm />} />
        <Route path="/rooms" element={<Rooms/>}/>
        <Route path="/rooms/:id" element={<RoomDetails />} />
        <Route path="/routine/:id" element={<Routine />} />

        <Route path="/create-room" element={<CreateRoom/>} />
        <Route path="/rooms/delete/:id" element={<DeleteRoom/>} />
        <Route path="/rooms/update/:id" element={<UpdateRoom />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
export default App;
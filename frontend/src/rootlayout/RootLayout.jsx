import HeaderAndNavbar from "../pages/HeaderAndNavbar";
import { Outlet } from "react-router-dom";
import React from 'react'

const RootLayout = () => {
  return (
    <div>
      <HeaderAndNavbar />
      <main className="container mt-4">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;


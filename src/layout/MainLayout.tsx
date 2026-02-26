import Navbar from "../components/Navbar";
import ProfileHeader from "../components/ProfileHeader";
import { Outlet } from "react-router-dom";
import "./MainLayout.css";

export default function MainLayout() {
  return (
    <div className="app-wrapper">
      <Navbar />

      <ProfileHeader />

      <main className="main-content">
        <div className="container content-container">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
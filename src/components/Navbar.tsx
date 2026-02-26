import { NavLink } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="container nav-inner">
          <h2 className="logo">BiblioFlikFolio</h2>

          <div
            className={`hamburger ${isOpen ? "active" : ""}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className="nav-links desktop">
            <NavLink to="/books">Books</NavLink>
            <NavLink to="/movies">Movies</NavLink>
            <NavLink to="/series">WebShows</NavLink>
            <NavLink to="/genres">Genres</NavLink>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Outside Navbar (no stacking issues) */}
      <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
        <NavLink to="/books" onClick={() => setIsOpen(false)}>Books</NavLink>
        <NavLink to="/movies" onClick={() => setIsOpen(false)}>Movies</NavLink>
        <NavLink to="/series" onClick={() => setIsOpen(false)}>WebShows</NavLink>
        <NavLink to="/genres" onClick={() => setIsOpen(false)}>Genres</NavLink>
      </div>
    </>
  );
}
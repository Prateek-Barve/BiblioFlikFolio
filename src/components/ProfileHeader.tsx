import "./ProfileHeader.css";
import profileImg from "../assets/pb.jpg";

export default function ProfileHeader() {
  return (
    <section className="profile-section">
      <div className="container profile-card">
        <div className="profile-image-wrapper">
          <img
            src={profileImg}
            alt="Profile"
            className="profile-image"
          />
        </div>

        <div className="profile-text">
          <h1>Shelf Control . . .</h1>
          <p className="profile-description">
            A curated collection of the books I’ve read, the films I’ve watched, and the web series I’m currently into. Take your time and explore, you might discover something worth adding to your own list.
          </p>
          <p className="profile-note">
            <strong>Note: Powered by my own MediaLog API, designed, engineered, and deployed independently.</strong>
          </p>
        </div>
      </div>
    </section>
  );
}
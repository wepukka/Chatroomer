import("./HomeInfo.css");
import Footer from "../../../../components/Footer/Footer";

export default function HomeInfo() {
  return (
    <div className="home-info">
      <div className="title-container">
        <h1 className="title-container-title">Friendlies</h1>
        <p className="title-container-paragraph">
          Free & Easy to use chat app. Were focused on making chatting easy and
          pleasent experience.
        </p>
      </div>
      <div className="info-container">
        <div className="info-join info">
          <h2>Join rooms</h2>
          <p>
            Rooms are public, so you can join any room you want. If you want
            more private chat, we'd recommend to create long and unique room
            name.
          </p>
        </div>
        <div className="info-chat info">
          <h2>Start chatting</h2>
          <p>
            Chat freely in rooms of your choice. No data besides user account &
            messages are saved.
          </p>
        </div>
      </div>
      <div className="footer-wrapper">
        <Footer />
      </div>
    </div>
  );
}

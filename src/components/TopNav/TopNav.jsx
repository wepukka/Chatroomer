import("./TopNav.css");

import MenuIcon from "@mui/icons-material/Menu";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function TopNav({ setSideNavIsExpanded }) {
  return (
    <div className="top-nav">
      <p style={{ marginLeft: "auto" }}>Chatroomer 2023</p>
      <a href="https://github.com/wepukka/Friendlies">
        <GitHubIcon className="top-nav-icon" />
      </a>
      <button
        className="toggle-side-nav"
        onClick={() => {
          setSideNavIsExpanded((prev) => !prev);
        }}
      >
        <MenuIcon className="top-nav-icon" />
      </button>
    </div>
  );
}

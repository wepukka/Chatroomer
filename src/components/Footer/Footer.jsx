import("./Footer.css");

import GitHubIcon from "@mui/icons-material/GitHub";

export default function Footer() {
  return (
    <footer className="footer">
      <p>Friendlies 2023</p>
      <a href="https://github.com/wepukka/Friendlies">
        <GitHubIcon
          className="footer-icon"
          sx={{ color: "white", height: "50px", width: "50px" }}
        />
      </a>
    </footer>
  );
}

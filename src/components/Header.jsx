import logo from "../assets/logo.png";
import {FaBars} from "react-icons/fa"

export default function Header({ setSidebarOpen }) {
  return (
    <div className="d-flex  align-items-center  header">
      <button className="hamburger-btn" onClick={() => setSidebarOpen(true)}>
        <FaBars />
      </button>
      <img src={logo} alt="App Logo" style={{ height: "100px" }} />
      <h1 className="anvaya">Anvaya CRM</h1>
    </div>
  );
}

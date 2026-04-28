import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <ul className="nav nav-pills flex-column mb-auto mt-5 ">
       <li className="nav-item sidebar-items">
        <NavLink to="/" className={({isActive})=>isActive?"dashboard-pill":"nav-link sidebar-links"} isActive>
          Back to Dashboard
        </NavLink>
      </li>
      <li className="nav-item sidebar-items">
        <NavLink to="/leads" className={({isActive})=>isActive?"nav-link sidebar-links link-active":"nav-link sidebar-links"}> Leads </NavLink>
      </li>
      <li className="nav-item sidebar-items">
        <NavLink to="/add-lead" className={({isActive})=>isActive?"nav-link sidebar-links link-active":"nav-link sidebar-links"}> Add New Lead </NavLink>
      </li>
      <li className="nav-item sidebar-items">
        <NavLink to="/agents" className={({isActive})=>isActive?"nav-link sidebar-links link-active":"nav-link sidebar-links"}> Agents</NavLink>
      </li>
      <li className="nav-item sidebar-items">
        <NavLink to="/reports" className={({isActive})=>isActive?"nav-link sidebar-links link-active":"nav-link sidebar-links"}> Reports </NavLink>
      </li>
      <li className="nav-item sidebar-items">
        <NavLink to="/settings" className={({isActive})=>isActive?"nav-link sidebar-links link-active":"nav-link sidebar-links"}> Settings </NavLink>
      </li>
    </ul>
  );
}

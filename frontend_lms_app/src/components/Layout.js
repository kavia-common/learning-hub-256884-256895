import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "./Button";
import { getUser, signOut } from "../js/storage";

/** PUBLIC_INTERFACE
 * Layout with Sidebar and Topbar wrapping page content
 * @param {{children: React.ReactNode, title?: string, subtitle?: string}} props
 */
export default function Layout({ children, title, subtitle }) {
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    signOut();
    navigate("/login");
  };

  return (
    <div className="layout">
      <aside className="sidebar" role="navigation" aria-label="Primary">
        <div className="brand">
          <div className="logo" aria-hidden>LH</div>
          <div>
            <div style={{fontWeight:800}}>Learning Hub</div>
            <div className="small">Ocean Professional</div>
          </div>
        </div>
        <nav className="nav">
          <NavLink to="/" end>Dashboard</NavLink>
          <NavLink to="/courses">Courses</NavLink>
          <NavLink to="/results">Results</NavLink>
        </nav>
        <div className="hr"></div>
        <div className="small">Logged in as</div>
        <div className="mt8" style={{fontWeight:700}}>{user?.name || "Guest"}</div>
        <div className="mt16">
          <Button variant="ghost" onClick={handleLogout} ariaLabel="Log out">Logout</Button>
        </div>
      </aside>
      <div className="content">
        <div className="topbar" role="banner">
          <div className="hero" style={{padding:12, background:"transparent", boxShadow:"none"}}>
            {title && <h1 className="heading m0">{title}</h1>}
            {subtitle && <p className="subheading m0">{subtitle}</p>}
          </div>
          <div className="row">
            <span className="badge info">{user?.email || "user@example.com"}</span>
          </div>
        </div>
        <main className="page surface-alt">
          {children}
        </main>
      </div>
    </div>
  );
}

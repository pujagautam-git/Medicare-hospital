import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  Stethoscope,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import api from "../../services/api";
import "./AdminLayout.css";

const menuItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin/dashboard",
  },
  {
    label: "Departments",
    icon: Users,
    path: "/admin/departments",
  },
  {
    label: "Doctors",
    icon: Stethoscope,
    path: "/admin/doctors",
    disabled: true,
  },
  {
    label: "Appointments",
    icon: CalendarDays,
    path: "/admin/appointments",
    disabled: true,
  },
  {
    label: "Messages",
    icon: MessageSquare,
    path: "/admin/messages",
    disabled: true,
  },
  {
    label: "Settings",
    icon: Settings,
    path: "/admin/settings",
    disabled: true,
  },
];

function AdminLayout({ title, subtitle, children }) {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await api.get("/auth/profile");
        setAdmin(response.data.admin);
      } catch (error) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminData");
        navigate("/admin/login", { replace: true });
      }
    };

    fetchAdmin();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="admin-layout">
      <aside className={`admin-sidebar ${menuOpen ? "open" : ""}`}>
        <div className="admin-sidebar-brand">
          <span className="admin-brand-icon">M+</span>

          <div>
            <h2>MediCare</h2>
            <p>Hospital Admin</p>
          </div>

          <button
            className="sidebar-close"
            onClick={() => setMenuOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <p className="sidebar-label">MAIN MENU</p>

        <nav className="admin-sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;

            if (item.disabled) {
              return (
                <button
                  key={item.label}
                  className="sidebar-link disabled"
                  type="button"
                  disabled
                  title="Coming soon"
                >
                  <Icon size={19} />
                  <span>{item.label}</span>
                  <small>Soon</small>
                </button>
              );
            }

            return (
              <NavLink
                key={item.label}
                to={item.path}
                end
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? "active" : ""}`
                }
                onClick={() => setMenuOpen(false)}
              >
                <Icon size={19} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <button className="sidebar-logout" onClick={handleLogout}>
          <LogOut size={19} />
          <span>Logout</span>
        </button>
      </aside>

      {menuOpen && (
        <div
          className="admin-sidebar-overlay"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <main className="admin-main">
        <header className="admin-topbar">
          <button
            className="sidebar-menu-toggle"
            onClick={() => setMenuOpen(true)}
            aria-label="Open sidebar"
          >
            <Menu size={23} />
          </button>

          <div className="admin-page-heading">
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>

          <div className="admin-profile">
            <div className="admin-avatar">
              {admin?.name?.charAt(0).toUpperCase() || "A"}
            </div>

            <div>
              <strong>{admin?.name || "Admin"}</strong>
              <span>Administrator</span>
            </div>
          </div>
        </header>

        <div className="admin-page-content">{children}</div>
      </main>
    </div>
  );
}

export default AdminLayout;
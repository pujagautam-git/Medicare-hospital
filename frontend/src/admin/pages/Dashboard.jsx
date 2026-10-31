import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Stethoscope,
  CalendarDays,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import api from "../../services/api";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

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

  const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
  { label: "Appointments", icon: CalendarDays, path: "/admin/appointments" },
  { label: "Doctors", icon: Stethoscope, path: "/admin/doctors" },
  { label: "Departments", icon: Users, path: "/admin/departments" },
  { label: "Messages", icon: MessageSquare, path: "/admin/messages" },
  { label: "Settings", icon: Settings, path: "/admin/settings" },
];

  const stats = [
    { title: "Total Appointments", value: "0", icon: CalendarDays },
    { title: "Total Doctors", value: "0", icon: Stethoscope },
    { title: "Departments", value: "0", icon: Users },
    { title: "Messages", value: "0", icon: MessageSquare },
  ];

  return (
    <div className="admin-dashboard">
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
          >
            <X size={20} />
          </button>
        </div>

        <p className="sidebar-label">MAIN MENU</p>

      <nav className="admin-sidebar-nav">
  {menuItems.map((item) => {
    const Icon = item.icon;
    const isActive = location.pathname === item.path;

    return (
      <button
        key={item.label}
        className={`sidebar-link ${isActive ? "active" : ""}`}
        onClick={() => {
          navigate(item.path);
          setMenuOpen(false);
        }}
      >
        <Icon size={19} />
        <span>{item.label}</span>
      </button>
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
          >
            <Menu size={23} />
          </button>

          <div>
            <h1>Dashboard</h1>
            <p>Welcome to your hospital management panel.</p>
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

        <section className="admin-dashboard-content">
          <div className="dashboard-welcome">
            <div>
              <h2>Welcome back, {admin?.name || "Admin"}!</h2>
              <p>Here is an overview of your hospital activities.</p>
            </div>
          </div>

          <div className="dashboard-stats">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div className="dashboard-stat-card" key={stat.title}>
                  <div className="stat-icon">
                    <Icon size={22} />
                  </div>
                  <p>{stat.title}</p>
                  <h3>{stat.value}</h3>
                </div>
              );
            })}
          </div>

          <div className="dashboard-empty-card">
            <h3>Recent Activities</h3>
            <p>
              Your recent appointments and hospital activities will appear
              here once the CMS modules are connected.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
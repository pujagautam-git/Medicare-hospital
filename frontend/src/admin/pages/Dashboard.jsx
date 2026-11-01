import {
  CalendarDays,
  Stethoscope,
  Users,
  MessageSquare,
} from "lucide-react";
import AdminLayout from "../components/AdminLayout";
import "./Dashboard.css";

function Dashboard() {
  const stats = [
    {
      title: "Total Appointments",
      value: "0",
      icon: CalendarDays,
    },
    {
      title: "Total Doctors",
      value: "0",
      icon: Stethoscope,
    },
    {
      title: "Departments",
      value: "0",
      icon: Users,
    },
    {
      title: "Messages",
      value: "0",
      icon: MessageSquare,
    },
  ];

  return (
    <AdminLayout
      title="Dashboard"
      subtitle="Welcome to your hospital management panel."
    >
      <div className="dashboard-content">
        <div className="dashboard-welcome">
          <h2>Welcome to MediCare!</h2>
          <p>Here is an overview of your hospital activities.</p>
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
      </div>
    </AdminLayout>
  );
}

export default Dashboard;
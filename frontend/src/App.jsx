import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Hero from "./sections/Hero/Hero";
import About from "./sections/About/About";
import Departments from "./sections/Departments/Departments";
import Doctors from "./sections/Doctors/Doctors";
import Appointment from "./sections/Appointment/Appointment";
import Facilities from "./sections/Facilities/Facilities";
import Testimonials from "./sections/Testimonials/Testimonials";
import Blog from "./sections/Blog/Blog";

import Login from "./admin/pages/Login";
import Dashboard from "./admin/pages/Dashboard";
import AdminDoctors from "./admin/pages/adminDoctor/adminDoctor";
import ProtectedRoute from "./admin/components/ProtectedRoute";
import AdminDepartments from "./admin/pages/adminDepartments/adminDepartment";
function HomePage() {
  return (
    <>
      <Header />

      <main>
        <Hero/>
        <About/>
        <Departments/>
        <Doctors/>
        <Appointment/>
        <Facilities/>
        <Testimonials/>
        <Blog/>
      </main>
      
      <Footer/>
    </>
  );
}

function AdminDashboardTest() {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  const admin = JSON.parse(
    localStorage.getItem("adminData") || "{}"
  );

  return (
    <div style={{ padding: "50px" }}>
      <h1>Welcome to MediCare Admin Dashboard</h1>
      <p>Hello, {admin.name}</p>
      <button
        onClick={() => {
          localStorage.removeItem("adminToken");
          localStorage.removeItem("adminData");
          window.location.href = "/admin/login";
        }}
      >
        Logout
      </button>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin/login" element={<Login />} />
      <Route element={<ProtectedRoute />}></Route>
         <Route path="/admin/dashboard" element={<Dashboard />} />
           <Route path="/admin/departments" element={<AdminDepartments />} />
              <Route path="/admin/doctors" element={<AdminDoctors/>} />
    </Routes>
  );
}

export default App;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LockKeyhole, Mail, Eye, EyeOff } from "lucide-react";
import api from "../../services/api";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/login", formData);

      const { token, admin } = response.data;

      localStorage.setItem("adminToken", token);
      localStorage.setItem("adminData", JSON.stringify(admin));

      navigate("/admin/dashboard");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <Link to="/" className="admin-login-brand">
          <span className="admin-brand-icon">M+</span>
          <div>
            <h2>MediCare</h2>
            <p>Multispeciality Hospital</p>
          </div>
        </Link>

        <div className="admin-login-heading">
          <div className="admin-login-icon">
            <LockKeyhole size={25} />
          </div>
          <h1>Welcome Back</h1>
          <p>Sign in to access your hospital admin panel.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label htmlFor="email">Email Address</label>
            <div className="admin-input-wrapper">
              <Mail size={18} />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label htmlFor="password">Password</label>
            <div className="admin-input-wrapper">
              <LockKeyhole size={18} />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && <p className="admin-login-error">{error}</p>}

          <button
            type="submit"
            className="admin-login-button"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="admin-login-footer">
          MediCare Hospital Admin Portal
        </p>
      </div>
    </div>
  );
}

export default Login;

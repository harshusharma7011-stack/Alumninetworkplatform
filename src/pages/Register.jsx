import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    graduationYear: '',
    branch: '',
    currentCompany: '',
    jobRole: '',
    location: '',
    linkedin: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName) newErrors.fullName = 'This field is required';
    if (!formData.email) {
      newErrors.email = 'This field is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.phone) newErrors.phone = 'This field is required';
    if (!formData.graduationYear) newErrors.graduationYear = 'This field is required';
    if (!formData.branch) newErrors.branch = 'This field is required';
    if (!formData.password) {
      newErrors.password = 'This field is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'This field is required';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const userData = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        graduationYear: formData.graduationYear,
        branch: formData.branch,
        currentCompany: formData.currentCompany,
        jobRole: formData.jobRole,
        location: formData.location,
        linkedin: formData.linkedin,
        password: formData.password,
        registeredAt: new Date().toISOString()
      };
      
      register(userData);
      alert('Registration successful! Please login to continue.');
      navigate('/login');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card" style={{ maxWidth: '600px' }}>
        <div className="text-center mb-4">
          <h2>🎓 Join Our Network</h2>
          <p>Create your account to connect with alumni</p>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="fullName" className="form-label">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className="form-control"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              style={{ borderColor: errors.fullName ? '#EF4444' : '' }}
            />
            {errors.fullName && <span className="error-message" style={{ display: 'block' }}>{errors.fullName}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              style={{ borderColor: errors.email ? '#EF4444' : '' }}
            />
            {errors.email && <span className="error-message" style={{ display: 'block' }}>{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="phone" className="form-label">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="form-control"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              style={{ borderColor: errors.phone ? '#EF4444' : '' }}
            />
            {errors.phone && <span className="error-message" style={{ display: 'block' }}>{errors.phone}</span>}
          </div>
          <div className="d-flex gap-2">
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="graduationYear" className="form-label">Graduation Year</label>
              <select
                id="graduationYear"
                name="graduationYear"
                className="form-control"
                value={formData.graduationYear}
                onChange={handleChange}
                style={{ borderColor: errors.graduationYear ? '#EF4444' : '' }}
              >
                <option value="">Select Year</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
                <option value="2016">2016</option>
                <option value="2015">2015</option>
                <option value="2014">2014</option>
                <option value="2013">2013</option>
                <option value="2012">2012</option>
                <option value="2011">2011</option>
                <option value="2010">2010</option>
              </select>
              {errors.graduationYear && <span className="error-message" style={{ display: 'block' }}>{errors.graduationYear}</span>}
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="branch" className="form-label">Branch</label>
              <select
                id="branch"
                name="branch"
                className="form-control"
                value={formData.branch}
                onChange={handleChange}
                style={{ borderColor: errors.branch ? '#EF4444' : '' }}
              >
                <option value="">Select Branch</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Electronics">Electronics</option>
                <option value="Electrical">Electrical</option>
                <option value="Mechanical">Mechanical</option>
                <option value="Civil">Civil</option>
                <option value="Chemical">Chemical</option>
              </select>
              {errors.branch && <span className="error-message" style={{ display: 'block' }}>{errors.branch}</span>}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="currentCompany" className="form-label">Current Company</label>
            <input
              type="text"
              id="currentCompany"
              name="currentCompany"
              className="form-control"
              placeholder="Enter your current company"
              value={formData.currentCompany}
              onChange={handleChange}
            />
          </div>
          <div className="d-flex gap-2">
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="jobRole" className="form-label">Job Role</label>
              <input
                type="text"
                id="jobRole"
                name="jobRole"
                className="form-control"
                placeholder="Your job role"
                value={formData.jobRole}
                onChange={handleChange}
              />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="location" className="form-label">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                className="form-control"
                placeholder="Your location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="linkedin" className="form-label">LinkedIn Profile</label>
            <input
              type="url"
              id="linkedin"
              name="linkedin"
              className="form-control"
              placeholder="https://linkedin.com/in/yourprofile"
              value={formData.linkedin}
              onChange={handleChange}
            />
          </div>
          <div className="d-flex gap-2">
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                style={{ borderColor: errors.password ? '#EF4444' : '' }}
              />
              {errors.password && <span className="error-message" style={{ display: 'block' }}>{errors.password}</span>}
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="form-control"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                style={{ borderColor: errors.confirmPassword ? '#EF4444' : '' }}
              />
              {errors.confirmPassword && <span className="error-message" style={{ display: 'block' }}>{errors.confirmPassword}</span>}
            </div>
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            Register
          </button>
        </form>
        <div className="auth-footer">
          <p>Already have an account? <Link to="/login">Login</Link></p>
          <p className="mt-3"><Link to="/">← Back to Home</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;

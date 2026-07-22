import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const { userData, currentUser } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    fullName: userData?.fullName || currentUser?.name || 'Harshita Sharma',
    email: userData?.email || 'harshita.sharma@email.com',
    phone: userData?.phone || '+91 98765 43210',
    currentCompany: userData?.currentCompany || 'Google',
    jobRole: userData?.jobRole || 'Software Engineer',
    location: userData?.location || 'Bangalore, India',
    linkedin: userData?.linkedin || 'https://linkedin.com/in/harshitasharma',
    about: 'Passionate software engineer with expertise in full-stack development.'
  });

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    alert('Profile updated successfully!');
    setIsEditModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div>
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-header-avatar">{getInitials(editFormData.fullName)}</div>
        <h1>{editFormData.fullName}</h1>
        <div className="batch">Batch of {userData?.graduationYear || '2022'}</div>
      </div>

      {/* Profile Details */}
      <div className="profile-details">
        {/* Personal Information */}
        <div className="profile-section">
          <h3>Personal Information</h3>
          <div className="profile-info-grid">
            <div className="profile-info-item">
              <label>Full Name</label>
              <p>{editFormData.fullName}</p>
            </div>
            <div className="profile-info-item">
              <label>Email</label>
              <p>{editFormData.email}</p>
            </div>
            <div className="profile-info-item">
              <label>Phone</label>
              <p>{editFormData.phone}</p>
            </div>
            <div className="profile-info-item">
              <label>Location</label>
              <p>{editFormData.location}</p>
            </div>
          </div>
        </div>

        {/* Academic Information */}
        <div className="profile-section">
          <h3>Academic Information</h3>
          <div className="profile-info-grid">
            <div className="profile-info-item">
              <label>Graduation Year</label>
              <p>{userData?.graduationYear || '2022'}</p>
            </div>
            <div className="profile-info-item">
              <label>Branch</label>
              <p>{userData?.branch || 'Computer Science'}</p>
            </div>
            <div className="profile-info-item">
              <label>Degree</label>
              <p>Bachelor of Computer Applications</p>
            </div>
          </div>
        </div>

        {/* Professional Information */}
        <div className="profile-section">
          <h3>Professional Information</h3>
          <div className="profile-info-grid">
            <div className="profile-info-item">
              <label>Current Company</label>
              <p>{editFormData.currentCompany}</p>
            </div>
            <div className="profile-info-item">
              <label>Job Role</label>
              <p>{editFormData.jobRole}</p>
            </div>
            <div className="profile-info-item">
              <label>Experience</label>
              <p>2 years</p>
            </div>
            <div className="profile-info-item">
              <label>LinkedIn</label>
              <p><a href={editFormData.linkedin} target="_blank" rel="noopener noreferrer">View Profile</a></p>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="profile-section">
          <h3>Skills</h3>
          <div className="skills-tags">
            <span className="skill-tag">JavaScript</span>
            <span className="skill-tag">Python</span>
            <span className="skill-tag">React</span>
            <span className="skill-tag">Node.js</span>
            <span className="skill-tag">SQL</span>
            <span className="skill-tag">Git</span>
            <span className="skill-tag">AWS</span>
            <span className="skill-tag">Docker</span>
          </div>
        </div>

        {/* About */}
        <div className="profile-section">
          <h3>About</h3>
          <p>{editFormData.about}</p>
        </div>

        {/* Edit Profile Button */}
        <div className="text-center">
          <button 
            className="btn btn-primary btn-lg" 
            onClick={() => setIsEditModalOpen(true)}
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div 
          className="modal" 
          style={{ 
            display: 'flex', 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            background: 'rgba(0,0,0,0.5)', 
            zIndex: 2000, 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}
        >
          <div className="card" style={{ maxWidth: '500px', width: '90%', maxHeight: '90vh', overflowY: 'auto' }}>
            <div className="card-header d-flex justify-between align-center">
              <h3>Edit Profile</h3>
              <button 
                onClick={() => setIsEditModalOpen(false)}
                style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}
              >
                ×
              </button>
            </div>
            <div className="card-body">
              <form onSubmit={handleEditSubmit}>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input 
                    type="text" 
                    name="fullName"
                    className="form-control" 
                    value={editFormData.fullName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input 
                    type="email" 
                    name="email"
                    className="form-control" 
                    value={editFormData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone</label>
                  <input 
                    type="tel" 
                    name="phone"
                    className="form-control" 
                    value={editFormData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Current Company</label>
                  <input 
                    type="text" 
                    name="currentCompany"
                    className="form-control" 
                    value={editFormData.currentCompany}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Job Role</label>
                  <input 
                    type="text" 
                    name="jobRole"
                    className="form-control" 
                    value={editFormData.jobRole}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Location</label>
                  <input 
                    type="text" 
                    name="location"
                    className="form-control" 
                    value={editFormData.location}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">LinkedIn</label>
                  <input 
                    type="url" 
                    name="linkedin"
                    className="form-control" 
                    value={editFormData.linkedin}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">About</label>
                  <textarea 
                    name="about"
                    className="form-control"
                    value={editFormData.about}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="d-flex gap-2">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => setIsEditModalOpen(false)}
                    style={{ flex: 1 }}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    style={{ flex: 1 }}
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

import { useEffect, useState } from 'react';
import { mentorshipApi } from '../services/api';

const Mentorship = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await mentorshipApi.getAll();
        setMentors(response.mentors || []);
      } catch (err) {
        setError(err.message || 'Unable to load mentors');
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  const handleRequest = async (id) => {
    try {
      await mentorshipApi.requestMentorship(id);
      alert('Mentorship request sent successfully');
    } catch (err) {
      alert(err.message || 'Request failed');
    }
  };

  return (
    <div>
      {/* Mentorship Header */}
      <div className="mentorship-header">
        <div className="container text-center">
          <h1>Mentorship Program</h1>
          <p>Connect with experienced alumni mentors to guide your career journey</p>
        </div>
      </div>

      {/* Mentors Grid */}
      {loading ? <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading mentors...</p> : null}
      {error ? <p style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--danger)' }}>{error}</p> : null}
      <div className="mentors-grid">
        {!loading && !error && mentors.map(mentor => (
          <div key={mentor._id} className="mentor-card">
            <div className="mentor-card-avatar">{mentor.initials || mentor.name?.split(' ').map(x => x[0]).join('').slice(0,2).toUpperCase()}</div>
            <h4>{mentor.name}</h4>
            <div className="company">{mentor.company}</div>
            <div className="experience">{mentor.experience} experience</div>
            <div className="mentor-skills">
              {mentor.skills?.map((skill, index) => (
                <span key={index} className="mentor-skill">{skill}</span>
              ))}
            </div>
            <button 
              className="btn btn-primary btn-sm"
              onClick={() => handleRequest(mentor._id)}
            >
              Request Mentorship
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mentorship;

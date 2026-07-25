import { useEffect, useState } from 'react';
import { jobsApi } from '../services/api';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await jobsApi.getAll();
        setJobs(response.jobs || []);
      } catch (err) {
        setError(err.message || 'Unable to load jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleApply = (id) => {
    alert(`Application submitted for job #${id}`);
  };

  return (
    <div>
      {/* Jobs Header */}
      <div className="jobs-header">
        <div className="container text-center">
          <h1>Job Board</h1>
          <p>Explore exclusive job opportunities from our alumni network</p>
        </div>
      </div>

      {/* Jobs Grid */}
      {loading ? <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading jobs...</p> : null}
      {error ? <p style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--danger)' }}>{error}</p> : null}
      <div className="jobs-grid">
        {!loading && !error && jobs.map(job => (
          <div key={job._id} className="job-card">
            <div className="job-card-header">
              <div className="company-logo">{job.logo || job.company?.charAt(0)}</div>
              <div>
                <h4>{job.title}</h4>
                <div className="company-name">{job.company}</div>
              </div>
            </div>
            <div className="job-details">
              <div className="job-detail">
                <span>📍</span> {job.location}
              </div>
              <div className="job-detail">
                <span>💼</span> {job.type}
              </div>
              <div className="job-detail">
                <span>🎓</span> {job.experience} experience
              </div>
              <div className="job-detail salary">
                <span>💰</span> {job.salary}
              </div>
            </div>
            <button 
              className="btn btn-primary btn-sm"
              onClick={() => handleApply(job._id)}
            >
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;

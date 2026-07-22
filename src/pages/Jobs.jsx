const Jobs = () => {
  const jobs = [
    { id: 1, title: 'Software Engineer', company: 'Google', logo: 'G', location: 'Bangalore, India', type: 'Full-time', experience: '2+ years', salary: '₹20-35 LPA' },
    { id: 2, title: 'Frontend Developer', company: 'Microsoft', logo: 'M', location: 'Hyderabad, India', type: 'Full-time', experience: '3+ years', salary: '₹18-30 LPA' },
    { id: 3, title: 'Backend Developer', company: 'Infosys', logo: 'I', location: 'Pune, India', type: 'Full-time', experience: '1+ years', salary: '₹8-15 LPA' },
    { id: 4, title: 'Data Analyst', company: 'TCS', logo: 'T', location: 'Mumbai, India', type: 'Full-time', experience: '2+ years', salary: '₹10-18 LPA' },
    { id: 5, title: 'UI/UX Designer', company: 'Accenture', logo: 'A', location: 'Delhi, India', type: 'Full-time', experience: '2+ years', salary: '₹12-22 LPA' },
    { id: 6, title: 'Cloud Architect', company: 'Amazon', logo: 'A', location: 'Bangalore, India', type: 'Full-time', experience: '5+ years', salary: '₹30-50 LPA' },
    { id: 7, title: 'Product Manager', company: 'Meta', logo: 'M', location: 'Remote / International', type: 'Full-time', experience: '4+ years', salary: '$80-120K' },
    { id: 8, title: 'DevOps Engineer', company: 'Deloitte', logo: 'D', location: 'Hyderabad, India', type: 'Full-time', experience: '3+ years', salary: '₹15-25 LPA' },
  ];

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
      <div className="jobs-grid">
        {jobs.map(job => (
          <div key={job.id} className="job-card">
            <div className="job-card-header">
              <div className="company-logo">{job.logo}</div>
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
              onClick={() => handleApply(job.id)}
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

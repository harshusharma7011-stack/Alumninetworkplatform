const Mentorship = () => {
  const mentors = [
    { id: 1, name: 'Rohit Sharma', initials: 'RS', company: 'Goldman Sachs', experience: '10+ years', skills: ['Data Science', 'Finance', 'Python', 'Machine Learning'] },
    { id: 2, name: 'Anjali Gupta', initials: 'AG', company: 'Microsoft', experience: '8+ years', skills: ['UI/UX Design', 'Product Design', 'Figma', 'User Research'] },
    { id: 3, name: 'Vikram Singh', initials: 'VS', company: 'Amazon', experience: '12+ years', skills: ['Product Management', 'Agile', 'Strategy', 'Leadership'] },
    { id: 4, name: 'Amit Kumar', initials: 'AK', company: 'Infosys', experience: '15+ years', skills: ['Software Architecture', 'Java', 'Cloud', 'DevOps'] },
    { id: 5, name: 'Sneha Reddy', initials: 'SR', company: 'Deloitte', experience: '7+ years', skills: ['Business Consulting', 'Strategy', 'Management', 'Analytics'] },
    { id: 6, name: 'Rahul Mehta', initials: 'RM', company: 'Meta', experience: '14+ years', skills: ['Engineering Management', 'System Design', 'Scalability', 'Tech Leadership'] },
    { id: 7, name: 'Neha Kapoor', initials: 'NK', company: 'JP Morgan', experience: '9+ years', skills: ['Investment Banking', 'Finance', 'Risk Management', 'Financial Modeling'] },
    { id: 8, name: 'Priya Patel', initials: 'PP', company: 'Apollo Hospitals', experience: '11+ years', skills: ['Healthcare IT', 'Data Analytics', 'Healthcare Management', 'Digital Health'] },
  ];

  const handleRequest = (id) => {
    alert(`Mentorship request sent to mentor #${id}`);
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
      <div className="mentors-grid">
        {mentors.map(mentor => (
          <div key={mentor.id} className="mentor-card">
            <div className="mentor-card-avatar">{mentor.initials}</div>
            <h4>{mentor.name}</h4>
            <div className="company">{mentor.company}</div>
            <div className="experience">{mentor.experience} experience</div>
            <div className="mentor-skills">
              {mentor.skills.map((skill, index) => (
                <span key={index} className="mentor-skill">{skill}</span>
              ))}
            </div>
            <button 
              className="btn btn-primary btn-sm"
              onClick={() => handleRequest(mentor.id)}
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

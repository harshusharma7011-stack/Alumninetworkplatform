const Achievements = () => {
  const achievements = [
    { id: 1, icon: '🏆', title: 'Innovation Award 2024', alumniName: 'Harshita Sharma', description: 'For outstanding contribution to AI research at Google' },
    { id: 2, icon: '🥇', title: 'Best Startup Founder', alumniName: 'Rohit Sharma', description: 'Founded a successful fintech startup valued at $10M' },
    { id: 3, icon: '🎖️', title: 'Leadership Excellence', alumniName: 'Anjali Gupta', description: 'Recognized for exceptional leadership at Microsoft' },
    { id: 4, icon: '⭐', title: 'Research Excellence', alumniName: 'Vikram Singh', description: 'Published groundbreaking research in cloud computing' },
    { id: 5, icon: '🎯', title: 'Community Impact', alumniName: 'Priya Patel', description: 'Made significant impact in healthcare technology' },
    { id: 6, icon: '💎', title: 'Entrepreneur of the Year', alumniName: 'Amit Kumar', description: 'Built a successful tech consulting firm' },
  ];

  return (
    <div>
      {/* Achievements Header */}
      <div className="achievements-header">
        <div className="container text-center">
          <h1>Achievements</h1>
          <p>Celebrate the success of our distinguished alumni</p>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="achievements-grid">
        {achievements.map(achievement => (
          <div key={achievement.id} className="achievement-card">
            <div className="achievement-icon">{achievement.icon}</div>
            <h4>{achievement.title}</h4>
            <div className="alumni-name">{achievement.alumniName}</div>
            <div className="description">{achievement.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;

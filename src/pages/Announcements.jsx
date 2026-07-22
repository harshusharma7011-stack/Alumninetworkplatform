const Announcements = () => {
  const announcements = [
    { id: 1, title: 'New Alumni Portal Launch', date: 'December 1, 2024', description: 'We are excited to announce the launch of our new alumni portal with enhanced features and better user experience.' },
    { id: 2, title: 'Annual Alumni Meet Registration Open', date: 'November 25, 2024', description: 'Registration for the Annual Alumni Meet 2024 is now open. Early bird discounts available until December 5th.' },
    { id: 3, title: 'Mentorship Program Expansion', date: 'November 20, 2024', description: 'Our mentorship program has expanded to include 50+ new mentors from various industries.' },
    { id: 4, title: 'Job Board Integration with LinkedIn', date: 'November 15, 2024', description: 'We have integrated our job board with LinkedIn for seamless job applications and networking.' },
    { id: 5, title: 'Alumni Achievement Awards 2024', date: 'November 10, 2024', description: 'Nominations are open for the Alumni Achievement Awards 2024. Submit your nominations by November 30th.' },
  ];

  return (
    <div>
      {/* Announcements Header */}
      <div className="announcements-header">
        <div className="container text-center">
          <h1>Announcements</h1>
          <p>Stay updated with the latest news and updates</p>
        </div>
      </div>

      {/* Announcements Container */}
      <div className="announcements-container">
        <div className="timeline">
          {announcements.map(announcement => (
            <div key={announcement.id} className="timeline-item">
              <div className="timeline-card">
                <h4>{announcement.title}</h4>
                <div className="date">{announcement.date}</div>
                <p>{announcement.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Announcements;

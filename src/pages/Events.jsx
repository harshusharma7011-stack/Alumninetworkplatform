const Events = () => {
  const events = [
    { id: 1, title: 'Annual Alumni Reunion', date: 'December 15, 2024', venue: 'University Campus, Main Auditorium', icon: '🎉', description: 'Join us for the biggest alumni gathering of the year! Reconnect with old friends and make new ones.' },
    { id: 2, title: 'Tech Talk: AI in Industry', date: 'December 20, 2024', venue: 'Virtual Event (Zoom)', icon: '💻', description: 'Learn about the latest AI trends and applications from industry experts working at top tech companies.' },
    { id: 3, title: 'Career Guidance Webinar', date: 'January 5, 2025', venue: 'Online (Google Meet)', icon: '🎓', description: 'Get expert career advice from alumni who have successfully navigated their career paths.' },
    { id: 4, title: 'Hackathon 2025', date: 'January 15, 2025', venue: 'Tech Hub, Bangalore', icon: '🏆', description: '24-hour coding challenge with amazing prizes and networking opportunities with tech leaders.' },
    { id: 5, title: 'Career Fair', date: 'February 10, 2025', venue: 'Convention Center, Mumbai', icon: '💼', description: 'Meet recruiters from top companies and explore job opportunities exclusively for alumni.' },
    { id: 6, title: 'Tech Seminar: Cloud Computing', date: 'February 20, 2025', venue: 'University Campus, Seminar Hall', icon: '📚', description: 'Deep dive into cloud computing technologies and best practices from industry practitioners.' },
    { id: 7, title: 'Networking Mixer', date: 'March 5, 2025', venue: 'Rooftop Lounge, Delhi', icon: '🤝', description: 'Casual networking event with drinks and snacks. Perfect for expanding your professional network.' },
    { id: 8, title: 'Startup Pitch Competition', date: 'March 20, 2025', venue: 'Innovation Hub, Hyderabad', icon: '🎤', description: 'Watch alumni entrepreneurs pitch their startups to investors and industry experts.' },
  ];

  const handleRSVP = (id) => {
    alert(`RSVP submitted for event #${id}`);
  };

  return (
    <div>
      {/* Events Header */}
      <div className="events-header">
        <div className="container text-center">
          <h1>Events</h1>
          <p>Stay connected with reunions, webinars, and networking events</p>
        </div>
      </div>

      {/* Events Grid */}
      <div className="events-grid">
        {events.map(event => (
          <div key={event.id} className="event-card">
            <div className="event-card-image">{event.icon}</div>
            <div className="event-card-body">
              <h4>{event.title}</h4>
              <div className="event-date">📅 {event.date}</div>
              <div className="event-venue">📍 {event.venue}</div>
              <p>{event.description}</p>
              <button 
                className="btn btn-primary btn-sm"
                onClick={() => handleRSVP(event.id)}
              >
                RSVP Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;

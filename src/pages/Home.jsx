import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

const Home = () => {
  const [counters, setCounters] = useState({ alumni: 0, companies: 0, mentors: 0, events: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef(null);

  const stats = [
    { target: 5000, label: 'Alumni', key: 'alumni' },
    { target: 250, label: 'Companies', key: 'companies' },
    { target: 150, label: 'Mentors', key: 'mentors' },
    { target: 100, label: 'Events', key: 'events' },
  ];

  const features = [
    { icon: '👥', title: 'Alumni Directory', description: 'Find and connect with alumni from your university across the globe.' },
    { icon: '💼', title: 'Job Opportunities', description: 'Access exclusive job postings and career opportunities from alumni.' },
    { icon: '🤝', title: 'Mentorship', description: 'Get guidance from experienced alumni mentors in your field.' },
    { icon: '📅', title: 'Events', description: 'Stay updated with reunions, webinars, and networking events.' },
    { icon: '🏆', title: 'Achievements', description: 'Celebrate the success and achievements of fellow alumni.' },
    { icon: '📢', title: 'Announcements', description: 'Get the latest news and updates from the university community.' },
  ];

  const stories = [
    { initials: 'HS', name: 'Harshita Sharma', role: 'Software Engineer', quote: 'The alumni network helped me land my dream job at Google. The mentorship program was invaluable!' },
    { initials: 'RS', name: 'Rohit Sharma', role: 'Data Analyst', quote: 'Connecting with fellow alumni opened doors to opportunities I never knew existed.' },
    { initials: 'AG', name: 'Anjali Gupta', role: 'UI/UX Designer', quote: 'The platform\'s job board helped me transition into tech. Forever grateful!' },
  ];

  const upcomingEvents = [
    { month: 'DEC', day: '15', title: 'Annual Alumni Meet', location: 'University Campus • 10:00 AM' },
    { month: 'DEC', day: '20', title: 'Tech Talk: AI in Industry', location: 'Virtual Event • 6:00 PM' },
    { month: 'JAN', day: '05', title: 'Career Guidance Webinar', location: 'Online • 4:00 PM' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      stats.forEach((stat) => {
        animateCounter(stat.target, stat.key);
      });
    }
  }, [isVisible]);

  const animateCounter = (target, key) => {
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);

    const updateCounter = () => {
      start += increment;
      if (start < target) {
        setCounters((prev) => ({ ...prev, [key]: Math.floor(start) }));
        requestAnimationFrame(updateCounter);
      } else {
        setCounters((prev) => ({ ...prev, [key]: target }));
      }
    };

    updateCounter();
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Connect. Inspire. Grow Together.</h1>
          <p>Join the Alumni Network Platform and reconnect with your university community.</p>
          <div className="hero-buttons">
            <Link to="/register" className="btn btn-accent btn-lg">
              Join Now
            </Link>
            <Link to="/directory" className="btn btn-outline btn-lg" style={{ color: 'white', borderColor: 'white' }}>
              Explore Alumni
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="statistics" ref={statsRef}>
        <div className="statistics-container">
          <div className="statistics-grid">
            {stats.map((stat) => (
              <div key={stat.key} className="stat-item">
                <div className="stat-number">{counters[stat.key]}+</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="features-container">
          <div className="section-title">
            <h2>Platform Features</h2>
            <p>Everything you need to stay connected with your alumni network</p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="success-stories">
        <div className="success-stories-container">
          <div className="section-title">
            <h2>Alumni Success Stories</h2>
            <p>Inspiring journeys from our distinguished alumni</p>
          </div>
          <div className="stories-grid">
            {stories.map((story, index) => (
              <div key={index} className="story-card">
                <div className="story-avatar">{story.initials}</div>
                <h3>{story.name}</h3>
                <div className="role">{story.role}</div>
                <p>"{story.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="up-events">
        <div className="up-events-container">
          <div className="section-title">
            <h2>Upcoming Events</h2>
            <p>Don't miss out on these exciting events</p>
          </div>
          <div className="events-list">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="event-item">
                <div className="event-date">
                  <div className="month">{event.month}</div>
                  <div className="day">{event.day}</div>
                </div>
                <div className="event-info">
                  <h4>{event.title}</h4>
                  <p>{event.location}</p>
                </div>
                <Link to="/events" className="btn btn-primary btn-sm">
                  RSVP
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

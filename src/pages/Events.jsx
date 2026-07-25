import { useEffect, useState } from 'react';
import { eventsApi } from '../services/api';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await eventsApi.getAll();
        setEvents(response.events || []);
      } catch (err) {
        setError(err.message || 'Unable to load events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleRSVP = async (id) => {
    try {
      await eventsApi.rsvp(id);
      alert('RSVP submitted successfully');
    } catch (err) {
      alert(err.message || 'RSVP failed');
    }
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
      {loading ? <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading events...</p> : null}
      {error ? <p style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--danger)' }}>{error}</p> : null}
      <div className="events-grid">
        {!loading && !error && events.map(event => (
          <div key={event._id} className="event-card">
            <div className="event-card-image">{event.icon || '🎉'}</div>
            <div className="event-card-body">
              <h4>{event.title}</h4>
              <div className="event-date">📅 {event.date}</div>
              <div className="event-venue">📍 {event.venue}</div>
              <p>{event.description}</p>
              <button 
                className="btn btn-primary btn-sm"
                onClick={() => handleRSVP(event._id)}
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

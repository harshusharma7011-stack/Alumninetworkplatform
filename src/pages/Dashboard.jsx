import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { currentUser, userData } = useAuth();
  const userName = userData?.fullName || currentUser?.name || 'User';

  const quickActions = [
    { icon: '👤', label: 'Profile', path: '/profile' },
    { icon: '👥', label: 'Directory', path: '/directory' },
    { icon: '💼', label: 'Jobs', path: '/jobs' },
    { icon: '📅', label: 'Events', path: '/events' },
    { icon: '🤝', label: 'Mentorship', path: '/mentorship' },
    { icon: '📢', label: 'Announcements', path: '/announcements' },
  ];

  const stats = [
    { icon: '🔗', value: 24, label: 'Connections' },
    { icon: '📝', value: 8, label: 'Applied Jobs' },
    { icon: '🎉', value: 5, label: 'Registered Events' },
    { icon: '🎓', value: 3, label: 'Mentorship Requests' },
  ];

  const activities = [
    { icon: '🎉', title: 'You RSVPed for Annual Alumni Meet', description: "Don't forget to mark your calendar!", time: '2 hours ago' },
    { icon: '🔗', title: 'You connected with Rohit Sharma', description: 'Start a conversation to build your network.', time: '1 day ago' },
    { icon: '📝', title: 'You applied for Software Engineer at Google', description: 'Good luck with your application!', time: '3 days ago' },
    { icon: '🤝', title: 'Mentorship request accepted', description: 'Anjali Gupta is now your mentor.', time: '5 days ago' },
  ];

  const upcomingEvents = [
    { title: 'Annual Alumni Meet', date: 'Dec 15, 2024' },
    { title: 'Tech Talk: AI in Industry', date: 'Dec 20, 2024' },
    { title: 'Career Guidance Webinar', date: 'Jan 5, 2025' },
  ];

  const notifications = [
    { icon: '📢', title: 'New job posting at Microsoft', description: 'Check out the latest opportunities', unread: true },
    { icon: '🎉', title: 'Event reminder: Annual Meet', description: 'Event starts in 2 days', unread: false },
    { icon: '🔗', title: 'New connection request', description: 'Rahul Kumar wants to connect', unread: false },
  ];

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="dashboard-container">
      {/* Welcome Card */}
      <div className="welcome-card">
        <h1>Hello {userName} 👋</h1>
        <p>Welcome back to your alumni dashboard. Stay connected and explore new opportunities.</p>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>Quick Actions</h2>
        <div className="quick-actions-grid">
          {quickActions.map((action) => (
            <Link key={action.label} to={action.path} className="quick-action-btn">
              <span className="icon">{action.icon}</span>
              <span>{action.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Dashboard Stats */}
      <div className="dashboard-stats">
        <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>Your Statistics</h2>
        <div className="stats-grid">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="dashboard-content">
        {/* Activity Feed */}
        <div className="activity-feed">
          <h3>Recent Activity</h3>
          {activities.map((activity, index) => (
            <div key={index} className="activity-item">
              <div className="activity-icon">{activity.icon}</div>
              <div className="activity-content">
                <h4>{activity.title}</h4>
                <p>{activity.description}</p>
                <span className="activity-time">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="sidebar">
          {/* Profile Card */}
          <div className="sidebar-card profile-card">
            <div className="profile-avatar">{getInitials(userName)}</div>
            <h4>{userName}</h4>
            <div className="role">{userData?.jobRole || 'Alumni'}</div>
            <div className="profile-stats">
              <div className="profile-stat">
                <div className="value">24</div>
                <div className="label">Connections</div>
              </div>
              <div className="profile-stat">
                <div className="value">8</div>
                <div className="label">Jobs</div>
              </div>
              <div className="profile-stat">
                <div className="value">5</div>
                <div className="label">Events</div>
              </div>
            </div>
            <Link to="/profile" className="btn btn-primary btn-sm">View Profile</Link>
          </div>

          {/* Upcoming Events */}
          <div className="sidebar-card">
            <h3>Upcoming Events</h3>
            {upcomingEvents.map((event, index) => (
              <div key={index} className="event-sidebar-item">
                <h4>{event.title}</h4>
                <div className="date">{event.date}</div>
              </div>
            ))}
            <Link to="/events" className="btn btn-outline btn-sm" style={{ width: '100%' }}>
              View All Events
            </Link>
          </div>

          {/* Notifications */}
          <div className="sidebar-card">
            <h3>Notifications</h3>
            {notifications.map((notification, index) => (
              <div key={index} className={`notification-item ${notification.unread ? 'unread' : ''}`}>
                <div className="notification-icon">{notification.icon}</div>
                <div className="notification-content">
                  <h4>{notification.title}</h4>
                  <p>{notification.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

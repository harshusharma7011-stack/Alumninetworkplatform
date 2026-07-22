import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent successfully!');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div>
      {/* Contact Header */}
      <div className="contact-header">
        <div className="container text-center">
          <h1>Contact Us</h1>
          <p>Get in touch with the alumni network team</p>
        </div>
      </div>

      {/* Contact Container */}
      <div className="contact-container">
        {/* Contact Form */}
        <div className="contact-form">
          <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>Send us a message</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Subject</label>
              <input
                type="text"
                name="subject"
                className="form-control"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea
                name="message"
                className="form-control"
                placeholder="Your message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Send Message</button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="contact-info">
          <div className="contact-info-card">
            <div className="icon">📧</div>
            <h4>Email</h4>
            <p>alumni@university.edu</p>
          </div>
          <div className="contact-info-card">
            <div className="icon">📞</div>
            <h4>Phone</h4>
            <p>+91 12345 67890</p>
          </div>
          <div className="contact-info-card">
            <div className="icon">📍</div>
            <h4>Address</h4>
            <p>University Campus, Main Building</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

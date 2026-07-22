const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-section">
            <h4>About</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/directory">Alumni Directory</a></li>
              <li><a href="/jobs">Job Board</a></li>
              <li><a href="/mentorship">Mentorship</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <ul>
              <li><a href="/contact">Get in Touch</a></li>
              <li><a href="/contact">Support</a></li>
              <li><a href="/contact">Feedback</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Cookie Policy</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Follow Us</h4>
            <ul>
              <li><a href="#">LinkedIn</a></li>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {currentYear} Alumni Network Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

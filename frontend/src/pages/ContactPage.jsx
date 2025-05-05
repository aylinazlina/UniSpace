import React from 'react';

const ContactPage = () => {
  // Define all styles as objects for inline styling
  const styles = {
    container: {
      padding: '2rem',
      maxWidth: '900px',
      margin: 'auto',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: '#333',
      boxSizing: 'border-box'
    },
    header: {
      textAlign: 'center',
      marginBottom: '2.5rem',
      position: 'relative'
    },
    mainTitle: {
      fontSize: '2.5rem',
      color: '#2c3e50',
      marginBottom: '0.75rem',
      position: 'relative',
      display: 'inline-block'
    },
    titleUnderline: {
      content: '""',
      position: 'absolute',
      bottom: '-10px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '80px',
      height: '4px',
      background: 'linear-gradient(90deg, #3498db, #6a11cb)',
      borderRadius: '2px'
    },
    subtitle: {
      fontSize: '1.1rem',
      color: '#7f8c8d',
      maxWidth: '650px',
      margin: '1.5rem auto',
      lineHeight: '1.6'
    },
    contentWrapper: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: '2rem',
      marginTop: '2rem'
    },
    infoSection: {
      flex: '1 1 400px',
      backgroundColor: 'white',
      borderRadius: '10px',
      padding: '2rem',
      boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
    },
    formSection: {
      flex: '1 1 400px',
      backgroundColor: 'white',
      borderRadius: '10px',
      padding: '2rem',
      boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
    },
    sectionTitle: {
      fontSize: '1.5rem',
      marginBottom: '1.5rem',
      color: '#2c3e50',
      borderBottom: '2px solid #ecf0f1',
      paddingBottom: '0.75rem'
    },
    contactItem: {
      display: 'flex',
      alignItems: 'flex-start',
      marginBottom: '1.25rem'
    },
    icon: {
      width: '20px',
      height: '20px',
      marginRight: '12px',
      color: '#3498db',
      marginTop: '4px'
    },
    contactLabel: {
      fontWeight: 'bold',
      marginRight: '8px',
      color: '#34495e'
    },
    contactDetail: {
      color: '#7f8c8d'
    },
    mapSection: {
      marginTop: '2rem',
      borderRadius: '10px',
      overflow: 'hidden',
      boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
    },
    mapPlaceholder: {
      backgroundColor: '#f5f7fa',
      height: '300px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#95a5a6',
      borderRadius: '10px'
    },
    formInput: {
      width: '100%',
      padding: '0.75rem',
      marginBottom: '1rem',
      borderRadius: '4px',
      border: '1px solid #ddd',
      fontSize: '1rem',
      fontFamily: 'inherit'
    },
    formTextarea: {
      width: '100%',
      padding: '0.75rem',
      marginBottom: '1rem',
      borderRadius: '4px',
      border: '1px solid #ddd',
      fontSize: '1rem',
      fontFamily: 'inherit',
      minHeight: '120px',
      resize: 'vertical'
    },
    submitButton: {
      backgroundColor: '#3498db',
      color: 'white',
      padding: '0.75rem 1.5rem',
      border: 'none',
      borderRadius: '4px',
      fontSize: '1rem',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease',
      fontWeight: '600'
    },
    address: {
      lineHeight: '1.6',
      marginTop: '0.5rem'
    },
    footer: {
      marginTop: '3rem',
      textAlign: 'center',
      fontSize: '0.9rem',
      color: '#95a5a6'
    }
  };

  // SVG icons for contact info
  const emailIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={styles.icon}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
  );

  const phoneIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={styles.icon}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
    </svg>
  );

  const locationIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={styles.icon}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    alert("Message sent! We'll get back to you soon.");
  };

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <div style={styles.header}>
        <h1 style={styles.mainTitle}>
          Contact Us
          <div style={styles.titleUnderline}></div>
        </h1>
        <p style={styles.subtitle}>
          <strong>UniSpace</strong> is an intelligent university space management platform designed to help
          students and staff discover, book, and navigate rooms like lecture halls, labs, seminar rooms,
          and auditoriums efficiently.
        </p>
      </div>

      {/* Main Content */}
      <div style={styles.contentWrapper}>
        {/* Contact Information Section */}
        <div style={styles.infoSection}>
          <h2 style={styles.sectionTitle}>Get in Touch</h2>

          <div style={styles.contactItem}>
            {emailIcon}
            <div>
              <span style={styles.contactLabel}>Email:</span>
              <span style={styles.contactDetail}>unispace.support@example.com</span>
            </div>
          </div>

          <div style={styles.contactItem}>
            {phoneIcon}
            <div>
              <span style={styles.contactLabel}>Phone:</span>
              <span style={styles.contactDetail}>+91 98765 43210</span>
            </div>
          </div>

          <div style={styles.contactItem}>
            {locationIcon}
            <div>
              <span style={styles.contactLabel}>Office Address:</span>
              <div style={styles.address}>
                UniSpace Headquarters<br />
                2nd Floor, Innovation Hub<br />
                Tech Park Road, Bangalore, India
              </div>
            </div>
          </div>

          {/* Map Placeholder - could be replaced with an actual map component */}
          <div style={styles.mapSection}>
            <div style={styles.mapPlaceholder}>
              <p>Interactive Map Coming Soon</p>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div style={styles.formSection}>
          <h2 style={styles.sectionTitle}>Send Us a Message</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              style={styles.formInput}
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              style={styles.formInput}
              required
            />
            <input
              type="text"
              placeholder="Subject"
              style={styles.formInput}
            />
            <textarea
              placeholder="Your Message"
              style={styles.formTextarea}
              required
            ></textarea>
            <button type="submit" style={styles.submitButton}>
              Send Message
            </button>
          </form>
        </div>
      </div>

      <div style={styles.footer}>
        <p>© {new Date().getFullYear()} UniSpace. All rights reserved.</p>
      </div>
    </div>
  );
};

export default ContactPage;
import React from "react"

const Footer = () => (
    <footer style={{
      backgroundColor: 'var(--secondary-color)',
      textAlign: 'center',
      padding: '10px',
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100%',
      fontSize: '0.9rem',
    }}>
      &copy; {new Date().getFullYear()} UserApp. All rights reserved.
    </footer>
  );
  export default Footer;
  
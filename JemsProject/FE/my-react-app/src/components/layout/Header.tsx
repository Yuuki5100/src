import React from "react"

type HeaderProps = {
    toggleSidebar: () => void;
  };
  
  const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => (
    <header style={{
      height: 'var(--header-height)',
      backgroundColor: 'var(--primary-color)',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      padding: '0 20px',
      justifyContent: 'space-between'
    }}>
      <h1 style={{ margin: 0, fontSize: '1.2rem' }}>ユーザー管理システム</h1>
      <button
        onClick={toggleSidebar}
        style={{
          background: 'transparent',
          border: 'none',
          color: 'white',
          fontSize: '1.5rem',
          display: 'none',
        }}
        className="hamburger"
      >
        &#9776;
      </button>
    </header>
  );
  export default Header;
  
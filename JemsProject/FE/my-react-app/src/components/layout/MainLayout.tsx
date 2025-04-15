import React from "react"
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { ReactNode, useState } from 'react';

const MainLayout = ({ children }: { children: ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div style={{ display: 'flex', flex: 1, position: 'relative' }}>
        <Sidebar open={sidebarOpen} />
        <main style={{ padding: '20px', flexGrow: 1 }}>{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;

import React from "react"
import { Link } from 'react-router-dom';

type SidebarProps = {
  open: boolean;
};

const Sidebar: React.FC<SidebarProps> = ({ open }) => (
  <aside className={open ? 'open' : ''} style={{
    width: 'var(--sidebar-width)',
    backgroundColor: 'var(--secondary-color)',
    padding: '20px',
    height: '100%',
    boxSizing: 'border-box',
    minHeight: 'calc(100vh - var(--header-height))',
  }}>
    <nav>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li><Link to="/">ホーム</Link></li>
        <li><Link to="/users/search">ユーザー検索</Link></li>
        <li><Link to="/admin/dashboard">管理ダッシュボード</Link></li>
      </ul>
    </nav>
  </aside>
);

export default Sidebar;

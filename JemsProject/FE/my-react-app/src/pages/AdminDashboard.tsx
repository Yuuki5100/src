import { useEffect, useState } from 'react';
import axiosClient from '../lib/axiosClient';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const [userCount, setUserCount] = useState(0);
  const [recentUsers, setRecentUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const userRes = await axiosClient.get('/admin/user-stats');
        setUserCount(userRes.data.total);

        const recentRes = await axiosClient.get('/admin/recent-users');
        setRecentUsers(recentRes.data);
      } catch (err) {
        console.error('管理者情報の取得に失敗しました', err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h2>管理者ダッシュボード</h2>
      <p>登録ユーザー数: {userCount}</p>

      <h3>最近登録されたユーザー</h3>
      <ul>
        {recentUsers.map(user => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name} ({user.email})</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;

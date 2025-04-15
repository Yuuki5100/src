import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosClient from '../lib/axiosClient';
import { showError, showSuccess } from '../lib/toast';

const AVAILABLE_ROLES = ['USER', 'ADMIN', 'MODERATOR'];

const UserRoleEditPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [roles, setRoles] = useState<string[]>([]);
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosClient.get(`/users/${id}`);
        setName(res.data.name);
        setRoles(res.data.roles || []);
      } catch (err) {
        showError('ユーザー情報の取得に失敗しました');
      }
    };
    fetchUser();
  }, [id]);

  const handleToggleRole = (role: string) => {
    if (roles.includes(role)) {
      setRoles(roles.filter(r => r !== role));
    } else {
      setRoles([...roles, role]);
    }
  };

  const handleSave = async () => {
    try {
      await axiosClient.put(`/admin/users/${id}/roles`, { roles });
      showSuccess('ロールを更新しました');
      navigate(`/users/${id}`);
    } catch (err) {
      showError('ロールの更新に失敗しました');
    }
  };

  return (
    <div>
      <h2>{name} さんのロール編集</h2>
      <ul>
        {AVAILABLE_ROLES.map(role => (
          <li key={role}>
            <label>
              <input
                type="checkbox"
                checked={roles.includes(role)}
                onChange={() => handleToggleRole(role)}
              />
              {role}
            </label>
          </li>
        ))}
      </ul>
      <button onClick={handleSave}>保存</button>
    </div>
  );
};

export default UserRoleEditPage;

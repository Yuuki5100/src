import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axiosClient from '../lib/axiosClient';

const UserEditPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '' });

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axiosClient.get(`/users/${id}`);
      setForm({ name: res.data.name, email: res.data.email });
    };
    fetchUser();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axiosClient.put(`/users/${id}`, form);
      showSuccess('ユーザー情報を更新しました');
      navigate(`/users/${id}`);
    } catch (err) {
      showError('更新に失敗しました');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>ユーザー情報の編集</h2>
      <input
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
        placeholder="名前"
      />
      <input
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
        placeholder="メール"
      />
      <button type="submit">更新</button>
    </form>
  );
};

export default UserEditPage;

import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import MainLayout from '../components/layout/MainLayout';
import axiosClient from '../lib/axiosClient';
// 共通 axios 設定を使用

// ユーザー型定義 
type User = {
  id: string;
  name: string;
  email: string;
  roles: string[];
};


const UserSearchPage: React.FC = () => {
  const [results, setResults] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'roles' | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [roleFilter, setRoleFilter] = useState<string>('ALL');


  // ユーザー検索API呼び出し 
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosClient.get<User[]>('/users/search', { params: { q: searchTerm } });
        setResults(res.data);
      } catch (error) {
        console.error('ユーザー取得に失敗しました。', error);
      }
    };


    fetchUsers();


  }, [searchTerm]);


  // ソート処理 
  const handleSort = (key: 'name' | 'roles') => {
    if (sortBy === key) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(key);
      setSortOrder('asc');
    }
  };


  const sortedResults = [...results].sort((a, b) => {
    if (!sortBy) return 0;
    const aValue = sortBy === 'name' ? a.name : (a.roles || []).join(',');
    const bValue = sortBy === 'name' ? b.name : (b.roles || []).join(',');


    return sortOrder === 'asc'
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);

  });


  // フィルタリング 
  const filteredResults = sortedResults.filter(user => roleFilter === 'ALL' || (user.roles || []).includes(roleFilter));


  // ロール一覧取得（重複なし） 
  const uniqueRoles = Array.from(new Set(results.flatMap(u => u.roles || [])));


  // CSV ダウンロード処理 
  const handleDownloadCSV = () => {
    const header = ['名前', 'メール', 'ロール'];
    const rows = filteredResults.map(user => [
      user.name,
      user.email,
      (user.roles || []).join(' | ')
    ]);
    const csvContent = [header, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'users.csv';
    link.click();
  }


  return (
    <MainLayout>
      <h2>ユーザー検索</h2>
      {/* 検索・フィルター・CSV操作 */}
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="名前・メールで検索"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ marginRight: '10px' }}
        />

        <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)}>
          <option value="ALL">すべてのロール</option>
          {uniqueRoles.map(role => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>

        <button onClick={handleDownloadCSV} style={{ marginLeft: '10px' }}>
          CSVダウンロード
        </button>
      </div>

      {/* 検索結果表示 */}
      {filteredResults.length === 0 ? (
        <p>ユーザーが見つかりませんでした。</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort('name')}>
                名前 {sortBy === 'name' && (sortOrder === 'asc' ? '▲' : '▼')}
              </th>
              <th>メール</th>
              <th onClick={() => handleSort('roles')}>
                ロール {sortBy === 'roles' && (sortOrder === 'asc' ? '▲' : '▼')}
              </th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {filteredResults.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.roles.map(role => (
                    <span key={role} style={{
                      display: 'inline-block',
                      backgroundColor: '#e0f2f1',
                      color: '#2e7d32',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      marginRight: '4px',
                      fontSize: '0.8em'
                    }}>
                      {role}
                    </span>
                  ))}
                </td>
                <td>
                  <Link to={`/users/${user.id}`}>詳細</Link>{' | '}
                  <Link to={`/admin/users/${user.id}/roles`}>ロール編集</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </MainLayout>
  );

};


export default UserSearchPage;
import React, { useEffect, useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import axiosClient from '../lib/axiosClient';
import '../styles/moderation.css';

type ModerationItem = {
  id: string;
  name: string;
  status: 'pending' | 'approved' | 'rejected';
  reason?: string;
};

const ModerationPage: React.FC = () => {
  const [items, setItems] = useState<ModerationItem[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axiosClient.get<ModerationItem[]>('/admin/moderation');
        setItems(res.data);
      } catch (error) {
        console.error('モデレーションデータの取得に失敗しました。', error);
      }
    };

    fetchItems();
  }, []);

  const handleStatusChange = async (id: string, status: 'approved' | 'rejected') => {
    try {
      await axiosClient.patch(`/admin/moderation/${id}`, { status });
      setItems(prevItems => prevItems.map(item => 
        item.id === id ? { ...item, status } : item
      ));
    } catch (error) {
      console.error('ステータス更新に失敗しました。', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axiosClient.delete(`/admin/moderation/${id}`);
      setItems(prevItems => prevItems.filter(item => item.id !== id));
    } catch (error) {
      console.error('削除に失敗しました。', error);
    }
  };

  return (
    <MainLayout children={undefined}>
      <div className="moderation-container">
        <h2>モデレーション</h2>
        
        {items.length === 0 ? (
          <p>モデレーション対象の項目はありません。</p>
        ) : (
          <table className="moderation-table">
            <thead>
              <tr>
                <th>名前</th>
                <th>ステータス</th>
                <th>アクション</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>
                    <span className={`status ${item.status}`}>{item.status}</span>
                  </td>
                  <td>
                    {item.status === 'pending' && (
                      <>
                        <button
                          className="btn approve"
                          onClick={() => handleStatusChange(item.id, 'approved')}
                        >
                          承認
                        </button>
                        <button
                          className="btn reject"
                          onClick={() => handleStatusChange(item.id, 'rejected')}
                        >
                          非承認
                        </button>
                      </>
                    )}
                    <button
                      className="btn delete"
                      onClick={() => handleDelete(item.id)}
                    >
                      削除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </MainLayout>
  );
};

export default ModerationPage;

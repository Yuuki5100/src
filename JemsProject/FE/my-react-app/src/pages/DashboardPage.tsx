import React, { useEffect, useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import axiosClient from '../lib/axiosClient';
import '../styles/dashboard.css';


type DashboardStats = {
    totalUsers: number;
    adminCount: number;
    userCount: number;
    guestCount: number;
};


const DashboardPage: React.FC = () => {
    const [stats, setStats] = useState<DashboardStats | null>(null);


    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axiosClient.get<DashboardStats>('/admin/dashboard/stats');
                setStats(res.data);
            } catch (error) {
                console.error('統計情報の取得に失敗しました。', error);
            }
        };


        fetchStats();


    }, []);


    return (
        <MainLayout children={undefined}>
            <div className="dashboard-container">
                <h2>管理者ダッシュボード</h2>
                {!stats ? (
                    <p>読み込み中...</p>
                ) : (
                    <div className="card-grid">
                        <div className="dashboard-card">
                            <h3>ユーザー総数</h3>
                            <p>{stats.totalUsers.toLocaleString()}人</p>
                        </div>
                        <div className="dashboard-card">
                            <h3>管理者</h3>
                            <p>{stats.adminCount.toLocaleString()}人</p>
                        </div>
                        <div className="dashboard-card">
                            <h3>一般ユーザー</h3>
                            <p>{stats.userCount.toLocaleString()}人</p>
                        </div>
                        <div className="dashboard-card">
                            <h3>ゲスト</h3>
                            <p>{stats.guestCount.toLocaleString()}人</p>
                        </div>
                    </div>
                )}
            </div>
        </MainLayout>

    );
};


export default DashboardPage;

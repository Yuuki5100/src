import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import DashboardPage from '../pages/DashboardPage';
import LoginPage from '../pages/LoginPage';
import UserSearchPage from '../pages/UserSearchPage';
import UserDetailPage from '../pages/UserDetailPage';
import UserEditPage from '../pages/UserEditPage';
import AdminDashboard from '../pages/AdminDashboard';
import UserRoleEditPage from '../pages/UserRoleEditPage';
import ModerationPage from '../pages/ModerationPage';
import UnauthorizedPage from '../pages/UnauthorizedPage.tsx';
import NotFoundPage from '../pages/NotFoundPage.tsx';


import PrivateRoute from './PrivateRoute';
import AdminRoute from '../components/AdminRoute';
import RoleRoute from '../components/RoleRoute';


const AppRouter: React.FC = () => {
  return (<Routes> {/* ログイン */} <Route path="/login" element={<LoginPage />} />

    {/* ホームリダイレクト（認証後の初期遷移先） */}
    <Route path="/" element={<Navigate to="/dashboard" replace />} />

    {/* ダッシュボード（ログイン後） */}
    <Route
      path="/dashboard"
      element={
        <PrivateRoute>
          <DashboardPage />
        </PrivateRoute>
      }
    />

    {/* ユーザー検索 */}
    <Route
      path="/search"
      element={
        <PrivateRoute>
          <UserSearchPage />
        </PrivateRoute>
      }
    />

    {/* ユーザー詳細 */}
    <Route
      path="/users/:id"
      element={
        <PrivateRoute>
          <UserDetailPage />
        </PrivateRoute>
      }
    />

    {/* ユーザー編集（管理者のみ） */}
    <Route
      path="/users/:id/edit"
      element={
        <AdminRoute>
          <UserEditPage />
        </AdminRoute>
      }
    />

    {/* 管理者ダッシュボード */}
    <Route
      path="/admin"
      element={
        <RoleRoute allowedRoles={['ADMIN']}>
          <AdminDashboard />
        </RoleRoute>
      }
    />

    {/* モデレーション（モデレーター・管理者） */}
    <Route
      path="/moderation"
      element={
        <RoleRoute allowedRoles={['MODERATOR', 'ADMIN']}>
          <ModerationPage />
        </RoleRoute>
      }
    />

    {/* ユーザーロール編集（管理者のみ） */}
    <Route
      path="/admin/users/:id/roles"
      element={
        <RoleRoute allowedRoles={['ADMIN']}>
          <UserRoleEditPage />
        </RoleRoute>
      }
    />

    {/* 権限なし */}
    <Route path="/unauthorized" element={<UnauthorizedPage />} />

    {/* 404 Not Found */}
    <Route path="*" element={<NotFoundPage />} />
  </Routes>

  );
};


export default AppRouter;

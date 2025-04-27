import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { login } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const status = useAppSelector((state: { auth: { status: any; }; }) => state.auth.status);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const isAuthenticated = useAppSelector((state: { auth: { isAuthenticated: any; }; }) => state.auth.isAuthenticated);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // ここで email ではなく username を渡すように変更
        dispatch(login({ username, password }));
    };

    useEffect(() => {
        if (status === 'succeeded' && isAuthenticated) {
            navigate('/search');
        }
    }, [status, isAuthenticated]);

    return (
        <form onSubmit={handleSubmit}>
            <h2>ログイン</h2>
            <input
                type="text" // メールアドレスではなく、ユーザ名を入力するために type="text" に変更
                placeholder="ユーザ名"
                value={username}
                onChange={e => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="パスワード"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <button type="submit" disabled={status === 'loading'}>
                {status === 'loading' ? 'ログイン中...' : 'ログイン'}
            </button>
        </form>
    );
};

export default LoginPage;

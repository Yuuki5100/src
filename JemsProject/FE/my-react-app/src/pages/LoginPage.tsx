import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { login } from '../features/auth/authSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const status = useAppSelector((state: { auth: { status: any; }; }) => state.auth.status);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const isAuthenticated = useAppSelector((state: { auth: { isAuthenticated: any; }; }) => state.auth.isAuthenticated);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(login({ email, password }));
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
                type="email"
                placeholder="メールアドレス"
                value={email}
                onChange={e => setEmail(e.target.value)}
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

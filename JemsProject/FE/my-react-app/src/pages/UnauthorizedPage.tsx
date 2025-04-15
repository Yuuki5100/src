import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';


const UnauthorizedPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 text-center">
            <ShieldAlert className="text-green-600 w-16 h-16 mb-4" />
            <h1 className="text-3xl font-bold text-green-700 mb-2">アクセス権限がありません</h1>
            <p className="text-gray-700 mb-6">このページにアクセスするための権限が不足しています。</p>
            <Link to="/" className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-xl transition" > ホームへ戻る </Link>
        </div>);
};


export default UnauthorizedPage;
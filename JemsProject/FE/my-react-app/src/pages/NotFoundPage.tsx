import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';


const NotFoundPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 text-center">
            <AlertTriangle className="text-green-600 w-16 h-16 mb-4" />
            <h1 className="text-4xl font-bold text-green-700 mb-2">404 - ページが見つかりません</h1>
            <p className="text-gray-700 mb-6">お探しのページは存在しないか、URLが間違っています。</p>
            <Link to="/" className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-xl transition" > ホームへ戻る </Link>
        </div>);
};


export default NotFoundPage;
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import AppRouter from './routes/AppRouter';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter } from 'react-router-dom';


const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter> {/* ✅ これを追加 */}
        <div className="min-h-screen bg-white text-gray-800">
          <AppRouter />
          <ToastContainer
            position="top-right"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            pauseOnFocusLoss
            pauseOnHover
            draggable
            aria-label={undefined}
          />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};



export default App;

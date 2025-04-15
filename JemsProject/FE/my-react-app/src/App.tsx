import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import AppRouter from './routes/AppRouter';
import { AuthProvider } from './contexts/AuthContext';


const App: React.FC = () => {
  return (
    <AuthProvider children={undefined}>
      <div className="min-h-screen bg-white text-gray-800">
        <AppRouter />
        <ToastContainer position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          pauseOnFocusLoss
          pauseOnHover
          draggable
          aria-label={undefined} />
      </div>
    </AuthProvider>
  );
};


export default App;

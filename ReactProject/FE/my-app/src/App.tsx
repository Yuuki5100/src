import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import axios from 'axios';
import store from './stores/store';
import { Provider } from 'react-redux';
import Child from './components/Child';

function App() {
  // Spring Bootに接続（編集点ここだけ）
  useEffect(() => {
    axios.get('http://localhost:8080').then((res) => {
      console.log(res.data);
    });
  })

  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    // );
    <Provider store={store}>
      <div className="App">
        <Child />
      </div>
    </Provider> // ←これ忘れがち
  );
};

export default App;
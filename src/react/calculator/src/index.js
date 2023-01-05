import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Post from './post';
import Main from './main';
import Profile from './profile';

const root = ReactDOM.createRoot(document.getElementById('root'));

import {
  BrowserRouter,
  Routes, // instead of "Switch"
  Route,
} from "react-router-dom";


root.render(


  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/post" element={<Post />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  </BrowserRouter>
);
{/* <React.StrictMode>
    <App />
  </React.StrictMode> */}
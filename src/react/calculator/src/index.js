import React from 'react';
import ReactDOM from 'react-dom/client';
/* import './css/index.css'; */
import Post from './post';
import Main from './main';
import Profile from './profile';
import Signin from './login';
import Signup from './signup';

const root = ReactDOM.createRoot(document.getElementById('root'));

import {
  BrowserRouter,
  Routes, // instead of "Switch"
  Route,
  Link
} from "react-router-dom";

root.render(


  <BrowserRouter>
    <Routes>
      <Route path="/:username" element={<Main />} />
      <Route path="/post/:username" element={<Post />} />
      <Route path="/profile/:username/:profileusername" element={<Profile />} />
      <Route path="/login" element={<Signin />} />
      <Route path="/signup/:username" element={<Signup />} />
    </Routes>
  </BrowserRouter>
);
{/* <React.StrictMode>
    <App />
  </React.StrictMode> */}
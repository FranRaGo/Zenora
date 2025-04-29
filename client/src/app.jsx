import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Main from "./pages/MainSpace";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import LaunchPad from "./pages/LaunchPad";
import CreateWorkspace from './components/launchpad/CreateWorkspace';
import JoinWorkspace from './components/launchpad/JoinWorkspace';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={< Login />} />
        <Route path='/' element={< Main />} />
        <Route path='/signup' element={< SignUp />} />
        <Route path='/launchpad' element={< LaunchPad />} />
        <Route path='/createWorkspace' element={< CreateWorkspace />} />
        <Route path='/joinWorkspace' element={< JoinWorkspace />} />
      </Routes>
    </Router>
  );
}

export default App;

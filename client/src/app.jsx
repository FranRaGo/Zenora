import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from "./pages/MainSpace";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import LaunchPad from "./pages/LaunchPad";
import CreateWorkspace from './pages/CreateWorkspace';
import JoinWorkspace from './pages/JoinWorkspace';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={< Login />} />
        <Route path='/' element={< Home />} />
        <Route path='/signup' element={< SignUp />} />
        <Route path='/launchpad' element={< LaunchPad />} />
        <Route path='/createWorkspace' element={< CreateWorkspace />} />
        <Route path='/joinWorkspace' element={< JoinWorkspace />} />
      </Routes>
    </Router>
  );
}

export default App;

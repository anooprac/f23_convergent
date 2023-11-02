import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Patients from './pages/Patients';
import Schedule from './pages/Schedule';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />}/>
          <Route path="/patients/*" element={<Patients />} />
          <Route path="/schedule"  element={<Schedule />}/>
        </Routes>
      </div>
    </Router>
  );
  }

export default App;

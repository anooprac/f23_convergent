import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Patients from './pages/Patients';
import PatientForm from './pages/PatientForm';

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />}/>
          <Route path="/patients" element={<Patients />} />
          <Route path="/patient_form"  element={<PatientForm />}/>
        </Routes>
      </div>
    </Router>
  );
  }

export default App;

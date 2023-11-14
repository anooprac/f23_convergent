import React, { useState, useEffect } from 'react';
import PatientsLayout from '../components/PatientsLayout';
import './Patients.css';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    fetch('http://127.0.0.1:5000/')
      .then((response) => response.json())
      .then((data) => {
        const sortedPatients = data.patients.sort((a, b) => b.readmitted - a.readmitted);
        setPatients(sortedPatients);
      })
      .catch((error) => {
        console.error('Error fetching patient data:', error);
      });
  }, []);

  const handleArchive = (patientId) => {
    patientId = parseInt(patientId, 10);
    console.log('patientId:', patientId);
    fetch(`http://127.0.0.1:5000/archive/${patientId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      window.location.reload();
    })
    .catch((error) => {
      console.error('Error archiving patient:', error);
    });
  }  

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
  };
  

  //   const patientsData = [
  //   { id: 1, name: 'John Doe', age: 30, info: 'Readmitted' },
  //   { id: 2, name: 'Alice Smith', age: 45, info: 'Not readmitted' },
  //   { id: 3, name: 'Bob Johnson', age: 28, info: 'Not readmitted' },
  //   { id: 4, name: 'John Doe', age: 30, info: 'Readmitted' },
  //   { id: 5, name: 'Alice Smith', age: 45, info: 'Not readmitted' },
  //   { id: 6, name: 'Bob Johnson', age: 28, info: 'Not readmitted' },
  //   { id: 7, name: 'John Doe', age: 30, info: 'Readmitted' },
  //   { id: 8, name: 'Alice Smith', age: 45, info: 'Not readmitted' },
  //   { id: 9, name: 'Bob Johnson', age: 28, info: 'Not readmitted' },
  //   { id: 10, name: 'John Doe', age: 30, info: 'Readmitted' },
  //   { id: 11, name: 'Alice Smith', age: 45, info: 'Not readmitted' },
  //   { id: 12, name: 'Bob Johnson', age: 28, info: 'Not readmitted' },
  //   { id: 13, name: 'John Doe', age: 30, info: 'Readmitted' },
  //   { id: 14, name: 'Alice Smith', age: 45, info: 'Not readmitted' },
  //   { id: 15, name: 'Bob Johnson', age: 28, info: 'Not readmitted' },
  //   { id: 16, name: 'John Doe', age: 30, info: 'Readmitted' },
  //   { id: 17, name: 'Alice Smith', age: 45, info: 'Not readmitted' },
  //   { id: 18, name: 'Bob Johnson', age: 28, info: 'Not readmitted' },
  //   { id: 19, name: 'John Doe', age: 30, info: 'Readmitted' },
  //   { id: 20, name: 'Alice Smith', age: 45, info: 'Not readmitted' },
  //   { id: 21, name: 'Bob Johnson', age: 28, info: 'Not readmitted' },
  // ];

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PatientsLayout>
        <div className='patients_container'>
            <h2>Patients</h2>
                <input
                    type="text"
                    placeholder="Search patients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-bar"
                />
                <ul className="patient-list">
                {filteredPatients.map((patient) => (
                    <li
                    key={patient.id}
                    onClick={() => handlePatientSelect(patient)}
                    className="patient-item"
                    >
                    {patient.name}
                    <span
                      className={`risk-indicator ${patient.readmitted >= 0.5 ? 'high-risk' : 'low-risk'}`}
                    ></span>
                    </li>
                ))}
                </ul>
        </div>
        {selectedPatient && (
        <div>
            <div className="patient-box">
              <div className = "patient-box-header"> 
                <p>Patient Name : {selectedPatient.name}</p>
                <div className = "patient-risk-status"> 
                  {selectedPatient.readmitted > 0.5
                    ? 'High Risk'
                    : 'Low Risk'}
                </div>
              </div>
              <div className='patient-details'>
                <p>Name: {selectedPatient.name}</p>
                <p>Age: {selectedPatient.age}</p>
                <div className='patient-contact'>
                  <p>Contact</p>
                  <p>Phone Number (Home): </p>
                  <p>{selectedPatient.contact.home}</p>
                  <p>Phone Number (Mobile): </p>
                  <p>{selectedPatient.contact.mobile}</p>
                  <p>Email: </p>
                  <p>{selectedPatient.contact.email}</p>
                </div>
              </div>
            </div>
            <div className="archive-button-container">
              <button className="archive-button" onClick={() => handleArchive(selectedPatient.id)}>Archive</button>
            </div>
        </div>)}
    </PatientsLayout>
  );
};

export default Patients;
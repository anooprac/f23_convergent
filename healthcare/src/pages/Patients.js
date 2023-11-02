import React, { useState } from 'react';
import PatientsLayout from '../components/PatientsLayout';
import './Patients.css'

const Patients = ({ patients }) => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');


  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
  };
  

    const patientsData = [
    { id: 1, name: 'John Doe', age: 30, info: 'Readmitted' },
    { id: 2, name: 'Alice Smith', age: 45, info: 'Not readmitted' },
    { id: 3, name: 'Bob Johnson', age: 28, info: 'Not readmitted' },
    { id: 4, name: 'John Doe', age: 30, info: 'Readmitted' },
    { id: 5, name: 'Alice Smith', age: 45, info: 'Not readmitted' },
    { id: 6, name: 'Bob Johnson', age: 28, info: 'Not readmitted' },
    { id: 7, name: 'John Doe', age: 30, info: 'Readmitted' },
    { id: 8, name: 'Alice Smith', age: 45, info: 'Not readmitted' },
    { id: 9, name: 'Bob Johnson', age: 28, info: 'Not readmitted' },
    { id: 10, name: 'John Doe', age: 30, info: 'Readmitted' },
    { id: 11, name: 'Alice Smith', age: 45, info: 'Not readmitted' },
    { id: 12, name: 'Bob Johnson', age: 28, info: 'Not readmitted' },
    { id: 13, name: 'John Doe', age: 30, info: 'Readmitted' },
    { id: 14, name: 'Alice Smith', age: 45, info: 'Not readmitted' },
    { id: 15, name: 'Bob Johnson', age: 28, info: 'Not readmitted' },
    { id: 16, name: 'John Doe', age: 30, info: 'Readmitted' },
    { id: 17, name: 'Alice Smith', age: 45, info: 'Not readmitted' },
    { id: 18, name: 'Bob Johnson', age: 28, info: 'Not readmitted' },
    { id: 19, name: 'John Doe', age: 30, info: 'Readmitted' },
    { id: 20, name: 'Alice Smith', age: 45, info: 'Not readmitted' },
    { id: 21, name: 'Bob Johnson', age: 28, info: 'Not readmitted' },
  ];

  const filteredPatients = patientsData.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PatientsLayout>
        <div>
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
                    </li>
                ))}
                </ul>
        </div>
        <div>
            {selectedPatient && (
            <div> 
            <h2>Details</h2>
            <div className='patient-details'>
            <p>Name: {selectedPatient.name}</p>
            <p>Age: {selectedPatient.age}</p>
            <p>Info: {selectedPatient.info}</p>
            </div>
            </div>
            )}
        </div>
      
    </PatientsLayout>
  );
};

export default Patients;


import React, { useEffect, useState } from 'react';
import PatientsLayout from '../components/PatientsLayout';
import './Patients.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await fetch('http://localhost:3001/patients');
      if (response.ok) {
        const data = await response.json();
        setPatients(data.data);
      } else {
        console.error('Failed to fetch patients.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
  };

  const handleDeletePatient = async () => {
    if (!selectedPatient) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/patients/${selectedPatient.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Patient deleted successfully', { position: 'bottom-right' });
        setSelectedPatient(null);
        fetchPatients();
      } else {
        toast.error('Failed to delete patient', { position: 'bottom-right' });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while deleting the patient', { position: 'bottom-right' });
    }
  };
  

  //   const patients = [
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
        <div>
            <h2>PATIENTS</h2>
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
            <h2>DETAILS</h2>
            <div className='patient-details'>
            <p>Name: {selectedPatient.name}</p>
            <p>Age: {selectedPatient.age}</p>
            <p>Info: {selectedPatient.info}</p>
            </div>
            </div>
            )}
            {selectedPatient && (
              <button className="delete-button" onClick={handleDeletePatient}>
                Delete Patient
              </button>
            )}
        </div>
      
    </PatientsLayout>
  );
};

export default Patients;


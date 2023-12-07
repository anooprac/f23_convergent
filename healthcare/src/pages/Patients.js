import React, { useState, useEffect } from 'react';
import PatientsLayout from '../components/PatientsLayout';
import PatientsLayout1 from '../components/PatientsLayout1';
import './Patients.css';
import arrowImage from './arrow.png'
import PatientsSummaryCard from '../components/PatientsSummaryCard';
import Recommendations from '../components/Recommendation';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');  
  const [showMedicalHistory, setShowMedicalHistory] = useState(false);
  const [showTests, setShowTests] = useState(false);
  const [showMedications, setShowMedications] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

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

  const handleMedicalHistoryClick = (val) => {
    setShowMedicalHistory(val); 
  };

  const handleTestsClick = (val) => {
    setShowTests(val); 
  };

  const handleMedicationsClick = (val) => {
    setShowMedications(val); 
  };

  const handleNotesClick = (val) => {
    setShowNotes(val); 
  };

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!selectedPatient) {
    return (
      <div>
      <div className='top-bar'>
          <input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-bar"
            />
        </div>
      <PatientsLayout1>
        <div className="patients-container">
          
          <ul className="patient-list">
            {filteredPatients.map((patient) => (
              <li
                key={patient.id}
                onClick={() => handlePatientSelect(patient)}
                className="patient-item"
              > 
              <span
                className={`risk-indicator ${patient.readmitted >= 0.5 ? 'high-risk' : 'low-risk'}`}
              ></span>
              <div className='patient_text' style={{fontSize: '18px', width: '300px', fontWeight: '400'}}>{patient.name}</div>
              <div className='patient_text'>{patient.age}</div>
              <div className='patient_text'>{patient.gender}</div>
              <div className='patient_text'>{patient.diagnosis}</div>
              <div className='patient_text' style={{textAlign:'right', fontSize: '15px', fontWeight: '700'}}>{patient.readmitted >= 0.5 ? 'High' : 'Low'}</div>
              </li>
            ))}
          </ul>
        </div>
        <PatientsSummaryCard></PatientsSummaryCard>
      </PatientsLayout1>
      </div>
    );
  } else {
    return (
      <PatientsLayout>
      <div className='patients_container'>
        <div className='top-bar'>
          <input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-bar"
              style={{width: '80%'}}
            />
        </div>
              <ul className="patient-list">
              {filteredPatients.map((patient) => (
                  <li
                  key={patient.id}
                  onClick={() => handlePatientSelect(patient)}
                  className="patient-item"
                  >
                  <div className='patient_text' style={{fontSize: '18px', fontWeight: '400', marginLeft: '10px', width: '140px'}}>{patient.name}</div>
                  <div className='patient_text' style={{textAlign:'right', fontSize: '15px', fontWeight: '700', marginRight: '10px'}}>{patient.readmitted >= 0.5 ? 'High' : 'Low'}</div>
                  </li>
              ))}
              </ul>
      </div>
      <div>
      {selectedPatient && !showMedicalHistory && !showTests && !showMedications && !showNotes && (
      <div>
          <div className="archive-button-container">
            <button style={{marginLeft: '80px'}} className='archive-button' onClick={() => setSelectedPatient(null)}>Back</button>
            <button style={{marginLeft: '780px'}} className="archive-button" onClick={() => handleArchive(selectedPatient.id)}>Archive</button>
          </div>
          <div className="patient-box">
            <div className = "patient-box-header"> 
              <p style={{width: '250px'}}>Patient Name : {selectedPatient.name}</p>
              <div className = "patient-risk-status"> 
                {(selectedPatient.readmitted * 100).toFixed(2)}%
              </div>
              <p style={{fontSize: '17px', marginRight: '40px', marginLeft:'0px'}}>Diagnosis</p>
              <p style={{fontSize: '17px', marginRight: '80px', marginLeft:'40px', marginRight: '10px'}}>Contact</p>
            </div>
            <div className='patient-details' style={{marginTop: '-20px'}}>
              <p style={{padding: '20px', marginLeft: '0px', width: '250px'}}>Gender: {selectedPatient.gender}</p>
              <p style={{padding: '20px', width: '250px', marginLeft: '30px'}}>Age: {selectedPatient.age}</p>
              <p style={{width: '200px', marginLeft: '-10px', fontSize: '12px', color: '#6a8f86', marginTop: '-5px'}}>{selectedPatient.diagnosis}</p>
              <div className='patient-contact' style={{justifyContent: 'right', textAlign: 'right', width: '200px', paddingRight: '30px', marginTop: '-15px'}}>
                <p style={{fontSize: '12px', color: '#6a8f86'}}>Phone Number (Home): </p>
                <p style={{fontSize: '12px', color: '#6a8f86'}}>{selectedPatient.contact.home}</p>
                <p style={{fontSize: '12px', color: '#6a8f86'}}>Phone Number (Mobile): </p>
                <p style={{fontSize: '12px', color: '#6a8f86'}}>{selectedPatient.contact.mobile}</p>
                <p style={{fontSize: '12px', color: '#6a8f86'}}>Email: </p>
                <p style={{fontSize: '12px', color: '#6a8f86'}}>{selectedPatient.contact.email}</p>
              </div>
            </div>
          </div>
          <div class="horizontal-line"></div>
          <div className="bottom-half">
            <Recommendations selectedPatient={selectedPatient}></Recommendations>
            <div className='links-container'>
                <div className="link" style={{marginBottom: '10px'}} onClick={()=> handleMedicalHistoryClick(true)}>
                  <p>Medical History</p>
                  <img className="arrow" src={arrowImage}/>
                </div>
                <div className="link" style={{marginBottom: '10px'}} onClick={()=> handleNotesClick(true)}>
                  <p>Notes</p>
                  <img className="arrow" src={arrowImage}/>
                </div>
                <div className="link" style={{marginBottom: '10px'}} onClick={()=> handleMedicationsClick(true)}>
                  <p>Medications</p>
                  <img className="arrow" src={arrowImage}/>
                </div>
                <div className="link" onClick={()=> handleTestsClick(true)}>
                  <p>Tests</p>
                  <img className="arrow" src={arrowImage}/>
                </div>
            </div>
          </div>
      </div>)}
      {selectedPatient && showMedicalHistory && !showTests && !showMedications && !showNotes && (
        <div>
          <div className="archive-button-container">
            <button style={{marginLeft: '80px'}} className='archive-button' onClick={() => handleMedicalHistoryClick(false)}>Back</button>
          </div>
          <div style= {{padding: '30px 80px'}}> 
            <p>Days in Hospital: {selectedPatient.time_in_hospital}</p>
            <p>Number of Lab Procedures: {selectedPatient.num_lab_procedures}</p>
            <p>Number of Procedures: {selectedPatient.num_procedures}</p>
            <p>Number of Diagnoses: {selectedPatient.num_diagnoses}</p>
            <p>Admission Type: {selectedPatient.admission}</p>
            <p>Admission Source: {selectedPatient.admission_source}</p>
            <p>Discharge Type: {selectedPatient.discharge}</p>
          </div>
        </div>
      )}
      {selectedPatient && !showMedicalHistory && showTests && !showMedications && !showNotes && (
        <div>
          <div className="archive-button-container">
            <button style={{marginLeft: '80px'}} className='archive-button' onClick={() => handleTestsClick(false)}>Back</button>
          </div>
          <div style= {{padding: '30px 80px'}}> 
            <p>A1C Result: {selectedPatient.A1Cresult}</p>
            <p>Max Glu Serum Result: {selectedPatient.max_glu_serum}</p>
          </div>
        </div>
      )}
      {selectedPatient && !showMedicalHistory && !showTests && showMedications && !showNotes && (
        <div>
          <div className="archive-button-container">
            <button style={{marginLeft: '80px'}} className='archive-button' onClick={() => handleMedicationsClick(false)}>Back</button>
          </div>
          <div style= {{padding: '30px 80px'}}> 
            <p>Insulin: {selectedPatient.insulin}</p>
            <p>Metformin: {selectedPatient.metformin}</p>
            <p>Diabetes Medication Prescribed: {selectedPatient.diabetesMed}</p>
            <p>Change in Diabetic Medications: {selectedPatient.change}</p>
          </div>
        </div>
      )}
      {selectedPatient && !showMedicalHistory && !showTests && !showMedications && showNotes && (
        <div>
          <div className="archive-button-container">
            <button style={{marginLeft: '80px'}} className='archive-button' onClick={() => handleNotesClick(false)}>Back</button>
          </div>
          <div style= {{padding: '30px 80px'}}> 
            <p>Doctor's Notes: None</p>
          </div>
        </div>
      )}
      </div>
      </PatientsLayout>
    );
  }
};

export default Patients;
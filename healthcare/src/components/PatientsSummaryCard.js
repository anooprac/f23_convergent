import React, { useState, useEffect } from 'react';
import './PatientsSummary.css';

const PatientsSummaryCard = () => {
  const [percentage, setPercentage] = useState(0);
  const [topPatients, setTopPatients] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/patients/total')
      .then((response) => response.json())
      .then((data) => {
        const totalPatients = data.total_patients;
        const unarchivedPatients = data.unarchived_patients;
        const calculatedPercentage = 100 - (unarchivedPatients / totalPatients) * 100;
        setPercentage(calculatedPercentage);
      })
      .catch((error) => {
        console.error('Error fetching patient summary:', error);
      });

    fetch('http://127.0.0.1:5000/')
      .then((response) => response.json())
      .then((data) => {
        const sortedPatients = data.patients.sort((a, b) => b.readmitted - a.readmitted);
        setTopPatients(sortedPatients.slice(0, 8));
      })
      .catch((error) => {
        console.error('Error fetching top patients:', error);
      });
    }, []);


return (
    <div className="card">
      <h2>Patients Contacted</h2>
      <div className="progress-circle" style={{transform: 'rotate(360deg)'}}>
        <svg className="progress-ring" width="300" height="300">
          <circle
            className="progress-ring-circle"
            strokeWidth="30"
            fill="transparent"
            r="90"
            cx="150"
            cy="120"
          />
          <circle
            className="progress-ring-fill"
            strokeWidth="30"
            fill="transparent"
            r="90"
            cx="180"
            cy="150"
            style={{
              strokeDasharray: `${percentage / 100 * 566} 720`,
              transform: 'rotate(-90deg)'
            }}
          />
        </svg>
        <p id="progress-text" style={{ textAlign: 'center', marginTop: '10px', marginLeft: '-25px' }}>
          {percentage.toFixed(0)}%
        </p>
      </div>
      {/* <div className="patients-list">
        {topPatients.map((patient, index) => (
          <div key={index} className="patient">
            <span
                className={`risk-indicator ${patient.readmitted >= 0.5 ? 'high-risk' : 'low-risk'}`}
            ></span>
            <span className="patient-name">{patient.name}</span>
            <button className="contact-button">Contact Now</button>
          </div>
        ))}
      </div> */}
    </div>
  );

};

export default PatientsSummaryCard;

import React, { useState } from 'react';
import './PatientForm.css';

const PatientForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    info: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/patients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Patient added successfully.');
        setFormData({
          name: '',
          age: '',
          info: '',
        });
      } else {
        alert('Failed to add patient.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while adding the patient.');
    }
  };

  return (
    <div className="patient-form">
      <h1>Add Patient</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="info">Info:</label>
        <input
          type="text"
          id="info"
          name="info"
          value={formData.info}
          onChange={handleInputChange}
          required
        />

        <button type="submit">Add Patient</button>
      </form>
    </div>
  );
};

export default PatientForm;

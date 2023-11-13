import React, { useState } from 'react';
import './Schedule.css';

function Schedule() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    home: '',
    age: '5',
    time_in_hospital: '0',
    num_lab_procedures: '0',
    num_procedures: '0',
    num_medications: '0',
    num_diagnoses: '0',
    change: '0',
    diabetesMed: '0',
    Admission: 'admission_type_id_Emergency',
    Discharge: 'discharge_disposition_id_Home',
    'Admission source': 'admission_source_id_Emergency Room',
    Metformin: 'metformin_Steady',
    Insulin: 'insulin_Steady',
    Diagnosis: 'diag_1_Other',
    A1Cresult: 'A1Cresult_Norm',
    Max_glu_serum: 'max_glu_serum_Norm',
    Gender: 'gender_Male',
    Race: 'race_Other'
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const newValue = type === 'number' ? parseFloat(value) : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://127.0.0.1:5000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error submitting form:', error);
      });
  };

  const admissionOptions = [
    { value: 'admission_type_id_Elective', label: 'Elective' },
    { value: 'admission_type_id_Emergency', label: 'Emergency' },
    { value: 'admission_type_id_Newborn', label: 'Newborn' },
    { value: 'admission_type_id_Other', label: 'Other' },
  ];

  const dischargeOptions = [
    { value: "discharge_disposition_id_Home", label: 'Home' },
    { value: "discharge_disposition_id_Other", label: 'Other' },
  ];

  const admissionSourceOptions = [
    { value: 'admission_source_id_Emergency Room', label: 'Emergency Room' },
    { value: 'admission_source_id_Other', label: 'Other' },
    { value: 'admission_source_id_Physician Referral', label: 'Physician Referral' },
  ];

  const metforminOptions = [
    { value: 'metformin_Down', label: 'Down' },
    { value: 'metformin_No', label: 'No' },
    { value: 'metformin_Steady', label: 'Steady' },
    { value: 'metformin_Up', label: 'Up' },
  ];

  const insulinOptions = [
    { value: 'insulin_Down', label: 'Down' },
    { value: 'insulin_No', label: 'No' },
    { value: 'insulin_Steady', label: 'Steady' },
    { value: 'insulin_Up', label: 'Up' },
  ];

  const diagnosisOptions = [
    { value: 'diag_1_Circulatory', label: 'Circulatory' },
    { value: 'diag_1_Digestive', label: 'Digestive' },
    { value: 'diag_1_Endocrine', label: 'Endocrine' },
    { value: 'diag_1_Genitourinary', label: 'Genitourinary' },
    { value: 'diag_1_Infectious', label: 'Infectious' },
    { value: 'diag_1_Musculoskeletal', label: 'Musculoskeletal' },
    { value: 'diag_1_Neoplasms', label: 'Neoplasms' },
    { value: 'diag_1_Nervous', label: 'Nervous' },
    { value: 'diag_1_Other', label: 'Other' },
    { value: 'diag_1_Respiratory', label: 'Respiratory' },
    { value: 'diag_1_Symptoms', label: 'Symptoms' },
  ];

  const genderOptions = [
    { value: 'gender_Male', label: 'Male' },
    { value: 'gender_Female', label: 'Female' }
  ];
  
  const raceOptions = [
    { value: 'race_Caucasian', label: 'Caucasian' },
    { value: 'race_AfricanAmerican', label: 'African American' },
    { value: 'race_Hispanic', label: 'Hispanic' },
    { value: 'race_Asian', label: 'Asian' },
    { value: 'race_Other', label: 'Other' },
  ];
  
  const A1CresultOptions = [
    { value: 'A1Cresult_Norm', label: 'Norm' },
    { value: 'A1Cresult_>7', label: '>7' },
    { value: 'A1Cresult_>8', label: '>8' },
  ];
  
  const maxGluSerumOptions = [
    { value: 'max_glu_serum_Norm', label: 'Norm' },
    { value: 'max_glu_serum_>200', label: '>200' },
    { value: 'max_glu_serum_>300', label: '>300' },
  ];
  

  return (
    <div className="patient-form">
      <h1>Schedule</h1>
      <form onSubmit={handleSubmit}>
        <label className="patient-form-label">
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required className="patient-form-input" />
        </label>
        <label className="patient-form-label">
          Email:
          <input type="text" name="email" value={formData.email} onChange={handleChange} required className="patient-form-input" />
        </label>
        <label className="patient-form-label">
          Home Phone:
          <input type="text" name="home" value={formData.home} onChange={handleChange} required className="patient-form-input" />
        </label>
        <label className="patient-form-label">
          Mobile Phone:
          <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} required className="patient-form-input" />
        </label>
        <label className="patient-form-label">
          Age:
          <input type="number" name="age" value={formData.age} onChange={handleChange} required className="patient-form-input" />
        </label>
        <label className="patient-form-label">
          Gender:
          <select
            className="patient-form-select"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            {genderOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label className="patient-form-label">
          Race:
          <select
            className="patient-form-select"
            name="race"
            value={formData.race}
            onChange={handleChange}
          >
            {raceOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label className="patient-form-label">
          Days in Hospital:
          <input type="number" name="time_in_hospital" value={formData.time_in_hospital} onChange={handleChange} required className="patient-form-input" />
        </label>
        <label className="patient-form-label">
          Number of Lab Procedures:
          <input type="number" name="num_lab_procedures" value={formData.num_lab_procedures} onChange={handleChange} required className="patient-form-input" />
        </label>
        <label className="patient-form-label">
          Number of Medications:
          <input type="number" name="num_medications" value={formData.num_medications} onChange={handleChange} required className="patient-form-input" />
        </label>
        <label className="patient-form-label">
          Number of Procedures:
          <input type="number" name="num_procedures" value={formData.num_procedures} onChange={handleChange} required className="patient-form-input" />
        </label>
        <label className="patient-form-label">
          Number of Diagnoses:
          <input type="number" name="num_diagnoses" value={formData.num_diagnoses} onChange={handleChange} required className="patient-form-input" />
        </label>
        <label className="patient-form-label">
          Change:
          <select className="patient-form-select" name="change" value={formData.change} onChange={handleChange}>
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </label>
        <label className="patient-form-label">
          Diabetes Medication:
          <select className="patient-form-select" name="diabetesMed" value={formData.diabetesMed} onChange={handleChange}>
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </label>
        <label className="patient-form-label">
          A1C Result:
          <select
            className="patient-form-select"
            name="A1Cresult"
            value={formData.A1Cresult}
            onChange={handleChange}
          >
            {A1CresultOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label className="patient-form-label">
          Max Glu Serum:
          <select
            className="patient-form-select"
            name="max_glu_serum"
            value={formData.max_glu_serum}
            onChange={handleChange}
          >
            {maxGluSerumOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label className="patient-form-label">
          Admission Type:
          <select
            className="patient-form-select"
            name="Admission"
            value={formData.Admission}
            onChange={handleChange}
          >
            {admissionOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label className="patient-form-label">
          Discharge:
          <select
            className="patient-form-select"
            name="Discharge"
            value={formData.Discharge}
            onChange={handleChange}
          >
            {dischargeOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label className="patient-form-label">
          Admission Source:
          <select
            className="patient-form-select"
            name="Admission source"
            value={formData['Admission source']}
            onChange={handleChange}
          >
            {admissionSourceOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label className="patient-form-label">
          Metformin:
          <select
            className="patient-form-select"
            name="Metformin"
            value={formData.Metformin}
            onChange={handleChange}
          >
            {metforminOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label className="patient-form-label">
          Insulin:
          <select
            className="patient-form-select"
            name="Insulin"
            value={formData.Insulin}
            onChange={handleChange}
          >
            {insulinOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label className="patient-form-label">
          Diagnosis:
          <select
            className="patient-form-select"
            name="Diagnosis"
            value={formData.Diagnosis}
            onChange={handleChange}
          >
            {diagnosisOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <button className="patient-form-submit" type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Schedule;

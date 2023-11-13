DROP TABLE IF EXISTS patients;

CREATE TABLE patients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    readmitted INTEGER,
    age INTEGER,
    time_in_hospital INTEGER,
    num_lab_procedures INTEGER,
    num_procedures INTEGER,
    num_medications INTEGER,
    num_diagnoses INTEGER,
    change INTEGER,
    diabetesMed INTEGER,
    admission TEXT,
    discharge TEXT,
    admission_source TEXT,
    metformin TEXT,
    insulin TEXT,
    diagnosis TEXT,
    home TEXT,
    mobile TEXT,
    email TEXT,
    race TEXT,
    gender TEXT,
    A1Cresult TEXT,
    max_glu_serum TEXT
);

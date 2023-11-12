from flask import Flask, request, jsonify, render_template
import numpy as np
import torch
from torch import nn
import sqlite3

app = Flask(__name__)

def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/')
def index():
    conn = get_db_connection()
    patients = conn.execute('SELECT * FROM patients').fetchall()
    conn.close()
    patient_list = []

    for patient in patients:
        formatted_patient = {
            'id': patient['id'],
            'name': patient['name'],
            'readmitted': patient['readmitted'],
            'age': patient['age'],
            'time_in_hospital': patient['time_in_hospital'],
            'num_lab_procedures': patient['num_lab_procedures'],
            'num_procedures': patient['num_procedures'],
            'num_medications': patient['num_medications'],
            'num_diagnoses': patient['num_diagnoses'],
            'change': patient['change'],
            'diabetesMed': patient['diabetesMed'],
            'admission': patient['admission'],
            'discharge': patient['discharge'],
            'admission_source': patient['admission_source'],
            'metformin': patient['metformin'],
            'insulin': patient['insulin'],
            'diagnosis': patient['diagnosis']
        }
        patient_list.append(formatted_patient)

    return jsonify({'patients': patient_list})

class SimpleNet(nn.Module):
    def __init__(self):
        super().__init__()
        self.layers = nn.Sequential(nn.Linear(49,16), nn.Sigmoid(), nn.Linear(16,32), nn.Sigmoid(), nn.Linear(32, 64), nn.Sigmoid(), nn.Linear(64, 1), nn.Sigmoid())

    def forward(self, x):
        yhat = self.layers(x)
        # yhat = self(x)
        return yhat
    
    def predict(self, x):
        # Pass the input through the neural network
        with torch.no_grad():  # Ensure that no gradients are computed during prediction
            yhat = self(x)
        return yhat
    
model = SimpleNet()
model.load_state_dict(torch.load('../../my_model.pth'))
model.eval()

admission_type = ['admission_type_id_Elective', 'admission_type_id_Emergency', 'admission_type_id_Newborn', 'admission_type_id_Other']
discharge_type = ['discharge_disposition_id_Home', 'discharge_disposition_id_Other']
admission_source_type = ['admission_source_id_Emergency Room', 'admission_source_id_Other', 'admission_source_id_Physician Referral']
metformin_type = ['metformin_Down', 'metformin_No', 'metformin_Steady', 'metformin_Up']
insulin_type = ['insulin_Down', 'insulin_No', 'insulin_Steady', 'insulin_Up']
diagnosis_type = ['diag_1_Circulatory', 'diag_1_Digestive', 'diag_1_Endocrine', 'diag_1_Genitourinary', 'diag_1_Infectious', 'diag_1_Muscoskeletal', 'diag_1_Neoplasms', 'diag_1_Nervous', 'diag_1_Other', 'diag_1_Respiratory', 'diag_1_Symptoms']
all_genders = ['gender_Female', 'gender_Male']
all_races = ['race_AfricanAmerican', 'race_Asian', 'race_Caucasian', 'race_Hispanic', 'race_Other']
A1Cresult_type = ['A1Cresult_>8', 'A1Cresult_>7', 'Norm']
max_glu_serum_type = ['max_glu_serum_>200', 'max_glu_serum_>300', 'Norm']

admission_type_mapping = {
    'admission_type_id_Elective': 'Elective',
    'admission_type_id_Emergency': 'Emergency',
    'admission_type_id_Newborn': 'Newborn',
    'admission_type_id_Other': 'Other'
}
discharge_disposition_mapping = {
    'discharge_disposition_id_Home': 'Home',
    'discharge_disposition_id_Other': 'Other'
}
admission_source_mapping = {
    'admission_source_id_Emergency Room': 'Emergency Room',
    'admission_source_id_Other': 'Other',
    'admission_source_id_Physician Referral': 'Physician Referral'
}
metformin_mapping = {
    'metformin_Down': 'Down',
    'metformin_No': 'No',
    'metformin_Steady': 'Steady',
    'metformin_Up': 'Up'
}
insulin_mapping = {
    'insulin_Down': 'Down',
    'insulin_No': 'No',
    'insulin_Steady': 'Steady',
    'insulin_Up': 'Up'
}
diagnosis_mapping = {
    'diag_1_Circulatory': 'Circulatory',
    'diag_1_Digestive': 'Digestive',
    'diag_1_Endocrine': 'Endocrine',
    'diag_1_Genitourinary': 'Genitourinary',
    'diag_1_Infectious': 'Infectious',
    'diag_1_Muscoskeletal': 'Muscoskeletal',
    'diag_1_Neoplasms': 'Neoplasms',
    'diag_1_Nervous': 'Nervous',
    'diag_1_Other': 'Other',
    'diag_1_Respiratory': 'Respiratory',
    'diag_1_Symptoms': 'Symptoms'
}
gender_mapping = {
    'gender_Female': 'Female',
    'gender_Male': 'Male'
}
race_mapping = {
    'race_AfricanAmerican': 'AfricanAmerican',
    'race_Asian': 'Asian',
    'race_Caucasian': 'Caucasian',
    'race_Hispanic': 'Hispanic',
    'race_Other': 'Other'
}
A1Cresult_mapping = {
    'A1Cresult_>8': '>8',
    'A1Cresult_>7': '>7',
    'A1Cresult_Norm': 'Norm'
}
max_glu_serum_mapping = {
    'max_glu_serum_>200': '>200',
    'max_glu_serum_>300': '>300',
    'max_glu_serum_Norm': 'Norm'
}

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json

    patient_name = data['name']

    admissions = data.get('Admission', []) 
    admission_features = [1 if admission in admissions else 0 for admission in admission_type]

    discharges = data.get('Discharge', [])
    discharge_features = [1 if discharge in discharges else 0 for discharge in discharge_type]

    admission_sources = data.get('Admission source', [])
    admission_source_features = [1 if admission_source in admission_sources else 0 for admission_source in admission_source_type]

    metformins = data.get('Metformin', [])
    metformin_features = [1 if metformin in metformins else 0 for metformin in metformin_type]

    insulins = data.get('Insulin', [])
    insulin_features = [1 if insulin in insulins else 0 for insulin in insulin_type]

    diagnosiss = data.get('Diagnosis', [])
    diagnosis_features = [1 if diagnosis in diagnosiss else 0 for diagnosis in diagnosis_type]

    genders = data.get('Gender', [])
    gender_features = [1 if gender in genders else 0 for gender in all_genders]

    races = data.get('Race', [])
    race_features = [1 if race in races else 0 for race in all_races]

    A1Cresults = data.get('A1Cresult', [])
    A1Cresult_features = [1 if A1Cresult in A1Cresults else 0 for A1Cresult in A1Cresult_type]

    max_glu_serums = data.get('Max_glu_serum', [])
    max_glu_serum_features = [1 if max_glu_serum in max_glu_serums else 0 for max_glu_serum in max_glu_serum_type]

    age = int(data['age'])
    time_in_hospital = int(data['time_in_hospital'])
    num_lab_procedure = int(data['num_lab_procedures'])
    num_procedures = int(data['num_procedures'])
    num_medications = int(data['num_medications'])
    num_diagnoses = int(data['num_diagnoses'])
    change = int(data['change'])
    diabetesMed = int(data['diabetesMed'])

    features = np.array([age, time_in_hospital, num_lab_procedure, num_procedures, num_medications, num_diagnoses, change, diabetesMed] + admission_features + discharge_features + admission_source_features + metformin_features + insulin_features + diagnosis_features + gender_features + race_features + A1Cresult_features + max_glu_serum_features)

    features_tensor = torch.tensor(features, dtype=torch.float32)

    prediction = model.predict(features_tensor)

    data['Admission'] = [admission_type_mapping.get(admission, admission) for admission in data.get('Admission', [])]
    data['Discharge'] = [discharge_disposition_mapping.get(discharge, discharge) for discharge in data.get('Discharge', [])]
    data['Admission source'] = [admission_source_mapping.get(admission_source, admission_source) for admission_source in data.get('Admission source', [])]
    data['Metformin'] = [metformin_mapping.get(metformin, metformin) for metformin in data.get('Metformin', [])]
    data['Insulin'] = [insulin_mapping.get(insulin, insulin) for insulin in data.get('Insulin', [])]
    data['Diagnosis'] = [diagnosis_mapping.get(diagnosis, diagnosis) for diagnosis in data.get('Diagnosis', [])]

    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute('''
        INSERT INTO patients (name, age, time_in_hospital, num_lab_procedures, num_procedures, num_medications, num_diagnoses, 
        change, diabetesMed, readmitted, admission, discharge, admission_source, metformin, insulin, diagnosis)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (patient_name, age, time_in_hospital, num_lab_procedure, num_procedures, num_medications, num_diagnoses,
          change, diabetesMed, prediction.item(), ','.join(data['Admission']), ','.join(data['Discharge']),
          ','.join(data['Admission source']), ','.join(data['Metformin']), ','.join(data['Insulin']), ','.join(data['Diagnosis'])))

    conn.commit()
    conn.close()

    prediction_result = "Patient will most likely not be readmitted" if prediction.item() < 0.5 else "Patient will most likely be readmitted"

    response_data = {
        'prediction': prediction_result,
        'patient_id': cursor.lastrowid 
    }

    return jsonify(response_data)

# @app.route('/predict_RF', methods=['POST'])
# def predict_rf():
#     data = request.json

if __name__ == '__main__':
    app.run(debug=True)


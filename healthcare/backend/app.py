from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import numpy as np
import torch
from torch import nn
import sqlite3

app = Flask(__name__)
CORS(app)

def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/')
def index():
    conn = get_db_connection()
    patients = conn.execute('SELECT * FROM patients WHERE archived = 0').fetchall()
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
            'diagnosis': patient['diagnosis'],
            'gender': patient['gender'],
            'A1Cresult': patient['A1Cresult'],
            'max_glu_serum': patient['max_glu_serum'],
            'archived': patient['archived'],
            'contact': {
                'home': patient['home'],
                'mobile': patient['mobile'],
                'email': patient['email']
            }
        }
        patient_list.append(formatted_patient)

    return ({'patients': patient_list})

class SimpleNet(nn.Module):
    def __init__(self):
        super().__init__()
        self.layers = nn.Sequential(nn.Linear(42,16), nn.Sigmoid(), nn.Linear(16,32), nn.Sigmoid(), nn.Linear(32, 64), nn.Sigmoid(), nn.Linear(64, 1), nn.Sigmoid())

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

admission_type = ['admission_type_id_Elective', 'admission_type_id_Emergency', 'admission_type_id_Other']
discharge_type = ['discharge_disposition_id_Home', 'discharge_disposition_id_Other']
admission_source_type = ['admission_source_id_Emergency Room', 'admission_source_id_Physician Referral']
metformin_type = ['metformin_Down', 'metformin_No', 'metformin_Steady', 'metformin_Up']
insulin_type = ['insulin_Down', 'insulin_No', 'insulin_Steady', 'insulin_Up']
diagnosis_type = ['diag_1_Circulatory', 'diag_1_Digestive', 'diag_1_Endocrine', 'diag_1_Genitourinary', 'diag_1_Infectious', 'diag_1_Muscoskeletal', 'diag_1_Neoplasms', 'diag_1_Nervous', 'diag_1_Other', 'diag_1_Respiratory', 'diag_1_Symptoms']
all_genders = ['gender_Female', 'gender_Male']
A1Cresult_type = ['A1Cresult_>8', 'A1Cresult_>7', 'Norm']
max_glu_serum_type = ['max_glu_serum_>200', 'max_glu_serum_>300', 'Norm']

admission_type_mapping = {
    'admission_type_id_Elective': 'Elective',
    'admission_type_id_Emergency': 'Emergency',
    # 'admission_type_id_Newborn': 'Newborn',
    'admission_type_id_Other': 'Other'
}
discharge_disposition_mapping = {
    'discharge_disposition_id_Home': 'Home',
    'discharge_disposition_id_Other': 'Other'
}
admission_source_mapping = {
    'admission_source_id_Emergency Room': 'Emergency Room',
    # 'admission_source_id_Other': 'Other',
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

    name = data['name']
    email = data['email']
    mobile = data['mobile']
    home = data['home']

    admissions = data.get('Admission', [])
    admission_string = ''.join(admissions)
    admission_features = [1 if admission_string == admission_stringy else 0 for admission_stringy in admission_type]

    discharges = data.get('Discharge', [])
    discharge_string = ''.join(discharges)
    discharge_features = [1 if discharge_string == discharge else 0 for discharge in discharge_type]

    admission_sources = data.get('Admission source', [])
    admission_source_string = ''.join(admission_sources)
    admission_source_features = [1 if admission_source_string == admission_source else 0 for admission_source in admission_source_type]

    metformins = data.get('Metformin', [])
    metformin_string = ''.join(metformins)
    metformin_features = [1 if metformin_string == metformin else 0 for metformin in metformin_type]

    insulins = data.get('Insulin', [])
    insulin_string = ''.join(insulins)
    insulin_features = [1 if insulin_string == insulin else 0 for insulin in insulin_type]

    diagnosiss = data.get('Diagnosis', [])
    diagnosis_string = ''.join(diagnosiss)
    diagnosis_features = [1 if diagnosis_string == diagnosis else 0 for diagnosis in diagnosis_type]

    genders = data.get('Gender', [])
    gender_string = ''.join(genders)
    gender_features = [1 if gender_string == gender else 0 for gender in all_genders]

    A1Cresults = data.get('A1Cresult', [])
    A1Cresult_string = ''.join(A1Cresults)
    A1Cresult_features = [1 if A1Cresult_string == A1Cresult else 0 for A1Cresult in A1Cresult_type]

    max_glu_serums = data.get('Max_glu_serum', [])
    max_glu_serum_string = ''.join(max_glu_serums)
    max_glu_serum_features = [1 if max_glu_serum_string == max_glu_serum else 0 for max_glu_serum in max_glu_serum_type]

    age = int(data['age'])
    time_in_hospital = int(data['time_in_hospital'])
    num_lab_procedure = int(data['num_lab_procedures'])
    num_procedures = int(data['num_procedures'])
    num_medications = int(data['num_medications'])
    num_diagnoses = int(data['num_diagnoses'])
    change = int(data['change'])
    diabetesMed = int(data['diabetesMed'])

    features = np.array([age, time_in_hospital, num_lab_procedure, num_procedures, num_medications, num_diagnoses, change, diabetesMed] + admission_features + discharge_features + admission_source_features + metformin_features + insulin_features + diagnosis_features + gender_features + A1Cresult_features + max_glu_serum_features)
    features_tensor = torch.tensor(features, dtype=torch.float32)
    prediction = model.predict(features_tensor)

    data['Admission'] = [admission_type_mapping.get(admission_string, admission_string)]
    data['Discharge'] = [discharge_disposition_mapping.get(discharge_string, discharge_string)]
    data['Admission source'] = [admission_source_mapping.get(admission_source_string, admission_source_string)]
    data['Metformin'] = [metformin_mapping.get(metformin_string, metformin_string)]
    data['Insulin'] = [insulin_mapping.get(insulin_string, insulin_string)]
    data['Diagnosis'] = [diagnosis_mapping.get(diagnosis_string, diagnosis_string)]
    data['Gender'] = [gender_mapping.get(gender_string, gender_string)]
    data['A1Cresult'] =  [A1Cresult_mapping.get(A1Cresult_string, A1Cresult_string)]
    data['Max_glu_serum'] =  [max_glu_serum_mapping.get(max_glu_serum_string, max_glu_serum_string)]

    conn = get_db_connection()
    cursor = conn.cursor()

    admission_source = data['Admission source']
    admission = data['Admission']
    discharge = data['Discharge']
    metformin = data['Metformin']
    insulin = data['Insulin']
    diagnosis = data['Diagnosis']
    gender = data['Gender']
    A1Cresult = data['A1Cresult']
    max_glu_serum = data['Max_glu_serum']

    
    cursor.execute('''
        INSERT INTO patients (name, home, mobile, email, age, time_in_hospital, num_lab_procedures, num_procedures, num_medications, num_diagnoses, 
        change, diabetesMed, readmitted, admission, discharge, admission_source, metformin, insulin, diagnosis, gender, A1Cresult, max_glu_serum)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (name, home, mobile, email, age, time_in_hospital, num_lab_procedure, num_procedures, num_medications, num_diagnoses,
      change, diabetesMed, prediction.item(), ','.join(admission),
      ','.join(discharge),
      ','.join(admission_source),
      ','.join(metformin),
      ','.join(insulin),
      ','.join(diagnosis), ','.join(gender), ','.join(A1Cresult), ','.join(max_glu_serum)))

    conn.commit()
    conn.close()

    prediction_result = "Patient will most likely not be readmitted" if prediction.item() < 0.5 else "Patient will most likely be readmitted"

    response_data = {
        'prediction': prediction_result,
        'patient_id': cursor.lastrowid 
    }

    return jsonify(response_data)

@app.route('/archive/<int:patient_id>', methods=['POST'])
def archive_patient(patient_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    print(patient_id)
    cursor.execute('UPDATE patients SET archived = 1 WHERE id = ?', (patient_id,))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Patient archived successfully'})

@app.route('/patients/total', methods=['GET'])
def get_total_patients():
    conn = get_db_connection()
    total_patients = conn.execute('SELECT COUNT(*) FROM patients').fetchone()[0]
    unarchived_patients = conn.execute('SELECT COUNT(*) FROM patients WHERE archived = 0').fetchone()[0]
    conn.close()
    return jsonify({"total_patients": total_patients, "unarchived_patients": unarchived_patients})

# if __name__ == '__main__':
#     app.run(debug=True)


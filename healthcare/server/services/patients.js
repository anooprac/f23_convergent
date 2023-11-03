const db = require('../services/db');
const config = require('../config');

function getMultiple(page = 1) {
  const offset = (page - 1) * config.listPerPage;
  const data = db.query(`SELECT * FROM patients LIMIT ?,?`, [offset, config.listPerPage]);
  const meta = {page};

  return {
    data,
    meta
  }
}

function validateCreate(patient) {
    let messages = [];
  
    console.log(patient);
  
    if (!patient) {
      messages.push('No object is provided');
    }
  
    if (!patient.name) {
      messages.push('Name is empty');
    }
    
    if (messages.length) {
      let error = new Error(messages.join());
      error.statusCode = 400;
  
      throw error;
    }
  }
  
function create(patientObj) {
    validateCreate(patientObj);
    const {name, age, info} = patientObj;
    const result = db.run('INSERT INTO patients (name, age, info) VALUES (@name, @age, @info)', {name, age, info});
    
    let message = 'Error in creating patient';
    if (result.changes) {
      message = 'patient created successfully';
    }
  
    return {message};
  }

module.exports = {
  getMultiple, create
}
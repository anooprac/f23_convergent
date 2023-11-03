const sqlite = require('better-sqlite3');
const path = require('path');
const db = new sqlite(path.resolve('data.db'), {fileMustExist: true});

async function query(sql, params) {
    const statement = db.prepare(sql);
    const result = await statement.all(params);
    return result;
}

async function run(sql, params) {
    const statement = db.prepare(sql);
    const result = await statement.run(params);
    return result;
}

module.exports = {
  query, run
}
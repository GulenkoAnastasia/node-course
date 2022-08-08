const db = require('../db');
/**
 * @typedef ListParams
 * @property {number} [limit]
 * @property {Object.<String,string>} [filters]
 */
/**
 * 
 * @param {ListParams} params
 * @returns 
 */
const fetchList = async (params = undefined) => {
  let query = 'SELECT * FROM exercises';
  if (params && params.filters) {
    const entries = Object.entries(params.filters);
    if (entries.length) {
      const conditions = entries.map(([key, value]) => `${key} = ${value}`);
      query += ` WHERE ${conditions.join(' and ')}`;
    }
  }
  try {
    const exercises = await db.all(query);
    return exercises.rows;
  } catch (err) {
    throw new Error('Can\'t get exercises list');
  }
}

module.exports = {
  fetchList
}
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

    const { user_id, from, to, limit } = params.filters;
    if (user_id) {
      query += ` WHERE user_id=${user_id}`

      if(from && to) {
        query += ` AND date BETWEEN "${from}" AND "${to}"`
      } 
      else if (from || to) {
        query += ' AND date ' + (from ? '> ' : '< ') + (from ? `"${from}"` : `"${to}"`)
      }
      if (limit) {
        query += ` LIMIT ${limit}`
      }
    }
  }
  try {
    const exercises = await db.all(query);
    const response = exercises.rows.map((exercise) => {
      return {
        description: exercise.description,
        duration: exercise.duration,
        date: new Date(exercise.date).toDateString() 
      }
    });
    return response;

  } catch (err) {
    console.log(err)
    throw new Error('Can\'t get exercises list');
  }
}

module.exports = {
  fetchList
}
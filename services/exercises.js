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
    const {
      user_id, from, to, limit,
    } = params.filters;
    if (user_id) {
      query += ` WHERE user_id=${user_id}`;

      if (from && to) {
        query += ` AND date BETWEEN "${from}" AND "${to}"`;
      } else if (from || to) {
        query += ` AND date ${from ? '> ' : '< '}${from ? `"${from}"` : `"${to}"`}`;
      }
      query += ' ORDER BY date DESC';
      
      if (limit) {
        query += ` LIMIT ${limit}`;
      }
    }
  }
  try {
    const exercises = await db.all(query);
    const response = exercises.rows.map((exercise) => ({
      description: exercise.description,
      duration: exercise.duration,
      date: new Date(exercise.date).toDateString(),
    }));

    return response;
  } catch (err) {
    throw new Error('Can\'t get exercises list');
  }
};

const create = async ({
  description, duration, date, user_id,
}) => {
  const sql = `
  INSERT INTO exercises (description, duration, date, user_id) 
  VALUES ("${description}", ${Number(duration)}, "${date}", ${user_id})`;

  try {
    const response = await db.run(sql);
    return response;
  } catch (err) {
    throw new Error('Can\'t create exercise');
  }
};

const fetchById = async (id) => {
  const sqlQuery = `
    SELECT users.id, users.name, exercises.date, exercises.duration, exercises.description 
    FROM exercises 
    INNER JOIN users 
    ON exercises.user_id = users.id 
    WHERE exercises.id = ${id}`;

  try {
    const response = await db.get(sqlQuery);
    return response.row;
  } catch (err) {
    throw new Error('Can\'t get user exercise');
  }
};

module.exports = {
  fetchList,
  create,
  fetchById,
};

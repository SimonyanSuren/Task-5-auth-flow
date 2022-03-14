const client = require('../db/connect');

const findUser = async (email) => {
  const res = await client.query(
    `SELECT * FROM "users_info" WHERE email = $1`,
    [email]
  );
  return res.rows.length ? res.rows[0] : 0;
};

const saveToken = async (email, token) => {
  const res = await client.query(
    `UPDATE users_info
	SET token = $1
	WHERE email = $2 RETURNING token;
	`,
    [token, email]
  );
  return res.rows[0];
};

module.exports = { findUser, saveToken };

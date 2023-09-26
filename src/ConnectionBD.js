import mysql from 'mysql2/promise';

const dbConfig = {
  host: 'us-cdbr-east-05.cleardb.net',
  user: 'b7af72ef51bc8c',
  password: '85c6bb0e5ed49c5',
  database: 'heroku_d23e98632d70552',
};

export async function getConnection() {
  try {
    const pool = mysql.createPool(dbConfig);
    const connection = await pool.getConnection();
    return connection;
  } catch (error) {
    console.error('Error al conectar a la base de datos', error);
    throw error;
  }
}

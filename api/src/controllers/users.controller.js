import { getConnection } from '../ConnectionBD';

/* export const deleteEmployee = async (req, res) => {
    const pool = await getConnection();

    const result = await pool.request()
    .input('id', req.body.id)
    .query('exec  sp_delete_employee @id');

    res.json(result.recordset);
    pool.close();

} */

export const getUsers = async (req, res) => {
  try {
    const connection = await getConnection();

    const [rows] = await connection.execute('SHOW TABLES');

    connection.release();

    res.json(rows);
  } catch (error) {
    console.error('Error al obtener usuarios', error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

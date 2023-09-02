import { getConnection } from '../ConnectionBD';

export const getPlanesEstudio = async (req, res) => {
  try {
    const connection = await getConnection();

    const [rows] = await connection.execute('CALL ListarPlanesEstudios');

    if (rows[0].length === 0) {
      res.status(401).json('No hay datos en la tabla PlanesEstudios');
    } else {
      res.json(rows);
    }
    connection.release();
  } catch (error) {
    console.error('Error con el SP ListarPlanesEstudios', error);
    res.status(500).json({ error: 'Error con el SP ListarPlanesEstudios' });
  }
};

export const getListaCursos = async (req, res) => {
  try {
    const connection = await getConnection();

    const [rows] = await connection.execute('CALL ListarCursos');

    if (rows[0].length === 0) {
      res.status(401).json('No hay datos en la tabla Cursos');
    } else {
      res.json(rows);
    }
    connection.release();
  } catch (error) {
    console.error('Error con el SP ListarCursos', error);
    res.status(500).json({ error: 'Error con el SP ListarCursos' });
  }
};

export const getListaSedes = async (req, res) => {
  try {
    const connection = await getConnection();

    const [rows] = await connection.execute('CALL ListarSedes');

    if (rows[0].length === 0) {
      res.status(401).json('No hay datos en la tabla Sedes');
    } else {
      res.json(rows);
    }
    connection.release();
  } catch (error) {
    console.error('Error con el SP ListarSedes', error);
    res.status(500).json({ error: 'Error con el SP ListarSedes' });
  }
};

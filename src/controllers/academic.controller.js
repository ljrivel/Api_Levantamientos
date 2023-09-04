import { getConnection } from '../ConnectionBD'; //import for connection

// getPlandeEstudios function to get the study plan
// Gets the study plan from the database
// Returns the study plan
// Returns an error message if the study plan was not found
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
    connection.destroy();
  } catch (error) {
    console.error('Error con el SP ListarPlanesEstudios', error);
    res.status(500).json({ error: 'Error con el SP ListarPlanesEstudios' });
  }
};

// getListaCursos function to get the course list
// Gets the course list from the database
// Returns the course list
// Returns an error message if the course list was not found
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
    connection.destroy();
  } catch (error) {
    console.error('Error con el SP ListarCursos', error);
    res.status(500).json({ error: 'Error con el SP ListarCursos' });
  }
};

// getListaSedes function to get the headquarters list
// Gets the headquarters list from the database
// Returns the headquarters list
// Returns an error message if the headquarters list was not found
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
    connection.destroy();
  } catch (error) {
    console.error('Error con el SP ListarSedes', error);
    res.status(500).json({ error: 'Error con el SP ListarSedes' });
  }
};

// insertarPlanEstudios function to insert a study plan
// Inserts a study plan into the database
// need study plan name
// Returns a message if the study plan was inserted correctly
// Returns an error message if the study plan was not inserted correctly
export const insertarPlanEstudios = async (req, res) => {
  try {
    const { nombrePlan } = req.body;
    const connection = await getConnection();
    const [rows] = await connection.execute('CALL InsertarPlanEstudios(?)', [
      nombrePlan,
    ]);

    res.json({ mensaje: 'Plan de estudios insertado correctamente' });

    connection.release();
    connection.destroy();
  } catch (error) {
    console.error('Error al insertar plan de estudios', error);
    res.status(500).json({ error: 'Error al insertar plan de estudios' });
  }
};

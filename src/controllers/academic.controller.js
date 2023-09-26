import e from 'express';
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

export const ReadPeriodos = async (req, res) => {
  try {
    const connection = await getConnection();
    const [rows] = await connection.execute('CALL LeerPeriodos');
    res.json(rows);

    connection.release();
    connection.destroy();
  } catch (error) {
    console.error('Error al leer periodos', error);
    res.status(500).json({ error: 'Error al leer periodos' });
  }
};

export const ReadPeriodo = async (req, res) => {
  try {
    const { id } = req.body;
    const connection = await getConnection();
    const [rows] = await connection.execute('CALL LeerPeriodoEspecifico(?)', [
      id,
    ]);
    res.json(rows);

    connection.release();
    connection.destroy();
  } catch (error) {
    console.error('Error al leer periodo', error);
    res.status(500).json({ error: 'Error al leer periodo' });
  }
};

export const InsertarSede = async (req, res) => {
  try {
    const { nombreSede } = req.body;
    const connection = await getConnection();
    const [rows] = await connection.execute('CALL InsertarSede(?)', [
      nombreSede,
    ]);

    res.json({ mensaje: 'Sede insertada correctamente' });

    connection.release();
    connection.destroy();
  } catch (error) {
    console.error('Error al insertar sede', error);
    res.status(500).json({ error: 'Error al insertar sede' });
  }
};

export const GetSedePorId = async (req, res) => {
  try {
    const { id } = req.body;
    const connection = await getConnection();
    const [rows] = await connection.execute('CALL LeerSedePorId(?)', [id]);
    res.json(rows);

    connection.release();
    connection.destroy();
  } catch (error) {
    console.error('Error al leer sede', error);
    res.status(500).json({ error: 'Error al leer sede' });
  }
};

export const UpdateSede = async (req, res) => {
  try {
    const { id, nombreSede } = req.body;
    const connection = await getConnection();
    const [rows] = await connection.execute('CALL ActualizarSede(?, ?)', [
      id,
      nombreSede,
    ]);

    res.json({ mensaje: 'Sede actualizada correctamente' });

    connection.release();
    connection.destroy();
  } catch (error) {
    console.error('Error al actualizar sede', error);
    res.status(500).json({ error: 'Error al actualizar sede' });
  }
};

export const DeleteSede = async (req, res) => {
  try {
    const { id } = req.body;
    const connection = await getConnection();
    const [rows] = await connection.execute('CALL EliminarSede(?)', [id]);

    res.json({ mensaje: 'Sede eliminada correctamente' });

    connection.release();
    connection.destroy();
  } catch (error) {
    console.error('Error al eliminar sede', error);
    res.status(500).json({ error: 'Error al eliminar sede' });
  }
};

export const getPlanesEstudioPorId = async (req, res) => {
  try {
    const { id } = req.body;
    const connection = await getConnection();
    const [rows] = await connection.execute('CALL LeerPlanEstudiosPorId(?)', [
      id,
    ]);
    res.json(rows);

    connection.release();
    connection.destroy();
  } catch (error) {
    console.error('Error al leer plan de estudio', error);
    res.status(500).json({ error: 'Error al leer plan de estudio' });
  }
};

export const UpdatePlanEstudio = async (req, res) => {
  try {
    const { id, nombrePlan } = req.body;
    const connection = await getConnection();
    const [rows] = await connection.execute(
      'CALL ActualizarPlanEstudios(?, ?)',
      [id, nombrePlan]
    );

    res.json({ mensaje: 'Plan de estudio actualizado correctamente' });

    connection.release();
    connection.destroy();
  } catch (error) {
    console.error('Error al actualizar plan de estudio', error);
    res.status(500).json({ error: 'Error al actualizar plan de estudio' });
  }
};

export const DeletePlanEstudio = async (req, res) => {
  try {
    const { id } = req.body;
    const connection = await getConnection();
    const [rows] = await connection.execute('CALL EliminarPlanEstudios(?)', [
      id,
    ]);

    res.json({ mensaje: 'Plan de estudio eliminado correctamente' });

    connection.release();
    connection.destroy();
  } catch (error) {
    console.error('Error al eliminar plan de estudio', error);
    res.status(500).json({ error: 'Error al eliminar plan de estudio' });
  }
};

export const insertCurso = async (req, res) => {
  try {
    const { nombreCurso, idPlanEstudios } = req.body;
    const connection = await getConnection();
    const [rows] = await connection.execute('CALL InsertarCurso(?, ?)', [
      idPlanEstudios,
      nombreCurso,
    ]);

    res.json({ mensaje: 'Curso insertado correctamente' });

    connection.release();
    connection.destroy();
  } catch (error) {
    console.error('Error al insertar curso', error);
    res.status(500).json({ error: 'Error al insertar curso' });
  }
};

export const getCursoPorId = async (req, res) => {
  try {
    const { id } = req.body;
    const connection = await getConnection();
    const [rows] = await connection.execute('CALL ObtenerCursoPorID(?)', [id]);
    res.json(rows);

    connection.release();
    connection.destroy();
  } catch (error) {
    console.error('Error al leer curso', error);
    res.status(500).json({ error: 'Error al leer curso' });
  }
};

export const UpdateCurso = async (req, res) => {
  try {
    const { id, nombreCurso, codigo_nuevo } = req.body;
    const connection = await getConnection();
    const [rows] = await connection.execute('CALL ActualizarCurso(?, ?, ?)', [
      id,
      codigo_nuevo,
      nombreCurso,
    ]);

    res.json({ mensaje: 'Curso actualizado correctamente' });

    connection.release();
    connection.destroy();
  } catch (error) {
    console.error('Error al actualizar curso', error);
    res.status(500).json({ error: 'Error al actualizar curso' });
  }
};

export const DeleteCurso = async (req, res) => {
  try {
    const { id } = req.body;
    const connection = await getConnection();
    const [rows] = await connection.execute('CALL EliminarCurso(?)', [id]);

    res.json({ mensaje: 'Curso eliminado correctamente' });

    connection.release();
    connection.destroy();
  } catch (error) {
    console.error('Error al eliminar curso', error);
    res.status(500).json({ error: 'Error al eliminar curso' });
  }
};

export const insertCursoDesdeJson = async (req, res) => {
  // "  [Codigo Curso,Nombre curso], [COD CURSO, NOMBRE CURSO]"
  try {
    const { idPeriodo, cursos } = req.body;
    const connection = await getConnection();
    const [rows] = await connection.execute(
      'CALL InsertarCursosDesdeJSON(?, ?)',
      [idPeriodo, cursos]
    );

    res.json({ mensaje: 'Curso insertado correctamente' });

    connection.release();
    connection.destroy();
  } catch (error) {
    console.error('Error al insertar curso', error);
    res.status(500).json({ error: 'Error al insertar curso' });
  }
};

export const insertarFormulario = async (req, res) => {
  try {
    const { fechaVencimiento, nombre, smestre, periodo } = req.body;
    const connection = await getConnection();
    const [rows] = await connection.execute(
      'CALL InsertarFormularioConPeriodo(?, ?, ?)',
      [fechaVencimiento, nombre, smestre, periodo]
    );

    res.json({ mensaje: 'Formulario insertado correctamente' });

    connection.release();
    connection.destroy();
  } catch (error) {
    console.error('Error al insertar formulario', error);
    res.status(500).json({ error: 'Error al insertar formulario' });
  }
};

export const EliminarFormularioYPeriodo = async (req, res) => {
  try {
    const { id } = req.body;
    const connection = await getConnection();
    const [rows] = await connection.execute(
      'CALL EliminarFormularioYPeriodo(?)',
      [id]
    );

    res.json({ mensaje: 'Formulario eliminado correctamente' });

    connection.release();
    connection.destroy();
  } catch (error) {
    console.error('Error al eliminar formulario', error);
    res.status(500).json({ error: 'Error al eliminar formulario' });
  }
};

export const getFormulariosPeriodo = async (req, res) => {
  try {
    const { idPeriodo } = req.body;
    const connection = await getConnection();
    const [rows] = await connection.execute(
      'CALL SeleccionarFormulariosConPeriodo(?)',
      [idPeriodo]
    );
    res.json(rows);

    connection.release();
    connection.destroy();
  } catch (error) {
    console.error('Error al leer formularios', error);
    res.status(500).json({ error: 'Error al leer formularios' });
  }
};

export const getFormularioPeriodoPorId = async (req, res) => {
  try {
    const { id } = req.body;
    const connection = await getConnection();
    const [rows] = await connection.execute(
      'CALL SeleccionarFormularioPeriodoPorId(?)',
      [id]
    );
    res.json(rows);

    connection.release();
    connection.destroy();
  } catch (error) {
    console.error('Error al leer formulario', error);
    res.status(500).json({ error: 'Error al leer formulario' });
  }
};

export const DeleteFormulario = async (req, res) => {
  try {
    const { id } = req.body;
    const connection = await getConnection();
    const [rows] = await connection.execute('CALL EliminarFormulario(?)', [id]);

    res.json({ mensaje: 'Formulario eliminado correctamente' });

    connection.release();
    connection.destroy();
  } catch (error) {
    console.error('Error al eliminar formulario', error);
    res.status(500).json({ error: 'Error al eliminar formulario' });
  }
};

export const ActualizarFormulario = async (req, res) => {
  try {
    const { id, nombre, fechaVencimiento, semestre, year } = req.body;
    const connection = await getConnection();
    const [rows] = await connection.execute(
      'CALL ActualizarFormulario(?, ?, ?, ?, ?)',
      [id, fechaVencimiento, nombre, semestre, year]
    );

    res.json({ mensaje: 'Formulario actualizado correctamente' });

    connection.release();
    connection.destroy();
  } catch (error) {
    console.error('Error al actualizar formulario', error);
    res.status(500).json({ error: 'Error al actualizar formulario' });
  }
};

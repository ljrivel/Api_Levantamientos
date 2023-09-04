import { getConnection } from '../ConnectionBD';
import { sendEmail } from '../emailer';
import { generateUniqueToken } from '../token';

const getToken = async (req, res) => {
  try {
    //while (true) {
    const conn = await getConnection();

    const token = await generateUniqueToken();

    const [rows] = await conn.execute('CALL VerificarTokenUnico(?)', [token]);

    conn.release();

    if (rows[0][0].mensaje === 'Token es único en la tabla Solicitud.') {
      return token;
    }
    // }
  } catch (error) {
    console.error('Error con el SP VerificarToken unico');
    res.status(500).json({ error: 'Error con el SP VerificarToken' });
  }
};

// Inserts a request into the database
export const InsertRequest = async (req, res) => {
  try {
    const {
      carnet,
      nombreCompleto,
      idPlan,
      email,
      comentario,
      idFormulario,
      idSede,
      motivoLevantamiento,
      idCursoLevanta,
      idCursoMatricular,
    } = req.body;

    console.log(req.body);
    const token = await getToken(req, res);
    console.log(token);
    const connection = await getConnection();
    const [rows] = await connection.execute(
      'CALL InsertarSolicitudReq(?,?,?,?,?,?,?,?,?,?,?)',
      [
        carnet,
        nombreCompleto,
        idPlan,
        email,
        token,
        comentario,
        idFormulario,
        idSede,
        motivoLevantamiento,
        idCursoLevanta,
        idCursoMatricular,
      ]
    );
    connection.release();
    if (rows.affectedRows === 1) {
      // La solicitud se insertó correctamente
      sendEmail(
        email,
        'Solicitud de levantamiento',
        'Se ha solicitado un levantamiento, su token es: ' + token
      );
      res.json({ mensaje: 'Solicitud insertada correctamente' });
    } else {
      // La solicitud no se insertó correctamente
      res.status(401).json({ mensaje: 'Error al insertar solicitud' });
    }
  } catch (error) {
    console.error('Error al insertar solicitud', error);
    res.status(500).json({ error: 'Error al insertar solicitud' });
  }
};

export const InsertRequestRN = async (req, res) => {
  try {
    const {
      carnet,
      nombreCompleto,
      idPlan,
      email,
      comentario,
      idFormulario,
      idSede,
      motivoLevantamiento,
      nivelRn,
      cursosMXRNString,
    } = req.body;

    const token = getToken(req, res);

    const connection = await getConnection();
    const [rows] = await connection.execute(
      'CALL InsertarSolicitudRnConCursos(?,?,?,?,?,?,?,?,?,?,?)',
      [
        carnet,
        nombreCompleto,
        idPlan,
        email,
        token,
        comentario,
        idFormulario,
        idSede,
        motivoLevantamiento,
        nivelRn,
        cursosMXRNString,
      ]
    );
    connection.release();
    if (rows.affectedRows === 1) {
      // La solicitud se insertó correctamente
      sendEmail(
        email,
        'Solicitud de levantamiento',
        'Se ha solicitado un levantamiento, su token es: ' + token
      );
      res.json({ mensaje: 'Solicitud insertada correctamente' });
    } else {
      // La solicitud no se insertó correctamente
      res.status(401).json({ mensaje: 'Error al insertar solicitud' });
    }
  } catch (error) {
    console.error('Error al insertar solicitud', error);
    res.status(500).json({ error: 'Error al insertar solicitud' });
  }
};

// delete a request from the database

export const DeleteRequest = async (req, res) => {
  try {
    const { carnet, token } = req.body;

    const connection = await getConnection();
    const [rows] = await connection.execute('CALL EliminarSolicitudReq(?,?)', [
      carnet,
      token,
    ]);
    connection.release();
    if (rows.affectedRows === 1) {
      // La solicitud se eliminó correctamente
      res.json({ mensaje: 'Solicitud eliminada correctamente' });
    } else {
      // La solicitud no se eliminó correctamente
      res.status(401).json({ mensaje: 'Error al eliminar solicitud' });
    }
  } catch (error) {
    console.error('Error al eliminar solicitud');
    res.status(500).json({ error: 'Error al eliminar solicitud' });
  }
};

export const DeleteRequestRN = async (req, res) => {
  try {
    const { carnet, token } = req.body;
    const connection = await getConnection();
    const [rows] = await connection.execute(
      'CALL EliminarSolicitudRNYRegistros(?,?)',
      [carnet, token]
    );
    connection.release();
    if (rows.affectedRows === 1) {
      // La solicitud se eliminó correctamente
      res.json({ mensaje: 'Solicitud eliminada correctamente' });
    } else {
      // La solicitud no se eliminó correctamente
      res.status(401).json({ mensaje: 'Error al eliminar solicitud' });
    }
  } catch (error) {
    console.error('Error al eliminar solicitud');
    res.status(500).json({ error: 'Error al eliminar solicitud' });
  }
};

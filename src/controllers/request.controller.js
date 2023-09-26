import { getConnection } from '../ConnectionBD'; //import for connection
import { sendEmail } from '../emailer'; //import for send email
import { generateUniqueToken } from '../token'; //import for generate token

//getToken function to generate a unique token
//Generates a unique token
//If the token is not unique, it generates another one
//Returns the token
const getToken = async (req, res) => {
  try {
    while (true) {
      const conn = await getConnection();

      const token = await generateUniqueToken();

      const [rows] = await conn.execute('CALL VerificarTokenUnico(?)', [token]);

      conn.release();
      conn.destroy();
      if (rows[0][0].mensaje === 'Token es único en la tabla Solicitud.') {
        return token;
      }
    }
  } catch (error) {
    console.error('Error con el SP VerificarToken unico');
    res.status(500).json({ error: 'Error con el SP VerificarToken' });
  }
};

// InsertRequest function to insert a request
// Inserts a request into the database
// call getToken function
// need carnet, fullname, idplan, email, comment, idform,
// idsede, reason, id course to lift, id course to enroll
// Returns a message if the request was inserted correctly
// Returns an error message if the request was not inserted correctly
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
    connection.destroy();
    console.log(rows);
    if (rows.warningStatus >= 1) {
      res.status(401).json({ error: 'Error al insertar solicitud ' });
    } else {
      // La solicitud se insertó correctamente
      sendEmail(
        email,
        'Solicitud de levantamiento',
        'Se ha solicitado un levantamiento, su token es: ' +
          token +
          '.' +
          '\n' +
          'Para el curso' +
          idCursoLevanta +
          'y matricularse en el curso' +
          idCursoMatricular
      );
      res.json({ mensaje: 'Solicitud insertada correctamente' });
    }
  } catch (error) {
    console.error('Error al insertar solicitud', error);
    res.status(500).json({ error: 'Error al insertar solicitud' });
  }
};

// InsertRequestRN function to insert a request
// Inserts a request into the database
// call getToken function
// need carnet, fullname, idplan, email, comment, idform,
// idsede, reason, id course to lift, id course to enroll
// Returns a message if the request was inserted correctly
// Returns an error message if the request was not inserted correctly
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
      cursosRNSrign,
    } = req.body;
    console.log(req.body);

    const token = await getToken(req, res);
    console.log(token);
    const connection = await getConnection();
    const [rows] = await connection.execute(
      'CALL InsertarSolicitudRnConCursos(?,?,?,?,?,?,?,?,?,?,?,?)',
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
        cursosRNSrign,
      ]
    );
    console.log(rows);
    connection.release();
    connection.destroy();
    // La solicitud se insertó correctamente
    if (rows.warningStatus >= 1) {
      res.status(401).json({ error: 'Error al insertar solicitud ' });
    } else {
      sendEmail(
        email,
        'Solicitud de levantamiento',
        'Se ha solicitado un levantamiento, su token es: ' +
          token +
          '\n' +
          'Para los cursos' +
          cursosMXRNString
      );
      res.json({ mensaje: 'Solicitud insertada correctamente' });
    }
  } catch (error) {
    console.error('Error al insertar solicitud', error);
    res.status(500).json({ error: 'Error al insertar solicitud' });
  }
};

// delete a request from the database

// DeleteRequest function to delete a request
// Deletes a request from the database
// need carnet and token
// Returns a message if the request was deleted correctly
// Returns an error message if the request was not deleted correctly
export const DeleteRequest = async (req, res) => {
  try {
    const { carnet, token } = req.body;

    const connection = await getConnection();
    const [rows] = await connection.execute('CALL EliminarSolicitudReq(?,?)', [
      carnet,
      token,
    ]);
    connection.release();
    connection.destroy();
    if (rows.warningStatus >= 1) {
      res.status(401).json({ error: 'Error al eliminar solicitud ' });
    } else {
      res.json({ mensaje: 'Solicitud eliminada correctamente' });
    }
  } catch (error) {
    console.error('Error al eliminar solicitud');
    res.status(500).json({ error: 'Error al eliminar solicitud' });
  }
};

// DeleteRequestRN function to delete a request
// Deletes a request from the database
// need carnet and token
// Returns a message if the request was deleted correctly
// Returns an error message if the request was not deleted correctly
export const DeleteRequestRN = async (req, res) => {
  try {
    const { carnet, token } = req.body;
    const connection = await getConnection();
    const [rows] = await connection.execute(
      'CALL EliminarSolicitudRNYRegistros(?,?)',
      [carnet, token]
    );
    connection.release();
    connection.destroy();
    if (rows.warningStatus >= 1) {
      res.status(401).json({ error: 'Error al eliminar solicitud ' });
    } else {
      res.json({ mensaje: 'Solicitud eliminada correctamente' });
    }
  } catch (error) {
    console.error('Error al eliminar solicitud');
    res.status(500).json({ error: 'Error al eliminar solicitud' });
  }
};

export const GetRequestsRN = async (req, res) => {
  try {
    const { id } = req.body;
    const connection = await getConnection();
    const [rows] = await connection.execute(
      'CALL ObtenerSolicitudesRNDeFormulario(?)',
      [id]
    );
    connection.release();
    connection.destroy();
    res.json(rows[0]);
  } catch (error) {
    console.error('Error al obtener solicitudes RN');
    res.status(500).json({ error: 'Error al obtener solicitudes' });
  }
};

export const GetRequestsNormal = async (req, res) => {
  try {
    const { id } = req.body;
    const connection = await getConnection();
    const [rows] = await connection.execute(
      'CALL ObtenerSolicitudReqDeFormulario(?)',
      [id]
    );
    connection.release();
    connection.destroy();
    res.json(rows[0]);
  } catch (error) {
    console.error('Error al obtener solicitudes');
    res.status(500).json({ error: 'Error al obtener solicitudes' });
  }
};

export const GetRequests = async (req, res) => {
  try {
    const connection = await getConnection();
    const [rows] = await connection.execute(
      'CALL ObtenerSolicitudReqDeSolicitud()'
    );
    connection.release();
    connection.destroy();
    res.json(rows[0]);
  } catch (error) {
    console.error('Error al obtener solicitudes');
    res.status(500).json({ error: 'Error al obtener solicitudes' });
  }
};

export const UpdateSolicitud = async (req, res) => {
  try {
    const { idSolicitud, estado, comentario } = req.body;
    const connection = await getConnection();
    const [rows] = await connection.execute(
      'CALL ActualizarEstadoSolicitud(?,?,?)',
      [idSolicitud, estado, comentario]
    );
    connection.release();
    connection.destroy();
    res.json(rows[0]);
  } catch (error) {
    console.error('Error al obtener solicitudes');
    res.status(500).json({ error: 'Error al obtener solicitudes' });
  }
};

export const UpdateSolicitudNotificacion = async (req, res) => {
  try {
    const { idSolicitud, notificado } = req.body;
    const connection = await getConnection();
    const [rows] = await connection.execute(
      'CALL ActualizarEstadoSolicitudNotificacion(?,?)',
      [idSolicitud, notificado]
    );
    connection.release();
    connection.destroy();
    res.json(rows[0]);
  } catch (error) {
    console.error('Error al obtener solicitudes');
    res.status(500).json({ error: 'Error al obtener solicitudes' });
  }
};

export const ObtenerSolicitudesRNPorId = async (req, res) => {
  try {
    const { idSolicitud } = req.body;
    const connection = await getConnection();
    const [rows] = await connection.execute(
      'CALL ObtenerSolicitudesRNDeSolicitud(?)',
      [idSolicitud]
    );
    connection.release();
    connection.destroy();
    res.json(rows[0]);
  } catch (error) {
    console.error('Error al obtener solicitudes');
    res.status(500).json({ error: 'Error al obtener solicitudes' });
  }
};

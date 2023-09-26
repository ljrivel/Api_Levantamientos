import { getConnection } from '../ConnectionBD';

// Login function to verify credentials
// Verifies if the credentials are correct
// If they are, it returns the user's information
// If they aren't, it returns an error message
// need email and password
export const Login = async (req, res) => {
  try {
    const { email, clave } = req.body; // Obtener email y contraseña del cuerpo de la solicitud

    const connection = await getConnection();
    const [rows] = await connection.execute(
      'CALL VerificarCredenciales(?, ?)',
      [email, clave]
    );

    if (rows[0].length >= 1) {
      // Las credenciales son válidas
      res.json(rows);
    } else {
      // Las credenciales son incorrectas
      res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }
    connection.release();
    connection.destroy();
  } catch (error) {
    console.error('Error al verificar credenciales');
    res.status(500).json({ error: 'Error al verificar credenciales' });
  }
};

// InsertarAdministrador function to insert an administrator
// Inserts an administrator into the database
// need name, email and password
export const InsertarAdministrador = async (req, res) => {
  try {
    const { nombre, email, clave } = req.body; // Obtener nombre, email y contraseña del cuerpo de la solicitud

    const connection = await getConnection();
    const [rows] = await connection.execute(
      'CALL InsertarAdministrador(?, ?, ?)',
      [nombre, email, clave]
    );

    // El administrador se insertó correctamente
    res.json({ mensaje: 'Administrador insertado correctamente' });

    connection.release();
    connection.destroy();
  } catch (error) {
    console.error('Error al insertar administrador', error);
    res.status(500).json({ error: 'Error al insertar administrador' });
  }
};

// ListAdmin function to list all administrators
// Lists all administrators from the database
export const ListAdmin = async (req, res) => {
  try {
    const connection = await getConnection();
    const [rows] = await connection.execute('CALL ListarAdminisradores()');

    // Se obtuvieron los administradores correctamente
    res.json(rows[0]);

    connection.release();
    connection.destroy();
  } catch (error) {
    console.error('Error al listar administradores', error);
    res.status(500).json({ error: 'Error al listar administradores' });
  }
};

// ListAdmin function to list administrators by id
// Lists administrators by id from the database
export const ListAdminById = async (req, res) => {
  try {
    const { id } = req.body; // Obtener id del cuerpo de la solicitud

    const connection = await getConnection();
    const [rows] = await connection.execute(
      'CALL ObtenerAdminitradoresPorID(?)',
      [id]
    );

    // Se obtuvieron los administradores correctamente
    res.json(rows[0]);

    connection.release();
    connection.destroy();
  } catch (error) {
    console.error('Error al listar administradores', error);
    res.status(500).json({ error: 'Error al listar administradores' });
  }
};

// ListAdmin function to update an administrator
// Updates an administrator from the database
// need id, name, email and password

export const UpdateAdmin = async (req, res) => {
  try {
    const { id, nombre, email, clave } = req.body; // Obtener id, nombre, email y contraseña del cuerpo de la solicitud

    const connection = await getConnection();
    const [rows] = await connection.execute(
      'CALL ActualizarAdministrador(?, ?, ?, ?)',
      [id, nombre, email, clave]
    );

    // El administrador se actualizó correctamente
    res.json({ mensaje: 'Administrador actualizado correctamente' });

    connection.release();
    connection.destroy();
  } catch (error) {
    console.error('Error al actualizar administrador', error);
    res.status(500).json({ error: 'Error al actualizar administrador' });
  }
};

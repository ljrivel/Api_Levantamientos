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

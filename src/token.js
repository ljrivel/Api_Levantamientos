const crypto = require('crypto');

// Longitud del token en bytes (128 caracteres en formato hexadecimal)
const tokenLengthBytes = 32;

// Generar un token único
const generateUniqueToken = () => {
  const token = crypto.randomBytes(tokenLengthBytes).toString('hex');
  return token;
};

exports.generateUniqueToken = () => generateUniqueToken();

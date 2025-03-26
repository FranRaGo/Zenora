const express = require('express');
require('dotenv').config();

const server = express();

// Importar rutas
const userRoutes = require('./routes/userRoutes');

// Middleware para JSON
server.use(express.json());

// Usar rutas
server.use('/api', userRoutes);

// Iniciar el servidor
server.listen(3000, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:3000`);
});
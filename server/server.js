const express = require('express');
require('dotenv').config();

const server = express();

// Importar rutas
const userRoutes = require('./routes/userRoutes');
const spaceRoutes = require('./routes/spaceRoutes');
const moduleRoutes = require('./routes/moduleRoutes');

// Middleware para JSON
server.use(express.json());

// Usar rutas
server.use('/api', userRoutes);
server.use('/api', spaceRoutes);
server.use('/api', moduleRoutes);


// Iniciar el servidor
server.listen(3000, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:3000`);
});
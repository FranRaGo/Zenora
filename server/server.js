const express = require('express');
require('dotenv').config();
const cors = require('cors'); // ✅ Importar cors

const server = express();
server.use(cors()); 

// Middleware para JSON
server.use(express.json());

// Importar rutas
const userRoutes = require('./routes/userRoutes');
const spaceRoutes = require('./routes/spaceRoutes');
const moduleRoutes = require('./routes/moduleRoutes');
const projectRoutes = require('./routes/PM/projectRoutes');
const emailRoutes = require('./routes/emailRoutes');

// Usar rutas
server.use('/api', userRoutes);
server.use('/api', spaceRoutes);
server.use('/api', moduleRoutes);
server.use('/api', projectRoutes);
server.use('/api', emailRoutes);

// Iniciar el servidor
server.listen(3000, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:3000`);
});
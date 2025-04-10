const express = require('express');
require('dotenv').config();

const server = express();

// Importar rutas
const userRoutes = require('./routes/userRoutes');
const spaceRoutes = require('./routes/spaceRoutes');
const moduleRoutes = require('./routes/moduleRoutes');
const projectRoutes = require('./routes/PM/projectRoutes');
const taskRoutes = require('./routes/PM/taskRoutes');
const documentPmRoutes = require('./routes/PM/documentRoutes');


// Middleware para JSON
server.use(express.json());

// Usar rutas
server.use('/api', userRoutes);
server.use('/api', spaceRoutes);
server.use('/api', moduleRoutes);
server.use('/api', projectRoutes);
server.use('/api', taskRoutes);
server.use('/api', documentPmRoutes);



// Iniciar el servidor
server.listen(3000, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:3000`);
});
const express = require('express');
require('dotenv').config();
const cors = require('cors'); // ✅ Importar cors

const server = express();
server.use(cors()); 
server.use(express.json({ limit: '10mb' }));
server.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Middleware para JSON
server.use(express.json());

// Importar rutas
const userRoutes = require('./routes/userRoutes');
const spaceRoutes = require('./routes/spaceRoutes');
const moduleRoutes = require('./routes/moduleRoutes');
const projectRoutes = require('./routes/PM/projectRoutes');
const emailRoutes = require('./routes/emailRoutes');
const taskRoutes = require('./routes/PM/taskRoutes');
const documentPmRoutes = require('./routes/PM/documentRoutes');
const chatCcRoutes = require('./routes/CC/chatRoutes');
const messageCcRoutes = require('./routes/CC/messageRoutes');


// Middleware para JSONs
server.use(express.json());

// Usar rutas
server.use('/api', userRoutes);
server.use('/api', spaceRoutes);
server.use('/api', moduleRoutes);
server.use('/api', projectRoutes);
server.use('/api', emailRoutes);
server.use('/api', taskRoutes);
server.use('/api', documentPmRoutes);
server.use('/api', chatCcRoutes);
server.use('/api', messageCcRoutes);



// Iniciar el servidor
server.listen(3000, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:3000`);
});
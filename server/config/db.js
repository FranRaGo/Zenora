//ARCHIVO CONFIGURACION BASE DE DATOS
const mysql = require('mysql2')
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


pool.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Error al conectar a MySQL:', err.message);
    } else {
        console.log('✅ Conexión con MySQL establecida correctamente');
        connection.release();
    }
});

module.exports = pool;

// //Conexion con base de datos
// const connection = mysql.createConnection({
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME
// })

// //Prueba de conexion
// connection.connect(err=>{
//     if(err){
//         console.error('Error al conectar a MySQL:');
//         throw err;
//     } 
//     console.log('Conexion');
// })

// //Exportamos la funcion
// module.exports = connection;
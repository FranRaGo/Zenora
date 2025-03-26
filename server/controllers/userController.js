const db = require('../config/db.js')

//Funcion para obtener todos los usuarios
exports.getUsers = (req,res)=>{
    db.query('SELECT * FROM usuari', (err, results) => {
        if (err) {
          console.error('Error en la consulta:', err);
          return res.status(500).json({ error: 'Error en la base de datos' });
        }
        res.json(results);
      });
}
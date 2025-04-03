const db = require('../config/db.js')

exports.getUsers = (req,res)=>{
    db.query('SELECT * FROM user', (err, results) => {
        if (err) {
          console.error('Error en la consulta:', err);
          return res.status(500).json({ error: 'Error en la base de datos' });
        }
        res.json(results);
      });
}

exports.getUsersFilter = (req,res)=>{
  const param = req.params.param;
  const value = req.params.value;

  const allowedFields = ["id", "email", "first_name", "last_name"];
  if (!allowedFields.includes(param)) {
      return res.status(400).json({ error: "Parámetro no permitido" });
  }

  const query = `SELECT * FROM user WHERE ${param} = ?`;

  db.query(query, [value], (err, result) => {
      if (err) {
          console.error("Error en la consulta:", err);
          return res.status(500).json({ error: "Error en la base de datos" });
      }
      if (result.length === 0) {
          return res.status(404).json({ message: "Usuario no encontrado" });
      }
      res.json(result);
  });
}

exports.getUsersSpace = (req,res)=>{
  const spaceId = req.params.id;

  db.query(`SELECT u.*
            FROM user u
            JOIN user_space us ON u.id = us.user_id
            JOIN space s ON us.space_id = s.id
            WHERE s.id = ?;`,[spaceId],(err,results)=>{
    if (err) {
      console.error('Error en la consulta:', err);
      return res.status(500).json({ error: 'Error en la base de datos' });
    }
    res.json(results);
  });
}
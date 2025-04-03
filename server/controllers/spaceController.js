const db = require('../config/db.js')

exports.getUsersSpace = (req,res)=>{
  const userId = req.params.id;

  db.query(`SELECT s.id ,s.name, us.role, s.file_type ,s.logo
            FROM space s
            JOIN user_space us ON s.id = us.space_id
            JOIN user u ON us.user_id = u.id
            WHERE u.id = ?;`,[userId],(err,results)=>{
    if (err) {
      console.error('Error en la consulta:', err);
      return res.status(500).json({ error: 'Error en la base de datos' });
    }
    res.json(results);
  });
}
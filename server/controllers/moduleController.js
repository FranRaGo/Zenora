const db = require('../config/db.js')

//GET

exports.getModules = (req,res)=>{
    db.query(`SELECT m.id, m.prefix, m.name, m.description ,p.id AS plan_id,p.name AS plan_name, m.file_type ,m.logo
                FROM module m 
                JOIN plan p ON m.plan_id = p.id
                ORDER BY m.plan_id ASC`,(err,results)=>{
        if (err) {
          console.error('Error en la consulta:', err);
          return res.status(500).json({ error: 'Error en la base de datos' });
        }
        res.json(results);
    })
}

exports.getSpaceModules = (req,res)=>{
  space_id = req.params.spaceId;

  db.query(`SELECT m.*
              FROM module m 
              JOIN mod_space ms ON m.id = ms.module_id
              WHERE ms.space_id = ?`,[space_id],(err,results)=>{
      if (err) {
        console.error('Error en la consulta:', err);
        return res.status(500).json({ error: 'Error en la base de datos' });
      }
      res.json(results);
  })
}

//POST

exports.addModuleSpace = (req,res) => {
  const { spaceId, moduleId } = req.body;

  const query = "INSERT INTO mod_space(module_id,space_id) VALUES (?,?)";

  db.query(query, [moduleId, spaceId], (err, result) => {
    if (err) {
      console.error("Error al eliminar usuario:", err);
      return res.status(500).json({ error: "Error en la base de datos" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json({ message: "Usuario eliminado exitosamente" });
  });
}
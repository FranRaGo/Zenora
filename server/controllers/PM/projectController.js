const db = require('../../config/db.js')

exports.getProject = (req,res)=>{
  const projectId = req.params.projectId;

  db.query(`SELECT * 
              FROM pm_project
              WHERE id = ?`,[projectId],(err,results)=>{
      if (err) {
        console.error('Error en la consulta:', err);
        return res.status(500).json({ error: 'Error en la base de datos' });
      }
      res.json(results);
  })
}

exports.getProjects = (req,res)=>{
  const spaceId = req.params.spaceId;

  db.query(`SELECT p.*  FROM pm_project p 
              JOIN mod_space ms ON ms.id = p.mod_space_id
              WHERE p.mod_space_id = ?`,[spaceId],(err,results)=>{
      if (err) {
        console.error('Error en la consulta:', err);
        return res.status(500).json({ error: 'Error en la base de datos' });
      }
      res.json(results);
  })
}

exports.getUserProjects = (req,res)=>{
    const userId = req.params.id;

    db.query(`SELECT p.*  FROM pm_project p 
                JOIN pm_assig_project ap ON p.id = ap.project_id
                JOIN user u ON ap.user_id = u.id
                WHERE u.id = ?`,[userId],(err,results)=>{
        if (err) {
          console.error('Error en la consulta:', err);
          return res.status(500).json({ error: 'Error en la base de datos' });
        }
        res.json(results);
    })
}

exports.getProjectUsers = (req,res)=>{
  const projectId = req.params.id;

  db.query(`SELECT u.*  FROM pm_project p 
              JOIN pm_assig_project ap ON p.id = ap.project_id
              JOIN user u ON ap.user_id = u.id
              WHERE p.id = ?`,[projectId],(err,results)=>{
      if (err) {
        console.error('Error en la consulta:', err);
        return res.status(500).json({ error: 'Error en la base de datos' });
      }
      res.json(results);
  })
}
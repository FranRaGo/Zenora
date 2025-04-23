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

//POST

exports.createProject = (req, res) => {
  const { title, description, due_date, mod_space_id, banner , file_type } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const query = "INSERT INTO pm_project (title, description, due_date, mod_space_id, banner , file_type) VALUES (?, ?, ?, ?, ?, ?)";

  db.query(query, [title, description, due_date, mod_space_id, banner , file_type], (err, result) => {
    if (err) {
      console.error("Error al insertar projecto:", err);
      return res.status(500).json({ error: "Error en la base de datos" });
    }
    res.status(201).json({ message: "Projecto creado exitosamente", userId: result.insertId });
  });
};

exports.assigProject = (req, res) => {
  const { projectId, userId, manager } = req.body;

  if (!projectId || !userId) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const query = "INSERT INTO pm_assig_project (project_id, user_id, manager) VALUES (?, ?, ?)";

  db.query(query, [projectId, userId, manager], (err, result) => {
    if (err) {
      console.error("Error al asignar projecto:", err);
      return res.status(500).json({ error: "Error en la base de datos" });
    }
    res.status(201).json({ message: "Projecto asignado exitosamente", userId: result.insertId });
  });
};

//PUT

exports.updateProject = (req, res) => {
  const projectId = req.params.projectId;
  const { title, description, due_date } = req.body;

  if (!title || !description ) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const query = "UPDATE pm_project SET title = ?, description = ?, due_date = ? WHERE id = ?";

  db.query(query, [title, description, due_date, projectId], (err, result) => {
    if (err) {
      console.error("Error al actualizar projecto:", err);
      return res.status(500).json({ error: "Error en la base de datos" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json({ message: "Projecto actualizado exitosamente" });
  });
};

exports.updateBannerProject = (req, res) => {
  const projectId = req.params.projectId;
  const { image, file_type } = req.body;

  if (!image) {
    return res.status(400).json({ error: "La imagen es obligatoria" });
  }

  const imageBuffer = Buffer.from(image, "base64");

  const query = "UPDATE pm_project SET banner = ?, file_type = ? WHERE id = ?";

  db.query(query, [imageBuffer, file_type || "image/png", projectId], (err, result) => {
    if (err) {
      console.error("Error al actualizar la foto de perfil:", err);
      return res.status(500).json({ error: "Error en la base de datos" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json({ message: "Foto de perfil actualizada exitosamente" });
  });
};

exports.updateManageProject = (req, res) => {
  const projectId = req.params.assigId;
  const { manager } = req.body;


  const query = "UPDATE pm_assig_project SET manager = ? WHERE id = ?";

  db.query(query, [manager, projectId], (err, result) => {
    if (err) {
      console.error("Error al actualizar projecto:", err);
      return res.status(500).json({ error: "Error en la base de datos" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json({ message: "Projecto actualizado exitosamente" });
  });
};

//DELETE

exports.deleteProject = (req, res) => {
  const projectId = req.params.projectId;

  const query = "DELETE FROM pm_project WHERE id = ?";

  db.query(query, [projectId], (err, result) => {
    if (err) {
      console.error("Error al eliminar usuario:", err);
      return res.status(500).json({ error: "Error en la base de datos" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json({ message: "Usuario eliminado exitosamente" });
  });
};

exports.deleteAssigProject = (req, res) => {
  const assigId = req.params.assigId;

  const query = "DELETE FROM pm_assig_project WHERE id = ?";

  db.query(query, [assigId], (err, result) => {
    if (err) {
      console.error("Error al eliminar usuario:", err);
      return res.status(500).json({ error: "Error en la base de datos" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json({ message: "Usuario eliminado exitosamente" });
  });
};
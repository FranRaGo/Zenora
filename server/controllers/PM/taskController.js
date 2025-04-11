const db = require('../../config/db.js')

exports.getTask = (req,res)=>{
  const taskId = req.params.taskId;

  db.query(`SELECT *
              FROM pm_task
              WHERE id = ?`,[taskId],(err,results)=>{
      if (err) {
        console.error('Error en la consulta:', err);
        return res.status(500).json({ error: 'Error en la base de datos' });
      }
      res.json(results);
  })
}

exports.getSubtask = (req,res)=>{
  const subtaskId = req.params.subtaskId;

  db.query(`SELECT * 
              FROM pm_subtask
              WHERE id = ?`,[subtaskId],(err,results)=>{
      if (err) {
        console.error('Error en la consulta:', err);
        return res.status(500).json({ error: 'Error en la base de datos' });
      }
      res.json(results);
  })
}

exports.getUserTask = (req,res)=>{
    const userId = req.params.userId;
    const projectId = req.params.projectId;

    db.query(`SELECT t.*,u*
                FROM pm_task t
                JOIN pm_assig_task at ON t.id = at.task_id
                JOIN pm_assig_project ap ON at.assing_project_id = ap.id
                WHERE ap.user_id = ? AND ap.project_id = ?;`,[userId,projectId],(err,results)=>{
        if (err) {
          console.error('Error en la consulta:', err);
          return res.status(500).json({ error: 'Error en la base de datos' });
        }
        res.json(results);
    })
}

exports.getUserSubtask = (req,res)=>{
    const userId = req.params.userId;
    const taskId = req.params.taskId;

    db.query(`SELECT st.*,u*
                FROM pm_subtask st
                JOIN pm_assig_subtask ast ON st.id = ast.subtask_id
                JOIN pm_assig_task at ON ast.assing_task_id = at.id
                JOIN pm_assig_project ap ON at.assing_project_id = ap.id
                WHERE ap.user_id = ? AND at.task_id = ?;`,[userId,taskId],(err,results)=>{
        if (err) {
          console.error('Error en la consulta:', err);
          return res.status(500).json({ error: 'Error en la base de datos' });
        }
        res.json(results);
    })
}


exports.getProjectTask = (req,res)=>{
    const projectId = req.params.projectId;

    db.query(`SELECT t.*
                FROM pm_task t
                JOIN pm_project p ON t.project_id = p.id
                WHERE p.id = ?;`,[projectId],(err,results)=>{
        if (err) {
          console.error('Error en la consulta:', err);
          return res.status(500).json({ error: 'Error en la base de datos' });
        }
        res.json(results);
    })
}

exports.getTaskSubtask = (req,res)=>{
    const taskId = req.params.taskId;

    db.query(`SELECT st.*
                FROM pm_subtask st
                JOIN pm_task t ON st.task_id = t.id
                WHERE t.id = ?;`,[taskId],(err,results)=>{
        if (err) {
          console.error('Error en la consulta:', err);
          return res.status(500).json({ error: 'Error en la base de datos' });
        }
        res.json(results);
    })
}

//POST

exports.createTask = (req, res) => {
  const projectId = req.params.projectId;
  const { title, description, status, priority, due_date } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const query = "INSERT INTO pm_task (title, description, status, priority, due_date, project_id) VALUES (?, ?, ?, ?, ?, ?)";

  db.query(query, [title, description, status, priority, due_date, projectId], (err, result) => {
    if (err) {
      console.error("Error al insertar projecto:", err);
      return res.status(500).json({ error: "Error en la base de datos" });
    }
    res.status(201).json({ message: "Projecto creado exitosamente", userId: result.insertId });
  });
};

exports.assigTask = (req, res) => {
  const taskId = req.params.taskId;
  const { assigId } = req.body;


  const query = "INSERT INTO pm_assig_task (assing_project_id, task_id) VALUES (?, ?)";

  db.query(query, [assigId, taskId,], (err, result) => {
    if (err) {
      console.error("Error al asignar projecto:", err);
      return res.status(500).json({ error: "Error en la base de datos" });
    }
    res.status(201).json({ message: "Projecto asignado exitosamente", userId: result.insertId });
  });
};

exports.createSubtask = (req, res) => {
  const taskId = req.params.taskId;
  const { title, description, status, priority } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const query = "INSERT INTO pm_subtask (title, description, status, priority, task_id) VALUES (?, ?, ?, ?, ?)";

  db.query(query, [title, description, status, priority, taskId], (err, result) => {
    if (err) {
      console.error("Error al insertar projecto:", err);
      return res.status(500).json({ error: "Error en la base de datos" });
    }
    res.status(201).json({ message: "Projecto creado exitosamente", userId: result.insertId });
  });
};

exports.assigSubtask = (req, res) => {
  const subtaskId = req.params.subtaskId;
  const { assigId } = req.body;


  const query = "INSERT INTO pm_assig_subtask (assing_task_id, subtask_id) VALUES (?, ?)";

  db.query(query, [assigId, subtaskId,], (err, result) => {
    if (err) {
      console.error("Error al asignar projecto:", err);
      return res.status(500).json({ error: "Error en la base de datos" });
    }
    res.status(201).json({ message: "Projecto asignado exitosamente", userId: result.insertId });
  });
};

//PUT

exports.updateTask = (req, res) => {
  const taskId = req.params.taskId;
  const { title, description, due_date, status, priority } = req.body;

  if (!title || !description ) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const query = "UPDATE pm_task SET title = ?, description = ?, due_date = ?, status = ?, priority = ? WHERE id = ?";

  db.query(query, [title, description, due_date, status, priority, taskId], (err, result) => {
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

exports.updateSubtask = (req, res) => {
  const subtaskId = req.params.subtaskId;
  const { title, description, status, priority } = req.body;

  if (!title || !description ) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const query = "UPDATE pm_subtask SET title = ?, description = ?, status = ?, priority = ? WHERE id = ?";

  db.query(query, [title, description, status, priority, subtaskId], (err, result) => {
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

exports.deleteTask = (req, res) => {
  const taskId = req.params.taskId;

  const query = "DELETE FROM pm_task WHERE id = ?";

  db.query(query, [taskId], (err, result) => {
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

exports.deleteAssigTask = (req, res) => {
  const assigId = req.params.assigId;

  const query = "DELETE FROM pm_assig_task WHERE id = ?";

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

exports.deleteSubtask = (req, res) => {
  const subtaskId = req.params.subtaskId;

  const query = "DELETE FROM pm_subtask WHERE id = ?";

  db.query(query, [subtaskId], (err, result) => {
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

exports.deleteAssigSubtask = (req, res) => {
  const assigId = req.params.assigId;

  const query = "DELETE FROM pm_assig_subtask WHERE id = ?";

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
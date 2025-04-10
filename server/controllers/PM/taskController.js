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

    db.query(`SELECT t.*
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

    db.query(`SELECT st.*
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
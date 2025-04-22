const db = require('../../config/db.js')

//Get modules and their project
exports.getPmDocument = (req,res)=>{
    const param = req.params.param;
    const value = req.params.id;
    
    // Lista de columnas permitidas
    const allowedFields = ["project_id", "task_id", "subtask_id"];
    if (!allowedFields.includes(param)) {
        return res.status(400).json({ error: "Parámetro no permitido" });
    }
    
    // Construcción segura de la consulta
    const query = `SELECT id, name, type, data FROM pm_document WHERE ${param} = ?`;
    
    db.query(query, [value], (err, result) => {
        if (err) {
            console.error("Error en la consulta:", err);
            return res.status(500).json({ error: "Error en la base de datos" });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "Documento no encontrado" });
        }
        res.json(result);
    });
}

//POST

exports.pushPmDocument = (req, res) => {
    const { param, id } = req.params;
    const { name, image, file_type } = req.body;
  
    if (!image) {
      return res.status(400).json({ error: "La imagen es obligatoria" });
    }

    const allowedFields = ["project_id", "task_id", "subtask_id"];
    if (!allowedFields.includes(param)) {
        return res.status(400).json({ error: "Parámetro no permitido" });
    }
  
    const imageBuffer = Buffer.from(image, "base64");
  
    const query = `INSERT INTO pm_document (name, data, file_type, ${param}) VALUES (?,?,?,?)`;
  
    db.query(query, [name, imageBuffer, file_type || "image/png", id], (err, result) => {
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

//DELETE

exports.deletePmDocument = (req, res) => {
    const { documentId } = req.params;
  
    const query = `DELETE FROM pm_document WHERE id = ?`;
  
    db.query(query, [documentId], (err, result) => {
      if (err) {
        console.error("Error al eliminar documento:", err);
        return res.status(500).json({ error: "Error en la base de datos" });
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Documento no encontrado" });
      }
  
      res.json({ message: "Documento eliminado exitosamente" });
    });
  };
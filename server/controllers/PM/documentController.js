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
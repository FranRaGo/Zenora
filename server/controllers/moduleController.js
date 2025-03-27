const db = require('../config/db.js')

//Get modules and their plan
exports.getModules = (req,res)=>{
    db.query(`SELECT m.name AS module_name, p.name AS plan_name
                FROM module m 
                JOIN plan p ON m.plan_id = p.id`,(err,results)=>{
        if (err) {
          console.error('Error en la consulta:', err);
          return res.status(500).json({ error: 'Error en la base de datos' });
        }
        res.json(results);
    })
}
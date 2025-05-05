const db = require('../../config/db.js');
const { use } = require('../../routes/userRoutes.js');

//GET

exports.getMessages = (req,res) => {
    const chatId = req.params.chatId;

    db.query(`SELECT m.content, m.date, m.answer, m.file, m.type, CONCAT(u.first_name, ' ', u.last_name) AS name, u.id
        FROM cc_message m
        JOIN user u ON m.user_id = u.id
        JOIN cc_chat c ON m.chat_id = c.id
        WHERE c.id = ?
        ORDER BY m.date DESC`,[chatId],(err,results)=>{
    if (err) {
        console.error('Error en la consulta:', err);
        return res.status(500).json({ error: 'Error en la base de datos' });
    }
    res.json(results);
    })
}

//POST

exports.sendMessage = (req,res) => {
    const { chatId, userId, content, answer ,file, type } = req.body;

    if (!chatId || !userId || !content) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
      }

    db.query(`INSERT INTO cc_message(chat_id, user_id, content, answer, file, type) VALUES (?, ?, ?, ?, ?, ?)`,[chatId, userId, content, answer ,file, type],(err,results)=>{
    if (err) {
        console.error('Error en la consulta:', err);
        return res.status(500).json({ error: 'Error en la base de datos' });
    }
    res.json(results);
    })
}

//PUT

exports.setImportant = (req, res) => {
    const { chatUsId, important } = req.body;
  
    const query = "UPDATE cc_user_chat SET important = ? WHERE id = ?";
  
    db.query(query, [important,  chatUsId], (err, result) => {
      if (err) {
        console.error("Error al actualizar chat:", err);
        return res.status(500).json({ error: "Error en la base de datos" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Chat no encontrado" });
      }
      res.json({ message: "Chat actualizado exitosamente" });
    });
  };
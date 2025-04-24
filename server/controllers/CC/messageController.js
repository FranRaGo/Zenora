const db = require('../../config/db.js');
const { use } = require('../../routes/userRoutes.js');

//GET

exports.getMessages = (req,res) => {
    const chatId = req.params.chatId;

    db.query(`SELECT m.content, m.date, m.answer, m.file, m.type, CONCAT(u.first_name, ' ', u.last_name) AS name, u.id
        FROM cc_message m
        JOIN user u ON m.user_id = u.id
        JOIN cc_chat c ON m.chat_id = c.id
        WHERE c.id = ?`,[chatId],(err,results)=>{
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
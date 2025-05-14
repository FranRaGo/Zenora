const db = require('../../config/db.js');
const { use } = require('../../routes/userRoutes.js');
const multer = require("multer");
const upload = multer();

//GET

exports.getMessages = (req,res) => {
    const chatId = req.params.chatId;

    db.query(`SELECT m.id AS msg_id,m.content, m.date, m.answer, m.file, m.type, CONCAT(u.first_name, ' ', u.last_name) AS name, u.id
        FROM cc_message m
        JOIN user u ON m.user_id = u.id
        JOIN cc_chat c ON m.chat_id = c.id
        WHERE c.id = ?
        ORDER BY m.date DESC`, [chatId], (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).json({ error: 'Error en la base de datos' });
        }

        const messages = results.map(msg => {
            if (msg.file) {
                msg.file = Buffer.from(msg.file).toString('base64'); // codifica el BLOB
            }
            return msg;
        });

        res.json(messages);
    });
}

//POST

exports.sendMessage = (req, res) => {
  const uploadSingle = upload.single("file");

  uploadSingle(req, res, (err) => {
    if (err) {
      console.error("Error al procesar archivo:", err);
      return res.status(500).json({ error: "Error al subir archivo" });
    }

    const { chatId, userId, content, answer, type } = req.body;
    const file = req.file ? req.file.buffer : null;

    if (!chatId || !userId || !content) {
      return res.status(400).json({ error: "Todos los campos obligatorios" });
    }

    db.query(
      `INSERT INTO cc_message(chat_id, user_id, content, answer, file, type) VALUES (?, ?, ?, ?, ?, ?)`,
      [chatId, userId, content, answer || null, file, type || null],
      (err, results) => {
        if (err) {
          console.error("Error en la consulta:", err);
          return res.status(500).json({ error: "Error en la base de datos" });
        }
        res.json(results);
      }
    );
  });
};

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
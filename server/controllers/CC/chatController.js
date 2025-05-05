const db = require('../../config/db.js')

//GET

exports.getChats = (req,res) => {
    const userId = req.params.userId

    db.query(`SELECT c.*, up.*
        FROM cc_chat c 
        JOIN cc_user_chat up ON up.chat_id = c.id
        WHERE up.user_id = ?`,[userId],(err,results)=>{
    if (err) {
        console.error('Error en la consulta:', err);
        return res.status(500).json({ error: 'Error en la base de datos' });
    }
    res.json(results);
    })
}

exports.getChatMembers = (req,res) => {
    const chatId = req.params.chatId;
    const userId = req.params.userId;


    db.query(`SELECT CONCAT(u.first_name,' ',u.last_name) AS name, u.email, u.file_type, u.profile_picture
        FROM cc_user_chat up
        JOIN user u ON up.user_id = u.id
        WHERE up.user_id != ? AND up.chat_id = ?`,[userId, chatId],(err,results)=>{
    if (err) {
        console.error('Error en la consulta:', err);
        return res.status(500).json({ error: 'Error en la base de datos' });
    }
    res.json(results);
    })
}


//POST

exports.createChat = (req,res) => {
    const { name, type, mod_space_id } = req.body;

    db.query(`INSERT INTO cc_chat(name, type, mod_space_id) VALUES (?, ?, ?)`,[name, type, mod_space_id],(err,results)=>{
    if (err) {
        console.error('Error en la consulta:', err);
        return res.status(500).json({ error: 'Error en la base de datos' });
    }
    res.json(results);
    })
}

exports.userChat = (req,res) => {
    const { userId, chatId } = req.body;

    db.query(`INSERT INTO cc_user_chat(user_id, chat_id, important) VALUES (?, ?, 0)`,[userId, chatId],(err,results)=>{
    if (err) {
        console.error('Error en la consulta:', err);
        return res.status(500).json({ error: 'Error en la base de datos' });
    }
    res.json(results);
    })
}

//PUT

exports.editChat = (req,res) => {
    const { name, chatId } = req.body;

    db.query(`UPDATE cc_chat SET name = ? WHERE id = ?`,[name,chatId],(err,results)=>{
    if (err) {
        console.error('Error en la consulta:', err);
        return res.status(500).json({ error: 'Error en la base de datos' });
    }
    res.json(results);
    })
}

//DELETE

exports.deleteChat = (req,res) => {
    const chatId = req.params.chatId

    db.query(`DELETE FROM cc_chat WHERE id = ?`,[chatId],(err,results)=>{
    if (err) {
        console.error('Error en la consulta:', err);
        return res.status(500).json({ error: 'Error en la base de datos' });
    }
    res.json(results);
    })
}

exports.deleteUserChat = (req,res) => {
    const { userId, chatId } = req.body;

    db.query(`DELETE FROM cc_user_chat WHERE user_id = ? AND chat_id = ?`,[userId,chatId],(err,results)=>{
    if (err) {
        console.error('Error en la consulta:', err);
        return res.status(500).json({ error: 'Error en la base de datos' });
    }
    res.json(results);
    })
}


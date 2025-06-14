const db = require('../config/db.js')
require('dotenv').config();
const jwt = require('jsonwebtoken');

//GET

exports.getUsers = (req,res)=>{
    db.query('SELECT * FROM user', (err, results) => {
        if (err) {
          console.error('Error en la consulta:', err);
          return res.status(500).json({ error: 'Error en la base de datos' });
        }
        res.json(results);
      });
}

exports.getUsersFilter = (req,res)=>{
  const param = req.params.param;
  const value = req.params.value;

  const allowedFields = ["id", "email", "first_name", "last_name", "token"];
  if (!allowedFields.includes(param)) {
      return res.status(400).json({ error: "Parámetro no permitido" });
  }

  const query = `SELECT * FROM user WHERE ${param} = ?`;

  db.query(query, [value], (err, result) => {
      if (err) {
          console.error("Error en la consulta:", err);
          return res.status(500).json({ error: "Error en la base de datos" });
      }
      if (result.length === 0) {
          return res.status(404).json({ message: "Usuario no encontrado" });
      }
      res.json(result);
  });
}

exports.getUsersSpace = (req,res)=>{
  const spaceId = req.params.id;

  db.query(`SELECT u.*, us.*
            FROM user u
            JOIN user_space us ON u.id = us.user_id
            JOIN space s ON us.space_id = s.id
            WHERE s.id = ?;`,[spaceId],(err,results)=>{
    if (err) {
      console.error('Error en la consulta:', err);
      return res.status(500).json({ error: 'Error en la base de datos' });
    }
    res.json(results);
  });
}

//POST

let colorIndex = 0;
const colors = ['#3F5AB5', '#387C30', '#8B37DF', '#0F8860', '#B216AF', '#E36420'];

exports.createUser = (req, res) => {
  const { first_name, last_name, email, pass, private, profile_picture , file_type } = req.body;

  if (!first_name || !last_name || !email || !pass) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const tokenPayload = { email };
  const token = jwt.sign(tokenPayload, process.env.JWT_SECRET);

  const selectedColor = colors[colorIndex];
  colorIndex = (colorIndex + 1) % colors.length;

  const query = "INSERT INTO user (first_name, last_name, email, pass, private, profile_picture , file_type, color, token) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

  db.query(query, [first_name, last_name, email, pass, private, profile_picture , file_type, selectedColor, token], (err, result ) => {
    if (err) {
      console.error("Error al insertar usuario:", err);
      return res.status(500).json({ error: "Error en la base de datos" });
    }
    res.status(201).json({ message: "Usuario creado exitosamente", userId: result.insertId });
  });
};

//PUT

exports.updateUser = (req, res) => {
  const userId = req.params.userId;
  const { first_name, last_name, email, pass } = req.body;

  if (!first_name || !last_name || !email) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  let query;
  let params;

  const tokenPayload = { email };
  const token = jwt.sign(tokenPayload, process.env.JWT_SECRET);

  if (pass && pass.trim() !== "") {
    query = "UPDATE user SET first_name = ?, last_name = ?, email = ?, pass = ?, token = ? WHERE id = ?";
    params = [first_name, last_name, email, pass, token,userId];
  } else {
    query = "UPDATE user SET first_name = ?, last_name = ?, email = ?, token = ? WHERE id = ?";
    params = [first_name, last_name, email, token, userId];
  }

  db.query(query, params, (err, result) => {
    if (err) {
      console.error("Error al actualizar usuario:", err);
      return res.status(500).json({ error: "Error en la base de datos" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json({ message: "Usuario actualizado exitosamente", token:token });
  });
};

exports.updateUserPhoto = (req, res) => {
  const userId = req.params.userId;
  const { image, file_type } = req.body;

  if (!image) {
    return res.status(400).json({ error: "La imagen es obligatoria" });
  }

  const imageBuffer = Buffer.from(image, "base64");

  const query = "UPDATE user SET profile_picture = ?, file_type = ? WHERE id = ?";

  db.query(query, [imageBuffer, file_type || "image/png", userId], (err, result) => {
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

exports.deleteUser = (req, res) => {
  const userId = req.params.userId;

  const query = "DELETE FROM user WHERE id = ?";

  db.query(query, [userId], (err, result) => {
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
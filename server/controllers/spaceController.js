const db = require('../config/db.js')

//GET

exports.getSpace = (req,res)=>{
  const id = req.params.id;

  db.query(`SELECT name, id_admin, plan_id, file_type, logo
            FROM space
            WHERE id = ?;`,[id],(err,results)=>{
    if (err) {
      console.error('Error en la consulta:', err);
      return res.status(500).json({ error: 'Error en la base de datos' });
    }
    res.json(results);
  });
}

exports.getUserSpace = (req,res)=>{
  const userId = req.params.id;

  db.query(`SELECT s.id ,s.name, us.role, s.file_type ,s.logo
            FROM space s
            JOIN user_space us ON s.id = us.space_id
            JOIN user u ON us.user_id = u.id
            WHERE u.id = ?;`,[userId],(err,results)=>{
    if (err) {
      console.error('Error en la consulta:', err);
      return res.status(500).json({ error: 'Error en la base de datos' });
    }
    res.json(results);
  });
}

//POST

exports.createSpace = (req,res)=>{
  const { name, admin_id, plan_id, logo, file_type } = req.body;

  if (!name|| !admin_id || !plan_id) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const query = "INSERT INTO space (name, id_admin, plan_id, logo, file_type) VALUES (?, ?, ?, ?, ?)";

  db.query(query, [name, admin_id, plan_id, logo, file_type], (err, result) => {
    if (err) {
      console.error("Error al insertar usuario:", err);
      return res.status(500).json({ error: "Error en la base de datos" });
    }
    res.status(201).json({ message: "Usuario creado exitosamente", userId: result.insertId });
  });
}

exports.addUserSpace = (req,res) => {
  const { spaceId, userId, role } = req.body;

  const query = "INSERT INTO user_space(user_id,space_id,role) VALUES (?,?,?)";

  db.query(query, [userId, spaceId, role], (err, result) => {
    if (err) {
      console.error("Error al eliminar usuario:", err);
      return res.status(500).json({ error: "Error en la base de datos" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json({ message: "Usuario eliminado exitosamente" });
  });
}

//PUT

exports.updateSpacePlan = (req, res) => {
  const spaceId = req.params.spaceId;
  const { plan_id } = req.body;

  const query = "UPDATE space SET plan_id = ? WHERE id = ?";

  db.query(query, [plan_id, spaceId], (err, result) => {
    if (err) {
      console.error("Error al actualizar usuario:", err);
      return res.status(500).json({ error: "Error en la base de datos" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json({ message: "Usuario actualizado exitosamente" });
  });
};

exports.updateSpaceName = (req, res) => {
  const spaceId = req.params.spaceId;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const query = "UPDATE space SET name = ? WHERE id = ?";

  db.query(query, [name, spaceId], (err, result) => {
    if (err) {
      console.error("Error al actualizar usuario:", err);
      return res.status(500).json({ error: "Error en la base de datos" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json({ message: "Usuario actualizado exitosamente" });
  });
};

exports.updateSpaceLogo = (req, res) => {
  const spaceId = req.params.userId;
  const { image, file_type } = req.body;

  if (!image) {
    return res.status(400).json({ error: "La imagen es obligatoria" });
  }

  const imageBuffer = Buffer.from(image, "base64");

  const query = "UPDATE space SET logo = ?, file_type = ? WHERE id = ?";

  db.query(query, [imageBuffer, file_type || "image/png", spaceId], (err, result) => {
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

exports.updateUserRole = (req,res) => {
  const spaceId = req.params.spaceId;
  const userId = req.params.userId;
  const { role } = req.body;

  const query = "UPDATE user_space SET role = ? WHERE user_id = ? AND space_id = ?";

  db.query(query, [role, userId, spaceId], (err, result) => {
    if (err) {
      console.error("Error al eliminar usuario:", err);
      return res.status(500).json({ error: "Error en la base de datos" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json({ message: "Usuario eliminado exitosamente" });
  });
}

//DELETE

exports.deleteSpace = (req, res) => {
  const spaceId = req.params.spaceId;

  const query = "DELETE FROM space WHERE id = ?";

  db.query(query, [spaceId], (err, result) => {
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

exports.deleteUserSpace = (req,res) => {
  const spaceId = req.params.spaceId;
  const userId = req.params.userId;

  const query = "DELETE FROM user_space WHERE user_id = ? AND space_id = ?";

  db.query(query, [userId, spaceId], (err, result) => {
    if (err) {
      console.error("Error al eliminar usuario:", err);
      return res.status(500).json({ error: "Error en la base de datos" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json({ message: "Usuario eliminado exitosamente" });
  });
}
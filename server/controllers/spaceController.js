const db = require('../config/db.js');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


//GET

exports.getSpace = (req, res) => {
  const param = req.params.param;
  const value = req.params.value;

  const allowedFields = ["id", "token", "invitation_code"];
  if (!allowedFields.includes(param)) {
    return res.status(400).json({ error: "Parámetro no permitido" });
  }

  const query = `SELECT * FROM space WHERE ${param} = ?`;

  db.query(query, [value], (err, result) => {
    if (err) {
      console.error("Error en la consulta:", err);
      return res.status(500).json({ error: "Error en la base de datos" });
    }
    res.json(result);
  });
}

exports.getUserSpace = (req, res) => {
  const userId = req.params.id;

  db.query(`SELECT s.id ,s.name, us.role, us.owner, s.file_type ,s.color ,s.logo
            FROM space s
            JOIN user_space us ON s.id = us.space_id
            JOIN user u ON us.user_id = u.id
            WHERE u.id = ?;`, [userId], (err, results) => {
    if (err) {
      console.error('Error en la consulta:', err);
      return res.status(500).json({ error: 'Error en la base de datos' });
    }
    res.json(results);
  });
}

exports.getInvitationsFilter = (req, res) => {
  const param = req.params.param;
  const value = req.params.value;

  const allowedFields = ["user_id", "space_id", "status", "role"];

  if (!allowedFields.includes(param)) {
    return res.status(400).json({ error: "Parámetro no permitido" });
  }

  const query = `SELECT * FROM invitations WHERE ${param} = ?`;

  db.query(query, [value], (err, result) => {
    if (err) {
      console.error("Error en la consulta:", err);
      return res.status(500).json({ error: "Error en la base de datos" });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Invitacion no encontrada" });
    }
    res.json(result);
  });
}

//POST

let colorIndex = 0;
const colors = ['#3F5AB5', '#387C30', '#8B37DF', '#0F8860', '#B216AF', '#E36420'];

exports.createSpace = (req, res) => {
  const { name, admin_id, plan_id, logo, file_type } = req.body;

  if (!name || !admin_id || !plan_id) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const tokenPayload = { name };
  const token = jwt.sign(tokenPayload, process.env.JWT_SECRET);
  const invitationCode = crypto.randomBytes(12).toString('hex').slice(0, 12);

  const selectedColor = colors[colorIndex];
  colorIndex = (colorIndex + 1) % colors.length;

  const query = "INSERT INTO space (name, id_admin, plan_id, logo, file_type, color, token, invitation_code) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

  db.query(query, [name, admin_id, plan_id, logo, file_type, selectedColor, token, invitationCode], (err, result) => {
    if (err) {
      console.error("Error al insertar espacio:", err);
      return res.status(500).json({ error: "Error en la base de datos al crear espacio" });
    }

    const spaceId = result.insertId;

    const userSpaceQuery = "INSERT INTO user_space (space_id, user_id, role, owner) VALUES (?, ?, ?, 1)";
    const role = 'admin';

    db.query(userSpaceQuery, [spaceId, admin_id, role], (err2) => {
      if (err2) {
        console.error("Error al insertar relación space_user:", err2);
        return res.status(500).json({ error: "Espacio creado, pero error al vincular con el usuario" });
      }

      res.status(201).json({
        message: "Espacio creado y usuario vinculado exitosamente",
        spaceId: spaceId
      });
    });
  });
};

exports.addUserSpace = (req, res) => {
  const { spaceId, userId, role } = req.body;

  const query = "INSERT INTO user_space(user_id,space_id,role) VALUES (?,?,?)";

  db.query(query, [userId, spaceId, role], (err, result) => {
    if (err) {
      console.error("Error al crear usuario:", err);
      return res.status(500).json({ error: "Error en la base de datos" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json({ message: "Usuario creado exitosamente" });
  });
}

exports.createInvitation = (req, res) => {
  const { userId, spaceId, status, role } = req.body;

  const query = "INSERT INTO invitations (user_id, space_id, status, role) VALUES (?, ?, ?, ?)";

  db.query(query, [userId, spaceId, status, role], (err, result) => {
    if (err) {
      console.error("Error al crear la invitacion:", err);
      return res.status(404).json({ error: "Error en la base de datos" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json({ message: "Invitacion creada correctamente" });
  })
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

exports.updateUserRole = (req, res) => {
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

exports.deleteUserSpace = (req, res) => {
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
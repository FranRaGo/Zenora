// controllers/emailController.js
const nodemailer = require('nodemailer');

exports.sendCode = async (req, res) => {
  const email = req.body.email;

  if (!email) {
    return res.status(400).json({ message: "Email requerido" });
  }

  const code = Math.floor(10000 + Math.random() * 90000).toString(); // Código de 5 dígitos

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: `Zenora App <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Tu código de verificación',
    text: `Hola 👋, tu código es: ${code}`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("📩 Código enviado:", code);
    res.json({ 
      message: 'Código enviado con éxito',
      code: code
    });
  } catch (error) {
    console.error("❌ Error al enviar email:", error.response || error.message || error);
    res.status(500).json({ message: 'Error al enviar el correo' });
  }
};

const express = require('express');
const request = require('request');
const bodyParser = require("body-parser");
require('dotenv').config();
const nodemailer = require('nodemailer');

let port = process.env.PORT || 8080;

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/assets', express.static('assets'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/views/signup.html");
});

app.post('/', (req, res) => {
   

    
    const name = req.body.fName;
    const email = req.body.Email;

    
  if (validateForm(email)) {
    
  }
    // Configurar el transporter de Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'your-email-service', // Ejemplo: 'Gmail' o usar configuración de SMTP
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Bienvenido',
      text: `Hola ${name}, ¡Bienvenido a nuestro boletín!`,
    };
  
    // Enviar el correo electrónico
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.sendFile(__dirname + "/views/failure.html");
      } else {
        console.log('Correo electrónico enviado: ' + info.response);
        res.sendFile(__dirname + "/views/success.html");
      }
    });
  });


app.post(
    '/failure',(req,res)=>{
        res.redirect('/');
    }
);
app.listen(port, () => {
    console.log("http://localhost:" + port)
});




//Funtions
function validateForm(emailInput) {
    // Validar el formato del correo electrónico
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput)) {
      alert("Por favor, ingrese una dirección de correo electrónico válida.");
      return false;
    }
  
    // Limpieza adicional o validación según sea necesario
  
    // El formulario se enviará si pasa todas las validaciones
    return true;
  }
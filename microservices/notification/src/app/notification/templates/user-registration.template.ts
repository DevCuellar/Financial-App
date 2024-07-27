export const USER_REGISTRATION_TEMPLATE = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }
    .container {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      padding-bottom: 20px;
    }
    .header h1 {
      color: #333;
    }
    .content {
      font-size: 16px;
      color: #555;
      line-height: 1.6;
      padding-bottom: 20px;
    }
    .button {
      display: inline-block;
      padding: 10px 20px;
      font-size: 16px;
      color: #fff !important;
      background-color: #007bff;
      text-decoration: none;
      border-radius: 5px;
      text-align: center;
    }
    .footer {
      text-align: center;
      font-size: 14px;
      color: #aaa;
      padding-top: 20px;
    }
    .center{
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Confirmación de Registro</h1>
    </div>
    <div class="content">
      <p>¡Hola!</p>
      <p>Gracias por registrarte en nuestro servicio. Para completar tu registro, por favor confirma tu correo electrónico haciendo clic en el siguiente enlace:</p>
      <p class="center"><a href="{{confirmationLink}}" class="button">Confirmar mi correo electrónico</a></p>
      <p>Si no te has registrado en nuestro sitio web, puedes ignorar este correo.</p>
    </div>
    <div class="footer">
      <p>Este es un mensaje automático, por favor no respondas. Si necesitas ayuda, visita nuestro sitio web o contacta a soporte.</p>
    </div>
  </div>
</body>
</html>
`;

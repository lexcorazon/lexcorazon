<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Nueva reserva - Lex Corazón</title>
</head>
<body style="margin: 0; padding: 0; background: #0b0b0b; color: #fff; font-family: 'Inter', Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background: #0b0b0b; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background: #151515; border-radius: 12px; padding: 40px; color: #fff;">
          
          <tr>
            <td align="center" style="padding-bottom: 30px;">
              <img src="https://i.imgur.com/eyfVhrX.png" alt="Lex Corazón" width="120" style="display:block;">
            </td>
          </tr>

          <tr>
            <td align="center" style="padding-bottom: 20px;">
              <h1 style="font-size: 28px; font-weight: 700; margin: 0;">✨ Nueva reserva recibida</h1>
              <p style="font-size: 16px; color: #aaa; margin-top: 6px;">Detalles del formulario completado por un cliente</p>
            </td>
          </tr>

          <tr>
            <td>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 20px;">
                <tr><td style="padding: 8px 0;"><strong>Sesión:</strong> {{ $data['session_title'] ?? 'No especificada' }}</td></tr>
                <tr><td style="padding: 8px 0;"><strong>Fecha de nacimiento:</strong> {{ $data['birth_date'] ?? '-' }}</td></tr>
                <tr><td style="padding: 8px 0;"><strong>Lugar de nacimiento:</strong> {{ $data['birth_place'] ?? '-' }}</td></tr>
                <tr><td style="padding: 8px 0;"><strong>Hora de nacimiento:</strong> {{ $data['birth_time'] ?? '-' }}</td></tr>
                <tr><td style="padding: 8px 0;"><strong>Hora exacta:</strong> {{ !empty($data['time_exact']) ? 'Sí' : 'No' }}</td></tr>
                <tr><td style="padding: 8px 0;"><strong>¿Qué espera de la sesión?:</strong> {{ $data['expectations'] ?? '-' }}</td></tr>
                <tr><td style="padding: 8px 0;"><strong>¿Tiene conocimientos de astrología?:</strong> {{ !empty($data['knows_astrology']) ? 'Sí' : 'No' }}</td></tr>
                <tr><td style="padding: 8px 0;"><strong>Punto vital actual:</strong> {{ $data['life_point'] ?? '-' }}</td></tr>
                <tr><td style="padding: 8px 0;"><strong>Relación con la creatividad:</strong> {{ $data['creativity'] ?? '-' }}</td></tr>
              </table>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding-top: 40px;">
              <p style="font-size: 14px; color: #777;">Mensaje automático enviado desde el sitio <strong>Lex Corazón</strong></p>
              <p style="font-size: 13px; color: #555;">© {{ date('Y') }} Lex Corazón · Todos los derechos reservados</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>

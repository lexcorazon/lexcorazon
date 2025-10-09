<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <style>
    body {
      background: #0b0b0b;
      color: #f5f5f5;
      font-family: 'Helvetica Neue', Arial, sans-serif;
      padding: 30px;
      line-height: 1.7;
    }
    .container {
      max-width: 620px;
      margin: 0 auto;
      background: #111;
      border: 1px solid #222;
      border-radius: 12px;
      padding: 28px;
    }
    h1 {
      color: #fff;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-size: 22px;
      margin-bottom: 12px;
    }
    p {
      color: #ddd;
      margin: 6px 0;
    }
    strong {
      color: #fff;
    }
    .footer {
      margin-top: 28px;
      font-size: 13px;
      color: #999;
      text-align: center;
      border-top: 1px solid #222;
      padding-top: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🪞 Nueva solicitud de sesión</h1>

    <p><strong>Sesión:</strong> {{ $data['session_title'] ?? 'No especificada' }}</p>
    <p><strong>Fecha de nacimiento:</strong> {{ $data['birth_date'] }}</p>
    <p><strong>Lugar:</strong> {{ $data['birth_place'] }}</p>
    <p><strong>Hora:</strong> {{ $data['birth_time'] }} ({{ $data['time_exact'] ? 'Exacta' : 'Aproximada' }})</p>
    <p><strong>Conocimientos de astrología:</strong> {{ $data['knows_astrology'] ? 'Sí' : 'No' }}</p>

    @if(!empty($data['expectations']))
      <p><strong>Expectativas:</strong><br>{{ $data['expectations'] }}</p>
    @endif

    @if(!empty($data['life_point']))
      <p><strong>Punto vital actual:</strong><br>{{ $data['life_point'] }}</p>
    @endif

    @if(!empty($data['creativity']))
      <p><strong>Relación con la creatividad:</strong><br>{{ $data['creativity'] }}</p>
    @endif

    <div class="footer">
      Correo automático de <strong>Lex Corazón</strong> — no responder directamente.
    </div>
  </div>
</body>
</html>

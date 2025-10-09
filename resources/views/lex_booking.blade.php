<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>📬 Nueva reserva — Lex Corazón</title>
    <style>
        body {
            font-family: 'Segoe UI', Roboto, Arial, sans-serif;
            background: #f4f4f6;
            color: #222;
            margin: 0;
            padding: 40px 0;
        }
        .container {
            max-width: 720px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.08);
            overflow: hidden;
        }
        .header {
            background: #000;
            color: #fff;
            padding: 28px 40px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .header h1 {
            font-size: 22px;
            margin: 0;
            letter-spacing: 1px;
        }
        .content {
            padding: 36px 40px;
        }
        .section-title {
            font-size: 18px;
            font-weight: 700;
            color: #000;
            margin-bottom: 16px;
            border-left: 4px solid #000;
            padding-left: 10px;
        }
        ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        li {
            margin-bottom: 10px;
            line-height: 1.6;
        }
        li strong {
            color: #000;
        }
        .footer {
            background: #f1f1f1;
            color: #555;
            font-size: 13px;
            text-align: center;
            padding: 20px;
            border-top: 1px solid #e5e5e5;
        }
        .highlight {
            background: #fafafa;
            border-radius: 8px;
            padding: 14px 18px;
            border: 1px solid #eee;
        }
        .badge {
            display: inline-block;
            background: #000;
            color: #fff;
            padding: 4px 10px;
            font-size: 12px;
            border-radius: 6px;
            margin-left: 8px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .divider {
            height: 1px;
            background: #eee;
            margin: 24px 0;
        }
        .quote {
            font-style: italic;
            color: #777;
            margin-top: 16px;
            border-left: 3px solid #000;
            padding-left: 12px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🪶 Nueva reserva — Lex Corazón</h1>
            <span class="badge">{{ now()->format('d/m/Y H:i') }}</span>
        </div>

        <div class="content">
            <p>Has recibido una nueva solicitud de sesión desde el formulario de <strong>Lex Corazón</strong>.</p>

            <div class="divider"></div>

            <h2 class="section-title">🗓️ Datos de la sesión</h2>
            <ul>
                <li><strong>Sesión:</strong> {{ $session_title ?? '—' }}</li>
                <li><strong>Expectativas:</strong> {{ $expectations ?? '—' }}</li>
                <li><strong>Conocimientos de astrología:</strong> {{ $knows_astrology ?? 'No indicado' }}</li>
            </ul>

            <div class="divider"></div>

            <h2 class="section-title">🌙 Datos personales</h2>
            <ul>
                <li><strong>Fecha de nacimiento:</strong> {{ $birth_date ?? '—' }}</li>
                <li><strong>Lugar de nacimiento:</strong> {{ $birth_place ?? '—' }}</li>
                <li><strong>Hora de nacimiento:</strong> {{ $birth_time ?? '—' }}</li>
                <li><strong>Hora exacta:</strong> {{ !empty($time_exact) ? 'Sí' : 'No' }}</li>
            </ul>

            <div class="divider"></div>

            <h2 class="section-title">💭 Reflexiones del cliente</h2>
            <div class="highlight">
                <p><strong>¿En qué punto vital se encuentra?</strong><br>
                    {{ $life_point ?? '—' }}</p>

                <p><strong>¿Qué relación tiene con la creatividad?</strong><br>
                    {{ $creativity ?? '—' }}</p>
            </div>

        </div>
    </div>
</body>
</html>

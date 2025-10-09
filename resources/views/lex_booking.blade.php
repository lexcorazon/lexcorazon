<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Lex Corazón — Nueva Reserva</title>
    <style>
        body {
            font-family: 'Inter', 'Segoe UI', Roboto, sans-serif;
            background: #f5f6f8;
            color: #1a1a1a;
            margin: 0;
            padding: 40px 0;
        }

        .container {
            max-width: 760px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 10px;
            box-shadow: 0 2px 25px rgba(0,0,0,0.08);
            overflow: hidden;
        }

        .header {
            background: #0b0b0b;
            color: #f5f5f5;
            padding: 28px 40px;
            border-bottom: 3px solid #c7a76c;
        }

        .header h1 {
            font-size: 22px;
            margin: 0;
            font-weight: 600;
            letter-spacing: 0.4px;
        }

        .meta {
            font-size: 13px;
            color: #bcbcbc;
            margin-top: 6px;
        }

        .section {
            padding: 36px 40px;
            border-bottom: 1px solid #e9e9e9;
        }

        .section h2 {
            font-size: 17px;
            font-weight: 700;
            margin: 0 0 18px;
            color: #0b0b0b;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border-left: 4px solid #c7a76c;
            padding-left: 10px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 10px;
        }

        td {
            padding: 8px 0;
            font-size: 15px;
            vertical-align: top;
        }

        td.label {
            width: 42%;
            color: #555;
            font-weight: 600;
        }

        td.value {
            width: 58%;
            color: #111;
        }

        .highlight {
            background: #fafafa;
            border-left: 3px solid #c7a76c;
            padding: 14px 16px;
            border-radius: 6px;
            margin-top: 10px;
            line-height: 1.6;
            font-size: 15px;
        }

        .footer {
            background: #fafafa;
            color: #555;
            font-size: 13px;
            text-align: center;
            padding: 18px;
        }

        .footer a {
            color: #000;
            text-decoration: none;
            font-weight: 600;
        }

        .badge {
            background: #c7a76c;
            color: #fff;
            font-size: 12px;
            padding: 3px 8px;
            border-radius: 4px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- HEADER -->
        <div class="header">
            <h1>Nueva Reserva — Lex Corazón</h1>
            <div class="meta">
                Recibida el {{ now()->format('d/m/Y H:i') }}
            </div>
        </div>

        <!-- SESIÓN -->
        <div class="section">
            <h2>Datos de la sesión</h2>
            <table>
                <tr>
                    <td class="label">Tipo de sesión</td>
                    <td class="value">{{ $session_title ?? '—' }}</td>
                </tr>
                <tr>
                    <td class="label">Expectativas</td>
                    <td class="value">{{ $expectations ?? '—' }}</td>
                </tr>
                <tr>
                    <td class="label">Conocimientos de astrología</td>
                    <td class="value">{{ $knows_astrology ?? 'No indicado' }}</td>
                </tr>
            </table>
        </div>

        <!-- CLIENTE -->
        <div class="section">
            <h2>Datos personales</h2>
            <table>
                <tr>
                    <td class="label">Fecha de nacimiento</td>
                    <td class="value">{{ $birth_date ?? '—' }}</td>
                </tr>
                <tr>
                    <td class="label">Lugar de nacimiento</td>
                    <td class="value">{{ $birth_place ?? '—' }}</td>
                </tr>
                <tr>
                    <td class="label">Hora de nacimiento</td>
                    <td class="value">{{ $birth_time ?? '—' }}</td>
                </tr>
                <tr>
                    <td class="label">Hora exacta</td>
                    <td class="value">{{ !empty($time_exact) ? 'Sí' : 'No' }}</td>
                </tr>
            </table>
        </div>

        <!-- REFLEXIONES -->
        <div class="section">
            <h2>Información adicional</h2>

            <div class="highlight">
                <strong>¿En qué punto vital se encuentra?</strong><br>
                {{ $life_point ?? '—' }}
            </div>

            <div class="highlight">
                <strong>¿Qué relación tiene con la creatividad?</strong><br>
                {{ $creativity ?? '—' }}
            </div>
        </div>

        <!-- FOOTER -->
        <div class="footer">
            Este mensaje fue generado automáticamente por el sistema de reservas de 
            <strong>Lex Corazón</strong>.<br>
            Puedes responder a <a href="mailto:lexcorazon@gmail.com">lexcorazon@gmail.com</a>.
        </div>
    </div>
</body>
</html>

import { motion } from 'framer-motion'

export default function Trajectory() {
  const trajectoryItems = [
    {
      title: 'Lex Corazón – Fundadora y Mentora',
      period: 'Feb. 2023 – Actualidad',
      content: [
        <>Creación de un proyecto de <strong>mentoría creativa y coaching astrológico</strong>.</>,
        <>Diseño del recorrido de 6 etapas: <em>Viaje a las tripas, Motín existencial, Caja de cerillas, Lex ID, Aesthetic Overdose, Carne y hueso</em>.</>,
        <>Aplicación de astrología psicológica evolutiva para acompañar procesos de desbloqueo creativo y desarrollo personal.</>,
        <>Desarrollo de metodología propia, acompañamiento individual y programas piloto.</>,
      ],
      achievements:
        'Creación de un enfoque único que combina astrología, creatividad y estrategia; resultados tangibles en clientes en etapas iniciales de su marca o proyecto.',
    },
    {
      title: 'Juancho Marqués – Personal Stylist & Creative Consultant',
      period: 'Abr. 2021 – Feb. 2023 · En remoto',
      content: [
        'Estilismo en conciertos, eventos y videoclips.',
        'Dirección de vestuario y concepto visual para videoclips.',
        'Investigación de identidad de marca: inspiraciones, recursos visuales y conceptuales.',
        'Diseño y dirección artística de merchandising (incl. colaboración <strong>Adidas x Juancho Marqués</strong>).',
        'Creación del concepto <strong>Play for Art</strong> para la camiseta de fútbol.',
      ],
      achievements:
        'Consolidación de la estética del artista; desarrollo de recursos visuales y merch innovador; colaboración internacional con Adidas.',
    },
    {
      title: 'María Magdalena Studio – Fundadora y Diseñadora',
      period: 'Jun. 2014 – Feb. 2019 · Sevilla',
      content: [
        'Diseño, patronaje y producción de colecciones.',
        'Dirección creativa de fashion films, campañas y lookbooks.',
        'Gestión de e-commerce y estrategia digital.',
        'Coordinación de <strong>desfiles en Madrid Fashion Week</strong> y otros eventos.',
        'Comunicación, redes y colaboraciones con artistas.',
      ],
      achievements:
        'Presencia en eventos nacionales; premios en festivales de fashion film en Madrid y México; consolidación de identidad conceptual y filosófica de marca.',
    },
    {
      title: 'Roberto Diz Atelier – Prácticas en Diseño',
      period: 'Sept. 2014 – Dic. 2014 · Sevilla',
      content: [
        <>Apoyo en el diseño de la colección <strong>1492</strong>, presentada en Pasarela del Sur (Antiquarium, Sevilla).</>,
        'Colaboración en bocetos, selección de tejidos y confección.',
        'Atención al cliente en tienda.',
      ],
      achievements:
        'Participación directa en el proceso creativo de una colección de alta costura y experiencia en desfile profesional.',
    },
    {
      title: 'Formación',
      period: '',
      content: [
        '**Astrología Psicológica Evolutiva** – Astroterapéutica (*Abr. 2022 – Jun. 2024*)',
        '**Diseño y Gestión de la Moda** – Centro Universitario San Isidoro (*Sept. 2011 – Jun. 2014*)',
      ].map((line, i) => (
        <span
          key={i}
          dangerouslySetInnerHTML={{
            __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
          }}
        />
      )),
    },
    {
      title: 'Reconocimientos y Premios',
      period: '',
      content: [
        '*Best Fashion Film by New Talent* – Madrid Fashion Film Festival (2018)',
        '*Best Fashion Film by New Talent* – Mexico Fashion Film Festival (2018)',
        '*New Designers Awards Neo2 by Sancal – Categoría Moda* (2018)',
        '*Primer Premio del Certamen de Diseñadores Noveles* – Instituto Andaluz de la Juventud, Andalucía de Moda (2014)',
      ].map((line, i) => (
        <span
          key={i}
          dangerouslySetInnerHTML={{
            __html: line.replace(/\*(.*?)\*/g, '<strong>$1</strong>'),
          }}
        />
      )),
    },
    {
      title: 'Selecciones y nominaciones internacionales',
      period: '',
      content: [
        'BAFTA Aesthetica Film Festival – Official Selection',
        'ShowStudio Awards – Official Selection',
        'Copenhagen Fashion Film – Best New Talent Nominee',
        'Fashion Film Festival Milano – Official Selection',
        'La Jolla Fashion Film Festival – Best Director Nominee',
        'Mercedes-Benz Bokeh South Africa FFF – Official Selection',
        'Canadian International Fashion Film Festival – Official Selection',
        'Cinemoi Fashion Film Festival – Best Director Nominee',
        'Aurora Film Fest – Official Selection',
        'FKM Festival de Cine Fantástico – Official Selection',
        'Fantarifa International Film & TV Festival – Official Selection',
      ],
    },
  ]

  return (
    <motion.section
      id="trayectoria"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative px-4 md:px-8 py-24 bg-white text-black border-b border-gray-100 overflow-visible flex flex-col items-center"
    >
      <div className="relative z-10 max-w-4xl w-full flex flex-col gap-16 items-center">
        {/* Línea central */}
        <div className="absolute left-1/2 top-0 bottom-0 transform -translate-x-1/2 w-1 md:w-2 z-0">
          <motion.div
            className="w-full h-full bg-black"
            animate={{ backgroundPosition: ['0 0', '0 100%', '0 0'] }}
            transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
            style={{ backgroundSize: '100% 200%' }}
          />
        </div>

        {/* Bloques */}
        {trajectoryItems.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -200 : 200 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: i * 0.15 }}
            viewport={{ once: true }}
            className={`relative w-full md:w-2/3 px-5 py-6 rounded-lg shadow-sm bg-white hover:-translate-y-1 hover:shadow-lg z-10 ${
              i % 2 === 0 ? 'ml-auto text-right' : 'mr-auto text-left'
            }`}
          >
            <h3 className="text-lg md:text-xl font-semibold mb-1">{item.title}</h3>
            {item.period && (
              <p className="text-sm text-gray-500 italic mb-2">{item.period}</p>
            )}
            <ul className="space-y-1 list-disc list-inside text-sm text-gray-700 mb-2">
              {item.content.map((line, j) => (
                <li key={j}>
                  {typeof line === 'string' ? (
                    <span
                      dangerouslySetInnerHTML={{
                        __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
                      }}
                    />
                  ) : (
                    line
                  )}
                </li>
              ))}
            </ul>
            {item.achievements && (
              <p className="text-sm font-semibold mt-2">{item.achievements}</p>
            )}
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

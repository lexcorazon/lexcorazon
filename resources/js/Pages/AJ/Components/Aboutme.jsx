import { motion } from 'framer-motion'

export default function AboutMe() {
  const paragraphs = [
    "Mi principal trabajo, inamovible e irremplazable, me acompaña desde siempre: observar lo que me atraviesa y traducirlo en palabras, formas, conceptos y símbolos. Me interesa dar cuerpo a lo no dicho, lo tabú, lo excepcional, lo doloroso y lo verdaderamente bello.",
    "Entre dos polos se mueven mis intereses: lo sutil y lo superficial. En ese vaivén voy descifrando, maravillándome y creando.",
    "A lo largo de los años he explorado distintos lenguajes para expandir esa mirada. La escritura ha sido siempre mi vehículo de cabecera, un preámbulo inevitable antes de transformarlo en imágenes, conceptos o proyectos. Desde ahí he tejido recorridos en la moda y el estilismo, en la dirección artística de proyectos y en la mentoría con artistas. Más recientemente he incorporado la astrología como herramienta simbólica que amplía mi manera de acompañar procesos creativos y vitales.",
    "Todo en mí nace de una necesidad inevitable de comunicar y expresar, de sacar hacia afuera lo que no puede quedarse quieto. El arte, en cualquiera de sus formas, ha sido siempre la vía para hacerlo: escribir, vestir, imaginar, interpretar símbolos. No lo concibo como adorno, sino como un lenguaje esencial para habitar el mundo y compartirlo con otros.",
  ]

  return (
    <motion.section
      id="sobre-mi"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="relative px-6 md:px-16 py-28 bg-black text-white border-b border-gray-800 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto flex relative">
        {/* Línea vertical animada */}
        <motion.div
          className="absolute left-0 top-0 w-1 md:w-2 bg-white rounded-full"
          initial={{ height: 0 }}
          whileInView={{ height: '100%' }}
          transition={{ duration: 2, ease: 'easeInOut' }}
          viewport={{ once: true }}
        />

        {/* Texto */}
        <div className="ml-6 md:ml-12 space-y-6 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            animate={{
              scale: [1, 1.05, 1],
              color: ['#ffffff', '#ffffff', '#ffffff'],
              textShadow: [
                '0px 0px 0px rgba(255,255,255,0)',
                '0px 0px 10px rgba(255,255,255,0.3)',
                '0px 0px 0px rgba(255,255,255,0)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Sobre mí
          </motion.h2>

          {paragraphs.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.3 }}
              className="text-lg leading-relaxed text-white"
            >
              {p}
            </motion.p>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

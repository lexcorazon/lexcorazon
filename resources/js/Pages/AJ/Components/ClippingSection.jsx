import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function ClippingSection({ items = [] }) {
  if (!items.length) return null

  return (
    <motion.section
      id="clipping"
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="pt-10 pb-10 bg-white border-b border-gray-100"
    >
      <div className="w-full">
        <motion.div
          className="flex gap-4 px-4 md:px-8 flex-wrap w-full"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
              }}
              transition={{ type: 'spring', stiffness: 120 }}
              className="flex-1 min-w-[250px] relative"
            >
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="block w-full h-40 overflow-hidden shadow-md cursor-pointer relative"
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.medio}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute bottom-2 left-2 px-4 py-1 bg-black rounded-md text-white text-2xl font-extrabold shadow-lg">
                  {item.medio}
                </div>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}

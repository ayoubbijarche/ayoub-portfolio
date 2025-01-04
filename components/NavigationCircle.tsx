import React from 'react'
import { motion } from 'framer-motion'

interface NavigationCircleProps {
  direction: 'left' | 'right'
  onClick: () => void
}

const NavigationCircle: React.FC<NavigationCircleProps> = ({ direction, onClick }) => {
  return (
    <motion.div
      className={`w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center cursor-pointer`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
    >
      <motion.div
        className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className={`w-6 h-6 text-white ${direction === 'left' ? 'rotate-180' : ''}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </motion.div>
    </motion.div>
  )
}

export default NavigationCircle


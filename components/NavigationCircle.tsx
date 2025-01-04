"use client"
import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface NavigationCircleProps {
  leftcirclepage?: string
  rightcirclepage?: string
}

const NavigationCircle: React.FC<NavigationCircleProps> = ({ leftcirclepage, rightcirclepage }) => {
  return (
    <div className="fixed top-0 left-0 right-0 flex justify-between items-center p-4 z-50">
      {leftcirclepage && (
        <Link href={leftcirclepage} passHref legacyBehavior>
          <motion.a
            className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6 text-white rotate-180"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.div>
          </motion.a>
        </Link>
      )}
      {rightcirclepage && (
        <Link href={rightcirclepage} passHref legacyBehavior>
          <motion.a
            className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.div>
          </motion.a>
        </Link>
      )}
    </div>
  )
}

export default NavigationCircle


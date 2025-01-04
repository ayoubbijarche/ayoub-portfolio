'use client'

import React, { useEffect, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

const CustomCursor: React.FC = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const cursorSize = 10
  const circleSize = 60

  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - cursorSize / 2)
      cursorY.set(e.clientY - cursorSize / 2)
      setCursorPosition({ x: e.clientX - circleSize / 2, y: e.clientY - circleSize / 2 })
    }

    window.addEventListener('mousemove', moveCursor)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
    }
  }, [cursorX, cursorY])

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 bg-white rounded-full pointer-events-none z-50"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: cursorSize,
          height: cursorSize,
        }}
      />
      <svg
        className="fixed top-0 left-0 pointer-events-none z-40"
        style={{
          transform: `translate(${cursorPosition.x}px, ${cursorPosition.y}px)`,
        }}
        width={circleSize}
        height={circleSize}
        viewBox={`0 0 ${circleSize} ${circleSize}`}
      >
        <filter id="pencil-effect" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" result="noise"/>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G"/>
        </filter>
        <circle
          cx={circleSize / 2}
          cy={circleSize / 2}
          r={(circleSize - 2) / 2}
          fill="none"
          stroke="white"
          strokeWidth="1"
          filter="url(#pencil-effect)"
        >
          <animate
            attributeName="r"
            values={`${(circleSize - 2) / 2 - 2};${(circleSize - 2) / 2 + 2};${(circleSize - 2) / 2 - 2}`}
            dur="1s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-dasharray"
            values="0 1 2 3 4 5;1 2 3 4 5 0;2 3 4 5 0 1;3 4 5 0 1 2;4 5 0 1 2 3;5 0 1 2 3 4"
            dur="0.5s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </>
  )
}

export default CustomCursor


'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { ArrowLeft, Menu } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion'
import stakeimg from "../../app/assets/staking.png"
import { Fredericka_the_Great, Unbounded } from 'next/font/google'
import CustomCursor from '../../components/CustomCursor'
import NavigationCircle from '@/components/NavigationCircle'
import { collections } from '@/lib/data'

const fredericka = Fredericka_the_Great({ subsets: ['latin'], weight: '400' })
const unbounded = Unbounded({ subsets: ['latin'], weight: '400' })


export default function ProjectsContent() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const viewPositionX = useSpring(0, { stiffness: 100, damping: 30 })
  const viewPositionY = useSpring(0, { stiffness: 100, damping: 30 })

   const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const newX = (e.clientX - rect.left) / rect.width
    const newY = (e.clientY - rect.top) / rect.height
    
    setMousePosition({ x: newX, y: newY })

    viewPositionX.set((newX - 0.1) * 700)
    viewPositionY.set((newY - 0.1) * 700)
  }, [viewPositionX, viewPositionY])

  useEffect(() => {
    const container = containerRef.current
    container?.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      container?.removeEventListener('mousemove', handleMouseMove)
    }
  }, [handleMouseMove])
  
  const [currentPage, setCurrentPage] = useState(0)

  const navigatePrev = () => {
    setCurrentPage((prev) => (prev - 1 + collections.length) % collections.length)
  }

  const navigateNext = () => {
    setCurrentPage((prev) => (prev + 1) % collections.length)
  }

  return (
    <div className="relative min-h-screen  bg-[#1d1c1b] overflow-hidden cursor-none" ref={containerRef}>
      {/* Navigation Circles */}
      <NavigationCircle leftcirclepage='/' rightcirclepage='/'/>
      {/* Dimming Overlay */}
      <AnimatePresence>
        {hoveredId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 pointer-events-none z-10"
          />
        )}
      </AnimatePresence>

      

      {/* Main Title */}
      <motion.div 
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8.5vw] leading-none font-extrabold text-[#f2f2d7] pointer-events-none z-0 text-center w-full ${fredericka.className}`}
      >
        {hoveredId ? <motion.h1 className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] leading-none font-extrabold text-[#f2f2d7] pointer-events-none z-0 text-center w-full ${fredericka.className}`}>
          A
        </motion.h1> : 'Projects\n\nCollection'}
      </motion.div>

      {/* Collection Items */}
      <motion.div 
        className="relative w-full h-screen"
        style={{
          x: useTransform(viewPositionX, (x) => -x),
          y: useTransform(viewPositionY, (y) => -y),
        }}
      >
        {collections.map((collection) => (
          <motion.div
            key={collection.id}
            className={`absolute cursor-none z-20 transition-opacity duration-500
              ${hoveredId && hoveredId !== collection.id ? 'opacity-50' : 'opacity-100'}`}
            style={{
              left: `${collection.position.x}%`,
              top: `${collection.position.y}%`,
              width: `${collection.size.width}px`,
              height: `${collection.size.height}px`,
            }}
            animate={{
              zIndex: hoveredId === collection.id ? 30 : 20,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              mass: 1
            }}
            onHoverStart={() => setHoveredId(collection.id)}
            onHoverEnd={() => setHoveredId(null)}
            onClick={() => console.log(`Clicked collection ${collection.id}`)}
          >
            <div className="relative w-full h-full">
              {/* Collection Image */}
              <div className="relative w-full h-full rounded-[10px] overflow-hidden">
                <Image
                  src={stakeimg}
                  alt={`Collection ${collection.id}`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Title and Subtitle */}
              <AnimatePresence>
                {hoveredId === collection.id && (
                  <motion.div
                    initial={{ opacity: 0, x: collection.textDirection === 'left' ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: collection.textDirection === 'left' ? -20 : 20 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className={`absolute ${collection.textDirection === 'left' ? 'right-full pr-6 text-right' : 'left-full pl-6 text-left'} top-10 -translate-y-1/2 whitespace-nowrap`}
                  >
                    <motion.h3 
                      className={`text-[#f4f1e7] text-5xl font-bold mb-2 ${fredericka.className}`}
                      initial={{ opacity: 0, x: collection.textDirection === 'left' ? -10 : 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 30 }}
                    >
                      {collection.title}
                    </motion.h3>
                    <motion.p 
                      className={`text-[#f4f1e7] text-sm tracking-[0.2em] uppercase ${unbounded.className}`}
                      initial={{ opacity: 0, x: collection.textDirection === 'left' ? -10 : 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 30 }}
                    >
                      {collection.subtitle}
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Source Code Text */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredId === collection.id ? 1 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute left-1/2 -translate-x-1/2 top-full mt-2"
              >
                <p className={`text-[#f4f1e7] text-xs tracking-wider opacity-80 ${unbounded.className}`}>
                  source code
                </p>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Custom Cursor */}
      <CustomCursor />
    </div>
  )
}


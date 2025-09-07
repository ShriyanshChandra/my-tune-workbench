import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Compass, Camera, Building, TreePine, Sparkles, Zap } from 'lucide-react'

const scenes = [
  {
    id: 'city',
    name: 'Urban Explorer',
    background: 'from-orange-400 via-red-500 to-pink-600',
    icon: Building
  },
  {
    id: 'nature', 
    name: 'Nature Lover',
    background: 'from-green-400 via-emerald-500 to-teal-600',
    icon: TreePine
  },
  {
    id: 'history',
    name: 'History Seeker',
    background: 'from-amber-400 via-yellow-500 to-orange-600', 
    icon: Sparkles
  },
  {
    id: 'digital',
    name: 'Digital Pioneer', 
    background: 'from-purple-400 via-blue-500 to-indigo-600',
    icon: Zap
  }
]

interface HeroSectionProps {
  onGetStarted: () => void
}

const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted }) => {
  const [currentScene, setCurrentScene] = useState(0)
  const [explorerVisible, setExplorerVisible] = useState(false)

  useEffect(() => {
    // Start explorer animation
    const timer = setTimeout(() => setExplorerVisible(true), 500)
    
    // Cycle through scenes
    const sceneInterval = setInterval(() => {
      setCurrentScene(prev => (prev + 1) % scenes.length)
    }, 4000)

    return () => {
      clearTimeout(timer)
      clearInterval(sceneInterval)
    }
  }, [])

  const titleText = "Your Adventure Starts Here"

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dynamic Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScene}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 1.5 }}
          className={`absolute inset-0 bg-gradient-to-br ${scenes[currentScene].background}`}
        />
      </AnimatePresence>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, -5, 0],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.2
            }}
            className="absolute w-2 h-2 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      {/* Explorer Character */}
      <motion.div
        initial={{ x: -200, opacity: 0 }}
        animate={{ 
          x: explorerVisible ? 100 : -200, 
          opacity: explorerVisible ? 1 : 0 
        }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="absolute left-0 bottom-20 z-10"
      >
        <motion.div
          animate={{
            y: [0, -5, 0],
            x: [0, 3, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative"
        >
          {/* Explorer silhouette */}
          <div className="w-16 h-16 bg-black/70 rounded-full relative shadow-lg">
            <div className="absolute -top-1 -right-1 w-4 h-6 bg-black/50 rounded" />
            <Camera className="absolute top-4 right-6 w-3 h-3 text-white" />
          </div>
          
          {/* Glowing trail */}
          <motion.div
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute -bottom-1 left-2 w-3 h-1 bg-primary/60 rounded-full blur-sm"
          />
        </motion.div>
      </motion.div>

      {/* Hero Content */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        {/* Brand Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30"
          >
            <Compass className="w-6 h-6 text-white" />
          </motion.div>
          <span className="text-3xl font-bold text-white tracking-wide">Discovery Atlas</span>
        </motion.div>

        {/* Animated Title */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: { staggerChildren: 0.05 }
              }
            }}
          >
            {titleText.split("").map((char, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.5 }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.div>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          Embark on AI-powered quests that transform the world into your personal adventure playground
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.5, duration: 0.6 }}
        >
          <Button
            size="lg"
            onClick={onGetStarted}
            className="relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 text-lg px-8 py-6 rounded-full group transition-all duration-300"
          >
            <motion.div
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%']
              }}
              transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
              className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10 bg-[length:200%_200%]"
            />
            <span className="relative z-10 font-semibold">Start Exploring</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="relative z-10 ml-2"
            >
              ✨
            </motion.span>
          </Button>
        </motion.div>
      </div>

      {/* Scene Indicators */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex gap-2">
          {scenes.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                index === currentScene 
                  ? 'bg-white w-6' 
                  : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default HeroSection
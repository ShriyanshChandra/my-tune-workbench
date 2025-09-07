import React, { useRef, useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Camera, Mountain, TreePine, Building, Sparkles, Bird, Compass, Zap } from 'lucide-react'
import { motion, useScroll, useTransform, useAnimation, AnimatePresence } from 'framer-motion'
import ThemeToggleButton from '@/components/ui/theme-toggle-button'

// Scene configurations
const scenes = [
  {
    id: 'city',
    name: 'Urban Explorer',
    icon: Building,
    background: 'bg-gradient-to-b from-orange-400 via-red-500 to-pink-600',
    badge: '🏙️'
  },
  {
    id: 'nature',
    name: 'Nature Lover',
    icon: TreePine,
    background: 'bg-gradient-to-b from-green-400 via-emerald-500 to-teal-600',
    badge: '🌿'
  },
  {
    id: 'museum',
    name: 'History Buff',
    icon: Sparkles,
    background: 'bg-gradient-to-b from-amber-400 via-yellow-500 to-orange-600',
    badge: '🏛️'
  },
  {
    id: 'cosmos',
    name: 'Digital Pioneer',
    icon: Zap,
    background: 'bg-gradient-to-b from-purple-400 via-blue-500 to-indigo-600',
    badge: '🚀'
  }
]

// Animation variants
const explorerVariants = {
  walking: {
    x: [0, 8, 0, -4, 0],
    y: [0, -2, 0, -1, 0],
    transition: {
      duration: 2,
      repeat: Infinity as number,
      ease: "easeInOut" as const
    }
  }
}

const typeWriter = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const letter = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
}

const Index = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [currentScene, setCurrentScene] = useState(0)
  const [explorerPosition, setExplorerPosition] = useState(0)
  const [collectedBadges, setCollectedBadges] = useState<string[]>([])
  const [isPhotoFlash, setIsPhotoFlash] = useState(false)
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([])

  const pageRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({ target: pageRef, offset: ['start start', 'end end'] })
  
  const explorerX = useTransform(scrollYProgress, [0, 1], [0, window.innerWidth - 100])
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -200])

  // Auto-advance scenes and collect badges
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentScene((prev) => {
        const nextScene = (prev + 1) % scenes.length
        
        // Trigger photo flash
        setIsPhotoFlash(true)
        setTimeout(() => setIsPhotoFlash(false), 300)
        
        // Add badge after flash
        setTimeout(() => {
          setCollectedBadges((badges) => [...badges, scenes[prev].badge])
          
          // Add particles
          const newParticles = Array.from({ length: 10 }, (_, i) => ({
            id: Date.now() + i,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight
          }))
          setParticles(newParticles)
        }, 500)
        
        return nextScene
      })
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  // Clean up particles
  useEffect(() => {
    const cleanup = setTimeout(() => setParticles([]), 3000)
    return () => clearTimeout(cleanup)
  }, [particles])

  const handleGetStarted = () => {
    if (user) navigate('/home')
    else navigate('/auth')
  }

  const title = "Your Adventure Starts Here"

  return (
    <div ref={pageRef} className="min-h-screen relative overflow-hidden">
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggleButton start="top-right" />
      </div>

      {/* Collected Badges */}
      <div className="absolute top-4 left-4 z-50 flex gap-2">
        <AnimatePresence>
          {collectedBadges.map((badge, index) => (
            <motion.div
              key={`${badge}-${index}`}
              initial={{ scale: 0, y: 100, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="w-12 h-12 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl border border-white/20"
            >
              {badge}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Background Scenes */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScene}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 1.2 }}
          className={`absolute inset-0 ${scenes[currentScene].background}`}
          style={{ y: backgroundY }}
        >
          {/* Scene-specific elements */}
          {currentScene === 0 && <CityScene />}
          {currentScene === 1 && <NatureScene />}
          {currentScene === 2 && <MuseumScene />}
          {currentScene === 3 && <CosmosScene />}
        </motion.div>
      </AnimatePresence>

      {/* Photo Flash Effect */}
      <AnimatePresence>
        {isPhotoFlash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-white/80 z-30 pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* AI Particles */}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{ scale: 0, x: particle.x, y: particle.y }}
            animate={{ 
              scale: [0, 1, 0],
              y: particle.y - 100,
              opacity: [0, 1, 0]
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeOut" as const }}
            className="absolute w-2 h-2 bg-white rounded-full shadow-lg shadow-white/50 pointer-events-none z-20"
          />
        ))}
      </AnimatePresence>

      {/* Explorer Character */}
      <motion.div
        style={{ x: explorerX }}
        variants={explorerVariants}
        animate="walking"
        className="absolute bottom-32 z-20 pointer-events-none"
      >
        <div className="relative">
          {/* Explorer silhouette */}
          <div className="w-20 h-20 bg-black/80 rounded-full relative">
            {/* Backpack */}
            <div className="absolute -top-2 -right-1 w-6 h-8 bg-black/60 rounded"></div>
            {/* Camera */}
            <div className="absolute top-6 right-8 w-4 h-3 bg-black/70 rounded flex items-center justify-center">
              <Camera className="w-2 h-2 text-white" />
            </div>
          </div>
          
          {/* Glowing footsteps */}
          <motion.div
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 1, repeat: Infinity as number }}
            className="absolute -bottom-2 left-2 w-4 h-2 bg-primary/60 rounded-full blur-sm"
          />
        </div>
      </motion.div>

      {/* Hero Content */}
      <div className="relative z-30 min-h-screen flex flex-col items-center justify-center text-center px-4">
        <motion.div className="mb-8">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity as number, ease: "linear" as const }}
              className="w-16 h-16 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-white/20"
            >
              <Compass className="w-8 h-8 text-white" />
            </motion.div>
            <span className="text-4xl font-bold text-white drop-shadow-lg">
              Discovery Atlas
            </span>
          </div>

          {/* Typing animation */}
          <motion.div
            variants={typeWriter}
            initial="hidden"
            animate="visible"
            className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg mb-8"
          >
            {title.split("").map((char, index) => (
              <motion.span key={index} variants={letter}>
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="text-xl text-white/90 max-w-2xl mx-auto mb-8 drop-shadow"
          >
            Embark on AI-powered discovery quests that transform the world into your personal adventure playground
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.5, duration: 0.6 }}
          >
            <Button 
              size="lg" 
              onClick={handleGetStarted}
              className="relative overflow-hidden bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 text-lg px-12 py-6 rounded-full group"
            >
              <motion.div
                animate={{ 
                  background: [
                    "linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.3))",
                    "linear-gradient(45deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1))"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity as number }}
                className="absolute inset-0 rounded-full"
              />
              <span className="relative z-10">Start Exploring</span>
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity as number }}
                className="relative z-10 ml-2"
              >
                ✨
              </motion.div>
            </Button>
          </motion.div>
        </motion.div>

        {/* Scene Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex gap-2">
            {scenes.map((scene, index) => (
              <div
                key={scene.id}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentScene 
                    ? 'bg-white shadow-lg shadow-white/50' 
                    : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// Scene Components
const CityScene = () => (
  <div className="absolute inset-0 overflow-hidden">
    {/* Buildings */}
    <div className="absolute bottom-0 left-0 w-full h-1/3 bg-black/20 backdrop-blur-sm">
      <div className="flex h-full items-end justify-around">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.8 }}
            className="bg-black/40 backdrop-blur-sm border border-white/10"
            style={{ 
              width: Math.random() * 40 + 30,
              height: Math.random() * 100 + 80
            }}
          />
        ))}
      </div>
    </div>
    
    {/* Flying birds */}
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        animate={{ 
          x: [-100, window.innerWidth + 100],
          y: [100 + i * 20, 80 + i * 25]
        }}
        transition={{ 
          duration: 8 + i * 2, 
          repeat: Infinity as number,
          delay: i * 2
        }}
        className="absolute"
      >
        <Bird className="w-4 h-4 text-white/60" />
      </motion.div>
    ))}
  </div>
)

const NatureScene = () => (
  <div className="absolute inset-0 overflow-hidden">
    {/* Mountains */}
    <div className="absolute bottom-0 left-0 w-full h-2/3">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute bottom-0 left-1/4 w-64 h-64 bg-black/30 backdrop-blur-sm"
        style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
      />
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="absolute bottom-0 right-1/4 w-48 h-48 bg-black/40 backdrop-blur-sm"
        style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
      />
    </div>
    
    {/* Giant tree */}
    <motion.div
      initial={{ scale: 0, y: 50 }}
      animate={{ scale: 1, y: 0 }}
      transition={{ duration: 1.5, type: "spring" }}
      className="absolute bottom-20 left-1/2 transform -translate-x-1/2"
    >
      <TreePine className="w-32 h-32 text-black/40" />
    </motion.div>
    
    {/* Floating leaves */}
    {[...Array(10)].map((_, i) => (
      <motion.div
        key={i}
        animate={{ 
          y: [0, -20, 0],
          x: [0, 10, -5, 0],
          rotate: [0, 180, 360]
        }}
        transition={{ 
          duration: 4 + i, 
          repeat: Infinity as number,
          delay: i * 0.5
        }}
        className="absolute text-white/30"
        style={{ 
          left: Math.random() * 100 + '%',
          top: Math.random() * 50 + 50 + '%'
        }}
      >
        🍃
      </motion.div>
    ))}
  </div>
)

const MuseumScene = () => (
  <div className="absolute inset-0 overflow-hidden">
    {/* Museum columns */}
    <div className="absolute bottom-0 left-0 w-full flex justify-center items-end">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: i * 0.1, duration: 0.8 }}
          className="w-8 h-40 bg-black/30 backdrop-blur-sm mx-4 border border-white/20"
        />
      ))}
    </div>
    
    {/* Glowing artifacts */}
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        animate={{ 
          opacity: [0.3, 1, 0.3],
          scale: [0.8, 1.2, 0.8]
        }}
        transition={{ 
          duration: 2 + i * 0.3, 
          repeat: Infinity as number,
          delay: i * 0.4
        }}
        className="absolute w-4 h-4 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/50"
        style={{ 
          left: Math.random() * 80 + 10 + '%',
          top: Math.random() * 60 + 20 + '%'
        }}
      />
    ))}
  </div>
)

const CosmosScene = () => (
  <div className="absolute inset-0 overflow-hidden">
    {/* Stars */}
    {[...Array(50)].map((_, i) => (
      <motion.div
        key={i}
        animate={{ 
          opacity: [0.2, 1, 0.2],
          scale: [0.5, 1.5, 0.5]
        }}
        transition={{ 
          duration: Math.random() * 3 + 1, 
          repeat: Infinity as number,
          delay: Math.random() * 2
        }}
        className="absolute w-1 h-1 bg-white rounded-full"
        style={{ 
          left: Math.random() * 100 + '%',
          top: Math.random() * 100 + '%'
        }}
      />
    ))}
    
    {/* AI Network particles */}
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        animate={{ 
          x: [0, Math.random() * 200 - 100],
          y: [0, Math.random() * 200 - 100],
          opacity: [0, 1, 0]
        }}
        transition={{ 
          duration: 4 + Math.random() * 3, 
          repeat: Infinity as number,
          delay: Math.random() * 4
        }}
        className="absolute w-2 h-2 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50"
        style={{ 
          left: Math.random() * 100 + '%',
          top: Math.random() * 100 + '%'
        }}
      />
    ))}
    
    {/* Digital grid lines */}
    <div className="absolute inset-0 opacity-20">
      <div className="grid grid-cols-12 grid-rows-8 h-full w-full">
        {[...Array(96)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.3, 0] }}
            transition={{ 
              duration: 2,
              repeat: Infinity as number,
              delay: i * 0.05
            }}
            className="border border-cyan-500/20"
          />
        ))}
      </div>
    </div>
  </div>
)

export default Index
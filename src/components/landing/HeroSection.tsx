import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Compass, Camera, MapPin, TreePine, Building2, Sparkles, Zap } from 'lucide-react'

const scenes = [
  {
    id: 'city',
    title: 'Urban Explorer',
    background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FFD23F 100%)',
    overlay: 'from-orange-500/20 to-yellow-500/20',
    elements: (
      <>
        {/* City Buildings */}
        <div className="absolute bottom-0 left-0 w-full h-2/3">
          <div className="absolute bottom-0 left-8 w-16 h-32 bg-gradient-to-t from-orange-800/80 to-orange-600/60 rounded-t-lg" />
          <div className="absolute bottom-0 left-28 w-12 h-40 bg-gradient-to-t from-red-800/80 to-red-600/60 rounded-t-lg" />
          <div className="absolute bottom-0 left-44 w-20 h-28 bg-gradient-to-t from-yellow-800/80 to-yellow-600/60 rounded-t-lg" />
          <div className="absolute bottom-0 right-8 w-14 h-36 bg-gradient-to-t from-orange-900/80 to-orange-700/60 rounded-t-lg" />
        </div>
        {/* Flying birds */}
        <motion.div
          animate={{ x: [0, 100, 200], y: [0, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-10"
        >
          <div className="w-2 h-1 bg-white/60 rounded-full" />
        </motion.div>
      </>
    ),
    badge: { icon: Building2, color: 'bg-orange-500' }
  },
  {
    id: 'nature',
    title: 'Nature Seeker', 
    background: 'linear-gradient(135deg, #4ECDC4 0%, #44A08D 50%, #093637 100%)',
    overlay: 'from-emerald-500/20 to-teal-500/20',
    elements: (
      <>
        {/* Large tree */}
        <div className="absolute bottom-0 right-12 w-32 h-48">
          <div className="absolute bottom-0 left-1/2 w-4 h-20 bg-gradient-to-t from-amber-800 to-amber-600 rounded-t-full transform -translate-x-1/2" />
          <div className="absolute bottom-16 left-1/2 w-28 h-28 bg-gradient-to-b from-green-400 to-green-600 rounded-full transform -translate-x-1/2" />
        </div>
        {/* Mountains */}
        <div className="absolute bottom-0 left-0 w-full h-1/2">
          <div className="absolute bottom-0 left-4 w-20 h-32 bg-gradient-to-t from-slate-700 to-slate-500 transform skew-x-12" />
          <div className="absolute bottom-0 left-16 w-24 h-40 bg-gradient-to-t from-slate-800 to-slate-600 transform -skew-x-6" />
        </div>
        {/* Floating leaves */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-24 right-20"
        >
          <div className="w-3 h-3 bg-green-400 rounded-full" />
        </motion.div>
      </>
    ),
    badge: { icon: TreePine, color: 'bg-green-500' }
  },
  {
    id: 'history',
    title: 'Time Keeper',
    background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 50%, #8B4513 100%)',
    overlay: 'from-amber-500/20 to-yellow-500/20',
    elements: (
      <>
        {/* Museum columns */}
        <div className="absolute bottom-0 left-8 w-full h-3/4">
          <div className="absolute bottom-0 left-4 w-6 h-full bg-gradient-to-t from-amber-800/80 to-amber-600/60" />
          <div className="absolute bottom-0 left-16 w-6 h-full bg-gradient-to-t from-amber-800/80 to-amber-600/60" />
          <div className="absolute bottom-0 left-28 w-6 h-full bg-gradient-to-t from-amber-800/80 to-amber-600/60" />
          <div className="absolute top-0 left-4 w-24 h-8 bg-gradient-to-b from-amber-700/80 to-amber-800/60" />
        </div>
        {/* Glowing artifacts */}
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-32 right-16 w-4 h-4 bg-yellow-400 rounded-full blur-sm"
        />
        <motion.div
          animate={{ opacity: [0.6, 1, 0.6], y: [0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          className="absolute top-28 right-24 w-3 h-6 bg-amber-400/80 rounded-sm"
        />
      </>
    ),
    badge: { icon: Sparkles, color: 'bg-amber-500' }
  },
  {
    id: 'cosmos',
    title: 'Digital Pioneer',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
    overlay: 'from-purple-500/20 to-blue-500/20',
    elements: (
      <>
        {/* AI Network nodes */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{ 
                duration: 3 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3 
              }}
              className="absolute w-2 h-2 bg-blue-400 rounded-full"
              style={{
                left: `${20 + (i * 7)}%`,
                top: `${30 + Math.sin(i) * 20}%`
              }}
            />
          ))}
        </div>
        {/* Connecting lines */}
        <svg className="absolute inset-0 w-full h-full opacity-40">
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
          <line x1="20%" y1="40%" x2="80%" y2="60%" stroke="url(#lineGrad)" strokeWidth="1" />
          <line x1="30%" y1="30%" x2="70%" y2="70%" stroke="url(#lineGrad)" strokeWidth="1" />
        </svg>
        {/* Floating particles */}
        <motion.div
          animate={{ x: [0, 300], opacity: [0, 1, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 left-4 w-1 h-1 bg-purple-400 rounded-full"
        />
      </>
    ),
    badge: { icon: Zap, color: 'bg-purple-500' }
  }
]

interface HeroSectionProps {
  onGetStarted: () => void
}

const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted }) => {
  const [currentScene, setCurrentScene] = useState(0)
  const [explorerPosition, setExplorerPosition] = useState(0)
  const [isPhotographing, setIsPhotographing] = useState(false)
  const [collectedBadges, setCollectedBadges] = useState<number[]>([])
  const [titleLetters, setTitleLetters] = useState<boolean[]>([])

  const titleText = "YOUR ADVENTURE STARTS HERE"

  useEffect(() => {
    // Start typing animation
    const typeInterval = setInterval(() => {
      setTitleLetters(prev => {
        if (prev.length < titleText.length) {
          return [...prev, true]
        }
        clearInterval(typeInterval)
        return prev
      })
    }, 100)

    // Start explorer journey
    const journeyTimer = setTimeout(() => {
      startExplorerJourney()
    }, 1000)

    return () => {
      clearInterval(typeInterval)
      clearTimeout(journeyTimer)
    }
  }, [])

  const startExplorerJourney = () => {
    const journey = setInterval(() => {
      setCurrentScene(prev => {
        const nextScene = (prev + 1) % scenes.length
        
        // Take photo animation
        setIsPhotographing(true)
        setTimeout(() => {
          setIsPhotographing(false)
          // Add badge to collection
          setCollectedBadges(badges => [...badges, prev])
        }, 800)

        return nextScene
      })
    }, 4000)

    return () => clearInterval(journey)
  }

  return (
    <section className="relative h-screen overflow-hidden bg-black">
      {/* Multi-panel background */}
      <div className="absolute inset-0 flex">
        {scenes.map((scene, index) => (
          <motion.div
            key={scene.id}
            className="flex-1 relative overflow-hidden"
            style={{ background: scene.background }}
            initial={{ opacity: index === 0 ? 1 : 0.3 }}
            animate={{ 
              opacity: index === currentScene ? 1 : 0.3,
              scale: index === currentScene ? 1.02 : 1
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            {/* Scene overlay */}
            <div className={`absolute inset-0 bg-gradient-to-b ${scene.overlay}`} />
            
            {/* Scene elements */}
            <div className="absolute inset-0">
              {scene.elements}
            </div>

            {/* Scene transition glow */}
            <AnimatePresence>
              {index === currentScene && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-gradient-radial from-white/10 via-transparent to-transparent"
                />
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Floating badges collection */}
      <motion.div 
        className="absolute top-6 right-6 flex flex-col gap-3 z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <AnimatePresence>
          {collectedBadges.map((badgeIndex) => (
            <motion.div
              key={badgeIndex}
              initial={{ scale: 0, y: 100, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              className="w-16 h-16 hexagon-shape bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center shadow-lg"
              style={{
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
              }}
            >
              {React.createElement(scenes[badgeIndex].badge.icon, {
                className: "w-6 h-6 text-white"
              })}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Explorer character */}
      <motion.div
        className="absolute bottom-20 z-20"
        animate={{
          x: currentScene * 25 + 10 + '%',
          y: [0, -5, 0]
        }}
        transition={{
          x: { duration: 3, ease: "easeInOut" },
          y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <div className="relative">
          {/* Explorer silhouette */}
          <motion.div
            animate={{
              scaleX: [1, 0.95, 1],
            }}
            transition={{ duration: 1, repeat: Infinity }}
            className="w-20 h-20 relative"
          >
            {/* Head */}
            <div className="absolute top-0 left-1/2 w-8 h-8 bg-black rounded-full transform -translate-x-1/2" />
            {/* Body */}
            <div className="absolute top-6 left-1/2 w-6 h-12 bg-black rounded-sm transform -translate-x-1/2" />
            {/* Backpack */}
            <div className="absolute top-6 right-2 w-4 h-8 bg-black/80 rounded-sm" />
            {/* Camera */}
            <div className="absolute top-8 left-1/4 w-3 h-2 bg-black/90 rounded-sm" />
            {/* Arms */}
            <div className="absolute top-10 left-2 w-2 h-6 bg-black rounded-full transform rotate-12" />
            <div className="absolute top-10 right-2 w-2 h-6 bg-black rounded-full transform -rotate-12" />
            {/* Legs */}
            <motion.div
              animate={{ rotate: [-5, 5, -5] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="absolute bottom-0 left-3 w-2 h-8 bg-black rounded-full"
            />
            <motion.div
              animate={{ rotate: [5, -5, 5] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="absolute bottom-0 right-3 w-2 h-8 bg-black rounded-full"
            />
          </motion.div>

          {/* Camera flash effect */}
          <AnimatePresence>
            {isPhotographing && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 3, opacity: [0, 1, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute top-1/2 left-1/2 w-4 h-4 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"
                style={{ boxShadow: '0 0 50px rgba(255,255,255,0.8)' }}
              />
            )}
          </AnimatePresence>

          {/* Glowing trail */}
          <motion.div
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute -bottom-2 left-1/2 w-6 h-2 bg-blue-400/60 rounded-full blur-sm transform -translate-x-1/2"
          />
        </div>
      </motion.div>

      {/* Hero content */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center px-4 max-w-4xl mx-auto">
          {/* Brand logo */}
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
            <span className="text-2xl font-bold text-white tracking-wide">Discovery Atlas</span>
          </motion.div>

          {/* Animated title */}
          <div className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-wider">
            {titleText.split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: titleLetters[i] ? 1 : 0,
                  y: titleLetters[i] ? 0 : 20
                }}
                transition={{ duration: 0.3 }}
                className="inline-block"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3, duration: 0.8 }}
            className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Embark on AI-powered quests that transform the world into your personal adventure playground
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 3.5, duration: 0.6 }}
          >
            <Button
              size="lg"
              onClick={onGetStarted}
              className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-lg px-10 py-6 rounded-full group transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              <motion.div
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%']
                }}
                transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
                className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10 bg-[length:200%_200%]"
              />
              <span className="relative z-10 font-semibold">START EXPLORING</span>
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="relative z-10 ml-3"
              >
                <Sparkles className="w-5 h-5" />
              </motion.span>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scene indicators */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="flex gap-3">
          {scenes.map((_, index) => (
            <motion.div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-500 ${
                index === currentScene 
                  ? 'bg-white w-8' 
                  : 'bg-white/40'
              }`}
              animate={{
                scale: index === currentScene ? 1.2 : 1
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Ambient particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, -5, 0],
              opacity: [0.2, 0.8, 0.2]
            }}
            transition={{
              duration: 6 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.2
            }}
            className="absolute w-1 h-1 bg-white/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>
    </section>
  )
}

export default HeroSection
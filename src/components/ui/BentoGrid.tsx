'use client'

import { ReactNode, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { ArrowUpRight, Plus, Sparkles } from 'lucide-react'

interface BentoGridProps {
  children: ReactNode
  className?: string
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div className={cn(
      'grid grid-cols-12 gap-2 md:gap-3 lg:gap-4 auto-rows-[80px] md:auto-rows-[100px] lg:auto-rows-[120px]',
      className
    )}>
      {children}
    </div>
  )
}

interface BentoCardProps {
  title?: string
  description?: string
  icon?: ReactNode
  className?: string
  background?: ReactNode
  children?: ReactNode
  span?: string
  href?: string
  onClick?: () => void
  index?: number
}

export function BentoCard({
  title,
  description,
  icon,
  className,
  background,
  children,
  span = 'col-span-6 row-span-2',
  href,
  onClick,
  index = 0
}: BentoCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const CardContent = () => (
    <>
      {/* Background Layer */}
      <div className="absolute inset-0 overflow-hidden rounded-xl">
        {background}
        <div className={cn(
          'absolute inset-0 bg-gradient-to-br transition-opacity duration-500',
          isHovered ? 'opacity-40' : 'opacity-60',
          'from-black/50 via-black/30 to-transparent'
        )} />
      </div>

      {/* Content Layer */}
      <div className="relative h-full p-4 md:p-6 flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-start justify-between">
          {icon && (
            <motion.div
              className="text-white/80"
              animate={{
                rotate: isHovered ? 360 : 0,
                scale: isHovered ? 1.1 : 1
              }}
              transition={{ duration: 0.5 }}
            >
              {icon}
            </motion.div>
          )}

          {(href || onClick) && (
            <motion.div
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              animate={{
                x: isHovered ? 5 : 0,
                y: isHovered ? -5 : 0
              }}
            >
              <ArrowUpRight className="w-5 h-5 text-white" />
            </motion.div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center">
          {children}
        </div>

        {/* Footer */}
        {(title || description) && (
          <div className="space-y-1">
            {title && (
              <motion.h3
                className="text-white font-bold text-lg md:text-xl lg:text-2xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {title}
              </motion.h3>
            )}
            {description && (
              <motion.p
                className="text-white/60 text-xs md:text-sm line-clamp-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 + 0.1 }}
              >
                {description}
              </motion.p>
            )}
          </div>
        )}
      </div>

      {/* Hover Effects */}
      <AnimatePresence>
        {isHovered && (
          <>
            {/* Glow Effect */}
            <motion.div
              className="absolute inset-0 rounded-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                background: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)'
              }}
            />

            {/* Corner Decorations */}
            <motion.div
              className="absolute top-2 left-2"
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 45 }}
            >
              <Plus className="w-4 h-4 text-white/40" />
            </motion.div>

            <motion.div
              className="absolute bottom-2 right-2"
              initial={{ scale: 0, rotate: 45 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: -45 }}
            >
              <Sparkles className="w-4 h-4 text-white/40" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )

  const Component = href ? 'a' : onClick ? 'button' : 'div'

  return (
    <motion.div
      className={cn(
        'group relative overflow-hidden rounded-xl',
        'bg-gradient-to-br from-gray-900 to-black',
        'border border-white/10 hover:border-white/20',
        'transition-all duration-500',
        'cursor-pointer',
        span,
        className
      )}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: index * 0.05,
        duration: 0.5,
        ease: [0.23, 1, 0.32, 1]
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {href ? (
        <a href={href} className="block w-full h-full">
          <CardContent />
        </a>
      ) : onClick ? (
        <button onClick={onClick} className="block w-full h-full">
          <CardContent />
        </button>
      ) : (
        <CardContent />
      )}
    </motion.div>
  )
}
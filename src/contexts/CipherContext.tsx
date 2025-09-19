'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface CipherContextType {
  isCipherEnabled: boolean
  toggleCipher: () => void
  setCipherEnabled: (enabled: boolean) => void
}

const CipherContext = createContext<CipherContextType | undefined>(undefined)

const STORAGE_KEY = 'cinchlab_cipher_enabled'

export function CipherProvider({ children }: { children: ReactNode }) {
  const [isCipherEnabled, setIsCipherEnabled] = useState(true)
  const [isInitialized, setIsInitialized] = useState(false)

  // Initialize from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored !== null) {
      setIsCipherEnabled(stored === 'true')
    }
    setIsInitialized(true)
  }, [])

  // Save to localStorage whenever the state changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(STORAGE_KEY, String(isCipherEnabled))
    }
  }, [isCipherEnabled, isInitialized])

  const toggleCipher = () => {
    setIsCipherEnabled(prev => !prev)
  }

  const setCipherEnabled = (enabled: boolean) => {
    setIsCipherEnabled(enabled)
  }

  return (
    <CipherContext.Provider value={{ isCipherEnabled, toggleCipher, setCipherEnabled }}>
      {children}
    </CipherContext.Provider>
  )
}

export function useCipher() {
  const context = useContext(CipherContext)
  if (context === undefined) {
    throw new Error('useCipher must be used within a CipherProvider')
  }
  return context
}
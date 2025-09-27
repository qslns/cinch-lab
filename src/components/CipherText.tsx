import React, { useState, useEffect, useRef } from 'react';

interface CipherTextProps {
  children: string;
  mode?: 'hover' | 'auto';
  delay?: number; // Delay before starting the effect (ms)
  interval?: number; // Interval between character reveals (ms)
  scrambleDuration?: number; // How long to scramble before revealing (ms)
  className?: string;
  style?: React.CSSProperties;
}

const CipherText: React.FC<CipherTextProps> = ({
  children,
  mode = 'hover',
  delay = 0,
  interval = 50,
  scrambleDuration = 1000,
  className = '',
  style = {},
}) => {
  const [displayText, setDisplayText] = useState(children);
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const scrambleIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Characters to use for scrambling effect
  const scrambleChars = '!@#$%^&*()_+-=[]{}|;:,.<>?~`0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  const getRandomChar = () => {
    return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
  };

  const scrambleText = (text: string, preserveSpaces: boolean = true) => {
    return text
      .split('')
      .map(char => {
        if (preserveSpaces && char === ' ') return ' ';
        return getRandomChar();
      })
      .join('');
  };

  const startCipherEffect = () => {
    if (isAnimating) return;

    setIsAnimating(true);

    // Clear any existing timeouts
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (intervalRef.current) clearTimeout(intervalRef.current);
    if (scrambleIntervalRef.current) clearTimeout(scrambleIntervalRef.current);

    // Start scrambling immediately
    const scrambleUpdate = () => {
      setDisplayText(scrambleText(children));
    };

    // Scramble the text rapidly
    scrambleIntervalRef.current = setInterval(scrambleUpdate, 30);

    // After scramble duration, start revealing characters
    timeoutRef.current = setTimeout(() => {
      if (scrambleIntervalRef.current) {
        clearInterval(scrambleIntervalRef.current);
      }

      let revealedCount = 0;
      const originalText = children;

      const revealCharacter = () => {
        if (revealedCount >= originalText.length) {
          setDisplayText(originalText);
          setIsAnimating(false);
          if (intervalRef.current) clearInterval(intervalRef.current);
          return;
        }

        const revealed = originalText.slice(0, revealedCount + 1);
        const remaining = originalText.slice(revealedCount + 1);
        const scrambledRemaining = scrambleText(remaining);

        setDisplayText(revealed + scrambledRemaining);
        revealedCount++;
      };

      intervalRef.current = setInterval(revealCharacter, interval);
    }, delay + scrambleDuration);
  };

  const resetText = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (intervalRef.current) clearTimeout(intervalRef.current);
    if (scrambleIntervalRef.current) clearTimeout(scrambleIntervalRef.current);

    setDisplayText(children);
    setIsAnimating(false);
  };

  // Auto mode effect
  useEffect(() => {
    if (mode === 'auto') {
      const autoTimeout = setTimeout(() => {
        startCipherEffect();
      }, delay);

      return () => clearTimeout(autoTimeout);
    }
  }, [mode, delay]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearTimeout(intervalRef.current);
      if (scrambleIntervalRef.current) clearTimeout(scrambleIntervalRef.current);
    };
  }, []);

  // Update display text when children prop changes
  useEffect(() => {
    if (!isAnimating) {
      setDisplayText(children);
    }
  }, [children, isAnimating]);

  const handleMouseEnter = () => {
    if (mode === 'hover') {
      startCipherEffect();
    }
  };

  const handleMouseLeave = () => {
    if (mode === 'hover') {
      // Optional: you can choose to reset immediately on mouse leave
      // or let the animation complete
      // resetText();
    }
  };

  return (
    <span
      className={className}
      style={{
        fontFamily: 'monospace',
        cursor: mode === 'hover' ? 'pointer' : 'default',
        ...style,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {displayText}
    </span>
  );
};

export default CipherText;
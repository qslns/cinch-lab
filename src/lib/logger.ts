/**
 * Production-ready logging utility
 * In development: logs to console
 * In production: can be extended to integrate with Sentry, LogRocket, etc.
 */

type LogLevel = 'info' | 'warn' | 'error'

interface LogEntry {
  level: LogLevel
  message: string
  data?: Record<string, unknown>
  timestamp: string
}

const isDev = process.env.NODE_ENV === 'development'

/**
 * Create a log entry with metadata
 */
function createLogEntry(
  level: LogLevel,
  message: string,
  data?: Record<string, unknown>
): LogEntry {
  return {
    level,
    message,
    data,
    timestamp: new Date().toISOString(),
  }
}

/**
 * Log info messages (development only)
 */
export function logInfo(message: string, data?: Record<string, unknown>): void {
  if (isDev) {
    const entry = createLogEntry('info', message, data)
    console.log(`[INFO] ${entry.timestamp}:`, message, data || '')
  }
  // Production: integrate with logging service
  // await sendToLoggingService(entry)
}

/**
 * Log warning messages
 */
export function logWarn(message: string, data?: Record<string, unknown>): void {
  if (isDev) {
    const entry = createLogEntry('warn', message, data)
    console.warn(`[WARN] ${entry.timestamp}:`, message, data || '')
  }
  // Production: integrate with logging service
}

/**
 * Log error messages
 */
export function logError(
  message: string,
  error?: Error | unknown,
  data?: Record<string, unknown>
): void {
  const errorData = {
    ...data,
    error: error instanceof Error ? {
      name: error.name,
      message: error.message,
      stack: error.stack,
    } : error,
  }

  if (isDev) {
    const entry = createLogEntry('error', message, errorData)
    console.error(`[ERROR] ${entry.timestamp}:`, message, errorData)
  }

  // Production: integrate with error tracking service
  // Sentry.captureException(error, { extra: errorData })
}

/**
 * Log API request/response for debugging
 */
export function logApiRequest(
  method: string,
  path: string,
  status: number,
  duration?: number
): void {
  if (isDev) {
    console.log(`[API] ${method} ${path} - ${status} ${duration ? `(${duration}ms)` : ''}`)
  }
}

export const logger = {
  info: logInfo,
  warn: logWarn,
  error: logError,
  api: logApiRequest,
}

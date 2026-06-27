import { createSeedDatabase } from "@/lib/seed/data"
import type { Database } from "@/types"

const STORAGE_KEY = "loadboard_db_v1"

type StorageListener = () => void

const listeners = new Set<StorageListener>()

// Stable snapshot for SSR — must be the same reference on every call
const serverSnapshot: Database = createSeedDatabase()

// Cached client snapshot — updated only when the store mutates
let clientSnapshot: Database | null = null

function isBrowser(): boolean {
  return typeof window !== "undefined"
}

function readFromStorage(): Database {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    const seed = createSeedDatabase()
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seed))
    return seed
  }

  try {
    return JSON.parse(raw) as Database
  } catch {
    const seed = createSeedDatabase()
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seed))
    return seed
  }
}

export function getServerSnapshot(): Database {
  return serverSnapshot
}

export function subscribe(listener: StorageListener): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function notify(): void {
  listeners.forEach((listener) => listener())
}

export function getDatabase(): Database {
  if (!isBrowser()) {
    return serverSnapshot
  }

  if (!clientSnapshot) {
    clientSnapshot = readFromStorage()
  }

  return clientSnapshot
}

export function setDatabase(db: Database): void {
  if (!isBrowser()) return
  clientSnapshot = db
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db))
  notify()
}

export function updateDatabase(updater: (db: Database) => Database): Database {
  const next = updater(getDatabase())
  setDatabase(next)
  return next
}

export function resetDatabase(): Database {
  const seed = createSeedDatabase()
  setDatabase(seed)
  return seed
}

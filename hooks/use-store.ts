"use client"

import { useSyncExternalStore } from "react"
import { getDatabase, getServerSnapshot, subscribe } from "@/lib/storage/storage"
import type { Database } from "@/types"

export function useStore(): Database {
  return useSyncExternalStore(subscribe, getDatabase, getServerSnapshot)
}

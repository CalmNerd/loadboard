import { generateId } from "@/lib/id"
import { getDatabase, updateDatabase } from "@/lib/storage/storage"
import type { RegisterInput, User, UserRole } from "@/types"

export interface AuthResult {
  success: boolean
  error?: string
  user?: User
}

export function getCurrentUser(): User | null {
  const db = getDatabase()
  if (!db.session) return null
  return db.users.find((u) => u.id === db.session!.userId) ?? null
}

export function getUserById(id: string): User | null {
  return getDatabase().users.find((u) => u.id === id) ?? null
}

export function getUsersByRole(role: UserRole): User[] {
  return getDatabase().users.filter((u) => u.role === role)
}

export function login(email: string, password: string): AuthResult {
  const db = getDatabase()
  const user = db.users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  )

  if (!user) {
    return { success: false, error: "Invalid email or password" }
  }

  updateDatabase((current) => ({
    ...current,
    session: { userId: user.id },
  }))

  return { success: true, user }
}

export function register(input: RegisterInput): AuthResult {
  const db = getDatabase()
  const exists = db.users.some(
    (u) => u.email.toLowerCase() === input.email.toLowerCase()
  )

  if (exists) {
    return { success: false, error: "An account with this email already exists" }
  }

  const user: User = {
    id: generateId(),
    email: input.email.toLowerCase(),
    password: input.password,
    name: input.name,
    companyName: input.companyName,
    role: input.role,
    verified: false,
    createdAt: new Date().toISOString(),
  }

  updateDatabase((current) => ({
    ...current,
    users: [...current.users, user],
    session: { userId: user.id },
  }))

  return { success: true, user }
}

export function logout(): void {
  updateDatabase((current) => ({
    ...current,
    session: null,
  }))
}

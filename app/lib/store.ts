import type { User, Part } from "./types"

const USERS_KEY = "autoparts_users"
const PARTS_KEY = "autoparts_parts"
const CURRENT_USER_KEY = "autoparts_current_user"

function isBrowser() {
  return typeof window !== "undefined"
}

export function getUsers(): User[] {
  if (!isBrowser()) return []
  const raw = localStorage.getItem(USERS_KEY)
  return raw ? JSON.parse(raw) : []
}

export function addUser(user: Omit<User, "id" | "createdAt">): User {
  const users = getUsers()
  const newUser: User = {
    ...user,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  }
  users.push(newUser)
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
  return newUser
}

export function findUserByEmail(email: string): User | undefined {
  return getUsers().find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  )
}


export function getParts(): Part[] {
  if (!isBrowser()) return []
  const raw = localStorage.getItem(PARTS_KEY)
  return raw ? JSON.parse(raw) : []
}

export function addPart(
  part: Omit<Part, "id" | "createdAt">
): { success: boolean; error?: string; part?: Part } {

  const currentUser = getCurrentUser()
  if (!currentUser) {
    return { success: false, error: "Usuário não autenticado." }
  }

  const parts = getParts()

  const newPart: Part = {
    ...part,
    id: crypto.randomUUID(),
    userId: currentUser.id,
    createdAt: new Date().toISOString(),
  }

  parts.push(newPart)
  localStorage.setItem(PARTS_KEY, JSON.stringify(parts))

  return { success: true, part: newPart }
}


export function getCurrentUser(): User | null {
  if (!isBrowser()) return null
  const raw = localStorage.getItem(CURRENT_USER_KEY)
  return raw ? JSON.parse(raw) : null
}

export function setCurrentUser(user: User): void {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
}

export function clearCurrentUser(): void {
  localStorage.removeItem(CURRENT_USER_KEY)
}

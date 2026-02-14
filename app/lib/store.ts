import type { User, Part } from "./types"
//import { MOCK_PARTS } from "./mock-data"

const USERS_KEY = "autoparts_users"
const PARTS_KEY = "autoparts_parts"
const CURRENT_USER_KEY = "autoparts_current_user"

function isBrowser() {
  return typeof window !== "undefined"
}

// Users
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
  return getUsers().find((u) => u.email.toLowerCase() === email.toLowerCase())
}

// Parts
// export function getParts(): Part[] {
//   if (!isBrowser()) return []
//   const raw = localStorage.getItem(PARTS_KEY)
//   if (!raw) {
//     // Seed with mock data on first load
//     // localStorage.setItem(PARTS_KEY, JSON.stringify(MOCK_PARTS))
//     // return MOCK_PARTS
//   }
//   return JSON.parse(raw)
// }

export function addPart(part: Omit<Part, "id" | "createdAt">): Part {
//   const parts = getParts()
  const newPart: Part = {
    ...part,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  }
//   parts.push(newPart)
  //localStorage.setItem(PARTS_KEY, JSON.stringify(parts))
  return newPart
}

// Current user session
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

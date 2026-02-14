export interface User {
  id: string
  name: string
  email: string
  password: string
  createdAt: string
}

export interface Part {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
  userId: string
  createdAt: string
}

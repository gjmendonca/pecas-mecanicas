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
  price: string
  images: {
    url: string
    isMain: boolean
  }[]
  userId: string
  createdAt: string
}


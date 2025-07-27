export interface User {
  id: string
  name: string
  email: string
  role: string
  department: string
  status: "active" | "inactive"
  createdAt: string
  updatedAt: string
}

export interface CreateUserData {
  name: string
  email: string
  role: string
  department: string
  status: "active" | "inactive"
}

export interface UpdateUserData extends CreateUserData {
  id: string
}

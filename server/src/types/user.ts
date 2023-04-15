export interface User {
  name: string,
  email: string,
  role: "TEACHER" | "STUDENT",
  organization?: string,
  passwordHash: string
}
import { Types } from "mongoose";

export interface Student {
  name: string,
  email: string,
  passwordHash: string,
  verified: boolean
}

export interface Teacher {
  name: string,
  email: string,
  passwordHash: string
  organization: string,
  verified: boolean
}

export interface Token {
  user: Types.ObjectId,
  userType: "Student" | "Teacher",
  token: string,
  createdAt: Date
}
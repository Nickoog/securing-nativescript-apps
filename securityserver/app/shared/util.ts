import { genSaltSync, hashSync, compareSync } from 'bcryptjs'
import { User } from './models/user.model'
import { sign } from 'jsonwebtoken'

export function hashPassword(password: string): string {
  const salt = genSaltSync(12)
  const hashedPassword = hashSync(password, salt)
  return hashedPassword
}

export function verifyPassword(
  passwordAttempted: string,
  hashedPassword: string
): boolean {
  return compareSync(passwordAttempted, hashedPassword)
}

export function createToken(user: User): string {
  const payload = {
    id: user.id,
    email: user.email
  }
  const secret = process.env['SECRET']

  const signedToken = sign(payload, secret, {
    algorithm: 'HS256',
    expiresIn: '1h'
  })
  return signedToken
}

export const newGuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

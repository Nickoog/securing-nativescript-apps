import { Express, Router, Request, Response } from 'express'
import { createUser, getUser } from '../../../app/data/data-access'
import { hashPassword, verifyPassword } from '../../../app/shared/util'

export function registerUser(req: Request, res: Response) {
  const hashedPassword = hashPassword(req.body.password)

  const userData = {
    email: req.body.email,
    password: hashedPassword
  }

  createUser(userData)

  return res.json({ message: 'User created!' })
}

export function loginUser(req: Request, res: Response) {
  const user = getUser(req.body.email)

  if (user) {
    const passwordMatches = verifyPassword(req.body.password, user.password)
    if (passwordMatches) {
      return res.json({ message: 'User logged in!' })
    } else {
      res.status(403).json({
        message: 'Wrong email or password.'
      })
    }
  } else {
    res.status(403).json({
      message: 'Wrong email or password.'
    })
  }
}

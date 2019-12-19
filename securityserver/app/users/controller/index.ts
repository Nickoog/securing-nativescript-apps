import { Express, Router, Request, Response } from 'express'
import { createUser, getUser } from '../../../app/data/data-access'

export function registerUser(req: Request, res: Response) {
  const userData = {
    email: req.body.email,
    password: req.body.password
  }

  createUser(userData)

  return res.json({ message: 'User created!' })
}

export function loginUser(req: Request, res: Response) {
  const user = getUser(req.body.email)

  if (user) {
    return res.json({ message: 'User logged in!' })
  } else {
    res.status(403).json({
      message: 'Wrong email or password.'
    })
  }
}

import { Express, Router, Request, Response } from 'express'
import * as jwtDecode from 'jwt-decode'
import { createUser, getUser } from '../../../app/data/data-access'
import {
  hashPassword,
  verifyPassword,
  createToken
} from '../../../app/shared/util'
import JwtDecode = require('jwt-decode')

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
      const jwt = createToken(user)
      const decodedJwt = jwtDecode<{ exp: string }>(jwt)

      return res.json({
        message: 'User logged in!',
        access_token: jwt,
        expires: decodedJwt.exp
      })
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

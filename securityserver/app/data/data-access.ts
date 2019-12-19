import * as fs from 'fs'
import { User, AuthUser } from '../../app/shared/models/user.model'
import { newGuid } from '../../app/shared/util'

const USERS_FILE = './app/data/users.json'

function ensureUserFile() {
  if (fs.existsSync(USERS_FILE)) {
    return
  } else {
    fs.appendFileSync(USERS_FILE, '{ "users": [] }')
  }
}

export function getUsers(): User[] {
  ensureUserFile()
  const fileContents = fs.readFileSync(USERS_FILE)
  const fileContentsStr = fileContents.toString()

  const { users } = JSON.parse(fileContentsStr)
  return users
}

export function createUser(user: AuthUser) {
  const users = getUsers()

  const newId = newGuid()
  users.push({ ...user, id: newId })

  const newUsersDataStr = JSON.stringify({ users: users })

  fs.writeFileSync(USERS_FILE, newUsersDataStr)
}

export function getUser(email: string): User {
  const users = getUsers()
  const foundUser = users.find(u => u.email === email)
  return foundUser
}

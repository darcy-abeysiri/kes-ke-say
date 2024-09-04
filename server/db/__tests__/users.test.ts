import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'
import connection from '../connection.ts'
import * as db from '../functions/users.ts'

beforeAll(async () => {
  await connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()
})

afterAll(async () => {
  await connection.destroy()
})

describe('db.getAllUsers()', () => {
  it('gets all the users', async () => {
    const users = await db.getAllUsers()
    expect(users).toHaveLength(4)
  })
})

describe('db.getUserByName()', () => {
  it('gets the single user', async () => {
    const users = await db.getUserByName()
    expect(users).toHaveLength(4)
  })
})

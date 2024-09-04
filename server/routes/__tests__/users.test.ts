import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'

import connection from '../../db/connection.ts'
import server from '../../server.ts'
import request from 'supertest'

beforeAll(async () => {
  await connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()
})

afterAll(async () => {
  await connection.destroy()
})

// Getting allUserProtiles
describe('getting all user profiles', () => {
  it('gets the user profiles', async () => {
    const res = await request(server).get('/api/v1/users/')
    expect(res.status).toBe(200)
  })
})

// Getting single User Protiles
describe('getting all single user profiles', () => {
  it('gets the single profiles', async () => {
    const res = await request(server).get('/api/v1/users/username/')
    expect(res.status).toBe(200)
  })
})

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
    const res = await request(server).get('/api/v1/users')

    expect(res.body).toHaveLength(4)
  })

  // Checking error
  it('should respond with 500 when an error occurs', async () => {
    const res = await request(server).get('/api/v1/users/error')
    expect(res.status).toBe(500)
  })
})

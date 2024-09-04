import {
  describe,
  it,
  expect,
  beforeAll,
  beforeEach,
  afterAll,
  vi,
} from 'vitest'

import connection from '../../db/connection.ts'
import server from '../../server.ts'
import request from 'supertest'
import * as db from '../../db/functions/users.ts'

beforeAll(async () => {
  await connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()
})

afterAll(async () => {
  await connection.destroy()
})

vi.mock('../../db/functions/users.ts')

const mockUsers = [
  {
    id: 1,
    auth0Id: 'auth0|123',
    username: 'paige',
    fullName: 'Paige Turner',
    location: 'Auckland',
    image: 'ava-03.png',
  },
  {
    id: 2,
    auth0Id: 'auth0|234',
    username: 'ida',
    fullName: 'Ida Dapizza',
    location: 'Auckland',
    image: 'ava-02.png',
  },
  {
    id: 3,
    auth0Id: 'auth0|345',
    username: 'shaq',
    fullName: 'Shaquille Oatmeal',
    location: 'Christchurch',
    image: 'ava-16.png',
  },
  {
    id: 4,
    auth0Id: 'auth0|456',
    username: 'chris',
    fullName: 'Chris P Bacon',
    location: 'Wellington',
    image: 'ava-08.png',
  },
]

describe('GET ap1/v1/users', () => {
  it('should show the users', async () => {
    vi.mocked(db.getAllUsers).mockResolvedValue(mockUsers)

    const res = await request(server).get('/api/v1/users')

    expect(res.statusCode).toBe(200)
  })
})

// Checking 500
describe('GET ap1/v1/users', () => {
  it('when cannot find user', async () => {
    vi.mocked(db.getAllUsers).mockRejectedValue(mockUsers)

    const res = await request(server).get('/api/v1/users')

    expect(res.statusCode).toBe(500)
  })
})

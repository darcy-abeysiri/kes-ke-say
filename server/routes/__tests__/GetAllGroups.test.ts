import {
  describe,
  it,
  expect,
  beforeAll,
  beforeEach,
  afterAll,
  vi,
  afterEach,
} from 'vitest'

import connection from '../../db/connection'
import server from '../../server'
import request from 'supertest'
import { getAllGroups } from '../../db/functions/groups'

vi.mock('../../db/functions/groups')

const db = connection

beforeAll(async () => {
  await db.migrate.latest()
})

beforeEach(async () => {
  await db.seed.run()
})

afterAll(async () => {
  await db.destroy()
})

afterEach(() => {
  vi.resetAllMocks()
})

const fakeGroups = [
  { id: 1, name: 'friendChips', image: 'fries-darkgray.png' },
  { id: 2, name: 'The fast and the curious', image: 'car-darkgray.png' },
  { id: 3, name: 'Taco bout it', image: 'taco-darkgray.png' },
]

describe('get all groups', () => {
  it('responds with all the data', async () => {
    vi.mocked(getAllGroups).mockResolvedValue(fakeGroups)

    const res = await request(server).get('/api/v1/groups')

    expect(res.body).toStrictEqual([
      { id: 1, name: 'friendChips', image: 'fries-darkgray.png' },
      { id: 2, name: 'The fast and the curious', image: 'car-darkgray.png' },
      { id: 3, name: 'Taco bout it', image: 'taco-darkgray.png' },
    ])
  })
})

describe('cannot get all groups', () => {
  it('shows an error when the database fails', async () => {
    vi.mocked(getAllGroups).mockRejectedValue('Database Error')

    const res = await request(server).get('/api/v1/groups')

    expect(res.statusCode).toBe(500)
  })
})

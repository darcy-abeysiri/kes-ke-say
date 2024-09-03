import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'

import connection from '../../db/connection'
import server from '../../server'
import request from 'supertest'

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

describe('get all groups', () => {
  it('responds with all the data', async () => {
    const res = await request(server).get('/api/v1/groups')

    // expect(res.body).toHaveLength(3)
    expect(res.body).toStrictEqual([
      { id: 1, name: 'friendChips', image: 'fries-darkgray.png' },
      { id: 2, name: 'The fast and the curious', image: 'car-darkgray.png' },
      { id: 3, name: 'Taco bout it', image: 'taco-darkgray.png' },
    ])
  })
})

import request from 'supertest'
import { expect, test, beforeAll, afterAll, beforeEach } from 'vitest'
import server from '../../server'
import db from '../../db/connection'

beforeAll(async () => {
  await db.migrate.latest()
})

beforeEach(async () => {
  await db.seed.run()
})

afterAll(async () => {
  await db.destroy()
})

test('GET /api/v1/posts should return an array of posts', async () => {
  const response = await request(server).get('/api/v1/posts')

  expect(response.status).toBe(200)
  expect(response.body).toHaveLength(4)
  expect(response.body[0]).toEqual({
    id: 1,
    userId: 1,
    username: 'paige',
    body: 'I found this really interesting book, you should check it out',
    image:
      'https://img.freepik.com/free-photo/book-composition-with-open-book_23-2147690555.jpg',
    userImage: 'ava-03.png',
    createdAt: expect.any(Number),
  })
})

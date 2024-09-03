import request from 'supertest'
import { expect, test, beforeAll, afterAll, beforeEach } from 'vitest'
import server from '../../server.ts'
import db from '../../db/connection'
// import { Request, Response, NextFunction } from 'express'

beforeAll(async () => {
  await db.migrate.latest()
})

beforeEach(async () => {
  await db.seed.run()
})

afterAll(async () => {
  await db.destroy()
})

// describe('GET ap1/v1/posts', () => {
//   it('should show the posts', async () => {
//     vi.mocked(fruitsDb.getFruits).mockResolvedValue(mockFruits)

//     const res = await request(server).get('/api/v1/fruits')

//     expect(res.statusCode).toBe(200)
//     expect(res.body).toMatchInlineSnapshot(`
//       {
//         "fruits": [
//           {
//             "addedByUser": "auth0|123",
//             "averageGramsEach": 120,
//             "id": 1,
//             "name": "Banana",
//           },
//           {
//             "addedByUser": "auth0|456",
//             "averageGramsEach": 195,
//             "id": 2,
//             "name": "Apple",
//           },
//         ],
//       }
//     `)
//   })
// })

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

test('GET /api/v1/posts should return an empty array when no posts are available', async () => {
  await db('posts').truncate()

  const response = await request(server).get('/api/v1/posts')

  expect(response.status).toBe(200)
  expect(response.body).toHaveLength(0)
})


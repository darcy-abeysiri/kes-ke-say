import request from 'supertest'
import { expect, it, beforeAll, afterAll, beforeEach, describe } from 'vitest'
import server from '../../server.ts'
import db from '../../db/connection.ts'

beforeAll(async () => {
  await db.migrate.latest()
})

beforeEach(async () => {
  await db.seed.run()
})

afterAll(async () => {
  await db.destroy()
})

describe("GET /api/v1/posts", () => {
  it('GET /api/v1/posts should return an array of posts', async () => {
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

  it('GET /api/v1/posts should return an empty array when no posts are available', async () => {
    await db('posts').truncate()

    const response = await request(server).get('/api/v1/posts')

    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(0)
  })
})


describe("GET /api/v1/posts/:id", () => {
  it("should return a single post", async () => {
    const response = await request(server).get('/api/v1/posts/1')

    expect(response.body).toEqual({
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

  it("should return 404 if no post with given ID is found", async () => {
    const response = await request(server).get('/api/v1/posts/100')
    expect(response.status).toEqual(404)
  })

})
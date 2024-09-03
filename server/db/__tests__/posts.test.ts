import { expect, test, beforeAll, beforeEach, afterAll } from 'vitest'

import db from '../connection.ts'

import { getAllPosts } from '../functions/posts.ts'

beforeEach(async () => {
  console.log('beforeEach')
  await db.seed.run()
})

beforeAll(async () => {
  console.log('beforeAll')
  await db.migrate.latest()
})

afterAll(async () => {
  console.log('afterAll')
  // Destroy the database connection after all tests
  await db.destroy()
})

test('should return an array of posts', async () => {
  const posts = await getAllPosts(db)
  expect(posts).toHaveLength(4)
  expect(posts[0]).toEqual({
    id: 1,
    user_id: 1,
    body: 'I found this really interesting book, you should check it out',
    image:
      'https://img.freepik.com/free-photo/book-composition-with-open-book_23-2147690555.jpg',
    created_at: new Date(Date.now()),
  })
})

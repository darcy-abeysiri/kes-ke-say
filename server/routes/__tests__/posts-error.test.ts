import { test, expect, vi } from 'vitest'

import server from '../../server.ts'
import * as db from '../../db/functions/posts'
import request from 'supertest'

vi.mock('../../db/functions/posts.ts')

test('GET ap1/v1/posts should return an error', async () => {
  // ARRANGE
  vi.mocked(db.getAllPosts).mockImplementation(() => {
    throw Error('Failed to fetch all posts')
  })

  // ACT
  const response = await request(server).get('/api/v1/posts')

  // ASSERT
  expect(response.status).toBe(500)
  expect(response.body).toEqual({ message: 'Failed to fetch all posts' })
})

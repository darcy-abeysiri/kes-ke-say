//@vitest-environment jsdom
import { describe, it, expect, beforeEach, beforeAll } from 'vitest'
import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import { renderRoute } from '../../test-utils'
import nock from 'nock'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'
import '@testing-library/jest-dom/vitest'

beforeEach(cleanup)
expect.extend(matchers)

beforeAll(() => {
  nock.disableNetConnect()
})

describe('<User>', () => {
  it('should render a user', async () => {
    // ARRANGE
    // 'nock' an http network call
    nock('http://localhost:3000')
      .get('/api/v1/users')
      // Fake the 'get' request and reply
      .reply(200, [
        {
          id: 1,
          auth0_id: 'auth0|123',
          username: 'paige',
          full_name: 'Paige Turner',
          location: 'Auckland',
          image: 'ava-03.png',
        },
        {
          id: 2,
          auth0_id: 'auth0|234',
          username: 'ida',
          full_name: 'Ida Dapizza',
          location: 'Auckland',
          image: 'ava-02.png',
        },
      ])
    // ACT
    //  Render Route
    renderRoute('/profiles')
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i))
    //  async wait for screen
    const user1 = screen.getByText('ida')

    // ASSERT
    expect(user1).toBeVisible()
  })

  // SAD PATH! ERRORS ERRORS ERRORS
  it('should render an error message when things go wrong', async () => {
    // ARRANGE
    // 'nock' an http network call
    nock('https://localhost')
      // Fake the 'get' request and reply
      .get('/api/v1/users/')
      // Fake the 'get' request and reply's with 500 server error
      .reply(500)
    // ACT
    renderRoute('/profiles')
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i))

    // check that error message exists
    const errorMsg = screen.getByText('Error...')

    // ASSERT
    expect(errorMsg).toBeInTheDocument()
  })
})

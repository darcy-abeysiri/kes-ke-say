//@vitest-environment jsdom
import { describe, it, expect, beforeAll } from 'vitest'
import { waitForElementToBeRemoved } from '@testing-library/react'
import { renderRoute } from '../../test-utils'
import nock from 'nock'
import '@testing-library/jest-dom/vitest'

beforeAll(() => {
  nock.disableNetConnect()
})

const fakeUsers = [
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
]

describe('<UserProfile>', () => {
  it('should render a user profile', async () => {
    // 'nock' an http network call
    const scope = nock(document.baseURI)
      .get('/api/v1/profiles/ida')
      // Fake the 'get' request and replyc
      .reply(200, fakeUsers)
    //  Render Route
    const screen = renderRoute('/profiles/ida')
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i))

    //  async wait for screen
    const user1 = await screen.getByText('ida')

    expect(user1).toBeVisible()
    expect(scope.isDone()).toBe(true)
  })

  // Error
  it('should render an error message when things go wrong', async () => {
    // 'nock' an http network call
    nock('http://localhost:3000')
      // Fake the 'get' request and reply
      .get('/api/v1/profiles/ida')
      // Fake the 'get' request and reply's with 500 server error
      .reply(500)

    const screen = renderRoute('/profiles/ida')

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i))

    // check that error message exists
    const errorMsg = screen.getByText('Error...')

    expect(errorMsg).toBeInTheDocument()
  })
})

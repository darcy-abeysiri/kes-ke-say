// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { renderRoute } from './setup.tsx'

import nock from 'nock'

describe('Visiting the movies page', () => {
  it('shows a loading indicator', async () => {
    const screen = renderRoute('/movies')
    const indicator = screen.getByLabelText('loading')
    expect(indicator).toBeVisible()
  })

  it('shows an error message when the server fails', async () => {
    nock('http://localhost').get('/api/v1/users').reply(500, 'Oops!')
    const screen = renderRoute('/movies')
    const errorMessage = await screen.findByText(/Oops!/)
    expect(errorMessage).toBeVisible()
  })

  it('shows a list of all the movies', async () => {
    nock('http://localhost')
      .get('/api/v1/users')
      .reply(200, [
        {
          id: 1,
          auth0_id: 'auth0|123',
          username: 'paige',
          full_name: 'Paige Turner',
          location: 'Auckland',
          image: 'ava-03.png',
        },
      ])

    // ARRANGE
    const screen = renderRoute('/movies')
    // ACT
    // ASSERT
    const listHeading = await screen.findByRole('heading', {
      name: 'All movies (3)',
    })

    expect(listHeading).toBeVisible()
  })
})

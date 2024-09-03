// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { renderRoute } from '../../test-utils'

import nock from 'nock'

describe('Visiting the all groups page', () => {
  //loading
  it('shows a loading indicator', async () => {
    const screen = renderRoute('/groups')
    const indicator = screen.getByText('Loading') // maybe change to getByText
    expect(indicator).toBeVisible()
  })

  //error
  it('shows an error message when server fails', async () => {
    nock('http://localhost').get('/api/v1/groups').reply(500, 'Error')
    const screen = renderRoute('/groups')
    const errorMessage = await screen.findByText(/Error/)
    expect(errorMessage).toBeVisible()
  })

  it('shows a list of all the groups', async () => {
    nock('http://localhost')
      .get('/api.v1/groups')
      .reply(200, [
        { id: 1, name: 'friendChips', image: 'fries-darkgray.png' },
        { id: 2, name: 'The fast and the curious', image: 'car-darkgray.png' },
        { id: 3, name: 'Taco bout it', image: 'taco-darkgray.png' },
      ])

    //Arrange
    const screen = renderRoute('/groups')
    // Act
    //Assert
    const groupName = await screen.findByRole('Name', {
      name: 'All groups (3)',
    })

    expect(groupName).toBeVisible()
  })
})

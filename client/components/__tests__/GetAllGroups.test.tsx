// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { renderRoute } from '../../test-utils'

import nock from 'nock'

describe('Visiting the all groups page', () => {
  it('shows a loading indicator', async () => {
    const screen = renderRoute('/groups')
    const indicator = screen.getByText('Loading')
    expect(indicator).toBeVisible()
  })

  it('shows an error message when server fails', async () => {
    const scope = nock(document.baseURI)
      .get('/api/v1/groups')
      .reply(500, 'Error')
    const screen = renderRoute('/groups')
    const errorMessage = await screen.findByText('Error')
    expect(scope.isDone()).toBe(true)
    expect(errorMessage).toBeVisible()
  })

  it('shows a list of all the groups', async () => {
    const scope = nock(document.baseURI)
      .get('/api/v1/groups')
      .reply(200, [
        { id: 1, name: 'friendChips', image: 'fries-darkgray.png' },
        { id: 2, name: 'The fast and the curious', image: 'car-darkgray.png' },
        { id: 3, name: 'Taco bout it', image: 'taco-darkgray.png' },
      ])

    const screen = renderRoute('/groups')

    const groupName = await screen.findByText('friendChips')
    const groupName2 = await screen.findByText('The fast and the curious')
    const groupName3 = await screen.findByText('Taco bout it')

    expect(scope.isDone()).toBe(true)
    expect(groupName).toBeVisible()
    expect(groupName2).toBeVisible()
    expect(groupName3).toBeVisible()
  })
})

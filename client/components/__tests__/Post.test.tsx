// @vitest-environment jsdom
import { describe, it, expect, beforeAll } from 'vitest'
import { waitForElementToBeRemoved } from '@testing-library/react'
import { renderRoute } from '../../test-utils'
import nock from 'nock'
import '@testing-library/jest-dom/vitest'

beforeAll(() => {
  nock.disableNetConnect()
})

const dummyPost = {
  id: 2,
  user_id: 2,
  body: 'I found this really cool Italian place, they have the best food',
  image:
    'https://img.freepik.com/free-photo/fettuccine-with-tomato-sauce-minced-meat-garnished-with-grated-parmesan_141793-1778.jpg',
  created_at: new Date(Date.now()),
}

describe('<Post>', () => {
  it('should render a single', async () => {
    // Arrange
    const scope = nock(document.baseURI)
      .get('/api/v1/posts/2')
      .reply(200, dummyPost)

    const screen = renderRoute('/post/2')
    await waitForElementToBeRemoved(() => screen.getByText('Loading Posts'))

    // Act
    const expectedPost = await screen.getByText(
      'I found this really cool Italian place, they have the best food',
    )

    // Assert
    expect(expectedPost).toBeVisible()
    expect(scope.isDone()).toBe(true)
  })

  it('should show an error message if something goes wrong', async () => {
    // Arrange
    const scope = nock(document.baseURI).get('/api/v1/posts/2').reply(500)

    const screen = renderRoute('/post/2')
    await waitForElementToBeRemoved(() => screen.getByText('Loading Posts'))

    // Act
    const expectedError = screen.getByText('Something went wrong...')

    // Assert
    expect(expectedError).toBeInTheDocument()
    expect(scope.isDone()).toBe(true)
  })
})

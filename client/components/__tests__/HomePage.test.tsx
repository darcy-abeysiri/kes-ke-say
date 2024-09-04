// @vitest-environment jsdom
import { describe, it, expect, beforeAll } from 'vitest'
import { waitForElementToBeRemoved } from '@testing-library/react'
import { renderRoute } from '../../test-utils'
import nock from 'nock'
import '@testing-library/jest-dom/vitest'

beforeAll(() => {
  nock.disableNetConnect()
})


const dummyPosts = [
  {
    id: 1,
    user_id: 1,
    body: 'I found this really interesting book, you should check it out',
    image:
      'https://img.freepik.com/free-photo/book-composition-with-open-book_23-2147690555.jpg',
    created_at: new Date(Date.now()),
  },
  {
    id: 2,
    user_id: 2,
    body: 'I found this really cool Italian place, they have the best food',
    image:
      'https://img.freepik.com/free-photo/fettuccine-with-tomato-sauce-minced-meat-garnished-with-grated-parmesan_141793-1778.jpg',
    created_at: new Date(Date.now()),
  },
]


describe('<Home>', () => {
  it('should render a list of posts', async () => {
    // Arrange
    const scope = nock(document.baseURI)
      .get('/api/v1/posts')
      .reply(200, dummyPosts)

    const screen = renderRoute("/")
    await waitForElementToBeRemoved(() => screen.getByText("Loading Posts"))
    
    // Act
    const expectedPost = await screen.getByText('I found this really interesting book, you should check it out')
    
    // Assert
    expect(expectedPost).toBeVisible()
    expect(scope.isDone()).toBe(true)
    
  })
  
  it('should show an error message if something goes wrong', async () => {
    // Arrange
    const scope = nock(document.baseURI)
    .get('/api/v1/posts')
    .reply(500)
    
    const screen = renderRoute("/")
    await waitForElementToBeRemoved(() => screen.getByText("Loading Posts"))

    // Act
    const expectedError = screen.getByText('Something went wrong...')

    // Assert
    expect(expectedError).toBeInTheDocument()
    expect(scope.isDone()).toBe(true)

  })
})


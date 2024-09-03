// //@vitest-environment jsdom
// import { describe, it, expect, beforeEach } from 'vitest'
// import {
//   screen,
//   waitFor,
//   waitForElementToBeRemoved,
// } from '@testing-library/react'
// import { renderRoute } from '../../test-utils'
// import nock from 'nock'
// import { cleanup } from '@testing-library/react'
// import * as matchers from '@testing-library/jest-dom/matchers'
// import '@testing-library/jest-dom/vitest'
// beforeEach(cleanup)
// expect.extend(matchers)

// describe('<User>', () => {
//   it('should render a user', async () => {
//     // ARRANGE
//     // 'nock' an http network call
//     nock('https://jsonplaceholder.typicode.com')
//       .get('/users/')
//       // Fake the 'get' request and reply
//       .reply(200, [
//         {
//           id: 1,
//           auth0_id: 'auth0|123',
//           username: 'paige',
//           full_name: 'Paige Turner',
//           location: 'Auckland',
//           image: 'ava-03.png',
//         },
//         {
//           id: 2,
//           auth0_id: 'auth0|234',
//           username: 'ida',
//           full_name: 'Ida Dapizza',
//           location: 'Auckland',
//           image: 'ava-02.png',
//         },
//       ])
//     // ACT
//     //  Render Route
//     renderRoute('/')
//     await waitForElementToBeRemoved(() => screen.getByText(/loading/i))
//     //  async wait for screen
//     let user1
//     waitFor(() => screen.getByText('ida'))
//       .then((res) => {
//         user1 = res
//         expect(user1).toBeInTheDocument()
//       })
//       .catch((e) => console.log(e))
//     // ASSERT
//     // expect(boss1).toBeInTheDocument()
//   })

//   // SAD PATH! ERRORS ERRORS ERRORS
//   it('should render an error message when things go wrong', async () => {
//     // ARRANGE
//     // 'nock' an http network call
//     nock('https://jsonplaceholder.typicode.com')
//       // Fake the 'get' request and reply
//       .get('/users/')
//       // Fake the 'get' request and reply's with 500 server error
//       .reply(500)
//     // ACT
//     renderRoute('/')
//     await waitForElementToBeRemoved(() => screen.getByText('loading'))

//     // check that error message exists
//     const errorMsg = screen.getByText('Error!')

//     // ASSERT
//     expect(errorMsg).toBeInTheDocument()
//   })
// })

// Todo GraphQL Testing
import { graphql } from 'graphql'

import { before, after, testSchema } from 'utils/gql-test'
import { Todo } from 'db/entity/Todo'

beforeAll(before)
afterAll(after)

const mutation = `
  mutation {
    createTodo(item: "TESTING") {
      item
    }
  }
`

describe('Todo CRUD', () => {
  test('Create Todo', async () => {
    const res = await graphql(testSchema, mutation, {}, { Todo })
    const expected = {
      data: {
        createTodo: {
          item: "TESTING"
        }
      }
    }

    expect(res).toMatchObject(expected)
  })

  test('Mock DB', async () => {
    const mockFn = jest.fn()
    const mockDB = { create: mockFn }

    const res = await graphql(testSchema, mutation, {}, { Todo: mockDB })
    expect(res).toBeTruthy()
    expect(mockFn.mock.calls.length).toBe(1)
    expect(mockFn.mock.calls[0][0].item).toBe('TESTING')
  })

  test('Check DB For Todo', async () => {
    const val = await Todo.findOne({ where: { item: 'TESTING' } })
    if(val) expect(val.item).toBe('TESTING')
  })

})


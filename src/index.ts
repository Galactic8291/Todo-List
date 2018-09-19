// Index File
import "reflect-metadata"
import { ApolloServer } from 'apollo-server'

import { schema } from 'graphql/schema'
import { resolvers } from 'graphql/resolvers'
import { create } from 'utils/connection'
import { Todo } from 'db/entity/Todo'

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    Todo
  }
})

create('prod').then(async () => {
  await server.listen()
  console.clear()
  console.log('Server Is Running At http://localhost:4000')
})


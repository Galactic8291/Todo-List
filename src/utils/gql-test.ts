// GraphQL Testing Utils
import { makeExecutableSchema } from 'apollo-server'
import { getConnection } from 'typeorm'

import { schema } from 'graphql/schema'
import { resolvers } from 'graphql/resolvers'
import { create } from 'utils/connection'

export const before = async () => {
  await create('dev')
}

export const after = async () => {
  await getConnection().close()
}

export const testSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers
})


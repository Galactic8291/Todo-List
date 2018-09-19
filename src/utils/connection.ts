// Connection Creator
import { createConnection, getConnectionOptions } from 'typeorm'

export const create = async (name: string) => {
  const connectionOptions = await getConnectionOptions(name)
  return createConnection({ ...connectionOptions, name: 'default' })
}


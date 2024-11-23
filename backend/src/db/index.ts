import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'
import { env } from '../../env'

export const client = postgres(
  env.DATABASE_URL || 'postgresql://docker:docker@localhost:5432/rides'
)
export const db = drizzle(client, { schema })

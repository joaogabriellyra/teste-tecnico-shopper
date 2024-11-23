import { createId } from '@paralleldrive/cuid2'
import {
  integer,
  interval,
  numeric,
  pgTable,
  text,
  timestamp,
} from 'drizzle-orm/pg-core'

export const rides = pgTable('rides', {
  id: text('id')
    .primaryKey()
    .$default(() => createId()),
  customerId: text('customer_id').notNull(),
  driverId: integer('driver_id').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  origin: text('origin').notNull(),
  destination: text('destination').notNull(),
  distance: numeric('distance', { precision: 10, scale: 3 }).notNull(),
  duration: text('duration').notNull(),
  value: numeric('value', { precision: 10, scale: 2 }).notNull(),
})

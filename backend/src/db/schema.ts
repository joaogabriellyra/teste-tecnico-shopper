import { createId } from '@paralleldrive/cuid2'
import {
  integer,
  numeric,
  pgTable,
  real,
  text,
  timestamp,
} from 'drizzle-orm/pg-core'

export const drivers = pgTable('drivers', {
  id: integer('id').primaryKey().notNull(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  vehicle: text('vehicle').notNull(),
  rating: real('rating').notNull(),
  comment: text('comment').notNull(),
  ratePerKm: real('rate_per_km').notNull(),
  kmMinimum: integer('km_minimum').notNull(),
})

export const rides = pgTable('rides', {
  id: text('id')
    .primaryKey()
    .$default(() => createId()),
  customerId: text('customer_id').notNull(),
  driverId: integer('driver_id')
    .references(() => drivers.id)
    .notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  origin: text('origin').notNull(),
  destination: text('destination').notNull(),
  distance: numeric('distance', { precision: 10, scale: 3 }).notNull(),
  duration: text('duration').notNull(),
  value: numeric('value', { precision: 10, scale: 2 }).notNull(),
})

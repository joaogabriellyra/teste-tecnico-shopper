import { db } from '../../db'
import { rides } from '../../db/schema'
import type { Ride } from './interface'

export async function confirmARide({
  customerId,
  origin,
  destination,
  distance,
  duration,
  driverId,
  value,
}: Ride) {
  const rideInserted = await db
    .insert(rides)
    .values({
      customerId,
      origin,
      destination,
      distance,
      duration,
      driverId,
      value,
    })
    .returning()
  return rideInserted
}

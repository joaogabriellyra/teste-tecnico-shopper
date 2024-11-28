import { and, eq } from 'drizzle-orm'
import { db } from '../../db'
import { rides } from '../../db/schema'

export async function getRides(customerId: string, driverId?: number) {
  const conditions = driverId
    ? and(eq(rides.customerId, customerId), eq(rides.driverId, driverId))
    : eq(rides.customerId, customerId)

  const ridesWithOrWithoutSpecificDriver = await db
    .select({
      id: rides.id,
      date: rides.createdAt,
      origin: rides.origin,
      destination: rides.destination,
      distance: rides.distance,
      duration: rides.duration,
      driverId: rides.driverId,
      value: rides.value,
    })
    .from(rides)
    .where(conditions)

  return ridesWithOrWithoutSpecificDriver
}

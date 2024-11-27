import { eq } from 'drizzle-orm'
import { db } from '../../db'
import { drivers } from '../../db/schema'
import type { Driver } from './interfaces'

export async function getDriverById(driverId: number): Promise<Driver | null> {
  const driverFromDB = await db
    .select()
    .from(drivers)
    .where(eq(drivers.id, driverId))

  if (driverFromDB.length === 0) {
    return null
  }

  return driverFromDB[0] as Driver
}

import { db } from '../../db'
import { drivers } from '../../db/schema'
import type { Driver } from './interfaces'

export async function getDrivers(): Promise<Driver[]> {
  const driversFromDB: Driver[] = await db.select().from(drivers)
  return driversFromDB
}

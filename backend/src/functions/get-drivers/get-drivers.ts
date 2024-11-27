import { db } from '../../db'
import { drivers } from '../../db/schema'
import { Driver } from './interfaces'

export async function getDrivers(): Promise<Driver[]> {
  const driversFromDB: Driver[] = await db.select().from(drivers)
  return driversFromDB
}

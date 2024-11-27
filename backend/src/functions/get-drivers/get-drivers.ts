import { db } from '../../db'
import { drivers } from '../../db/schema'

interface Driver {
  id: number
  name: string
  description: string
  vehicle: string
  rating: number
  comment: string
  ratePerKm: number
  kmMinimum: number
}

export async function getDrivers(): Promise<Driver[]> {
  const driversFromDB: Driver[] = await db.select().from(drivers)
  return driversFromDB
}

import { client, db } from '.'
import { driversMock } from '../utils/drivers'
import { drivers, rides } from './schema'

async function seed() {
  await db.delete(rides)
  await db.delete(drivers)

  await Promise.all(
    driversMock.map(driver => db.insert(drivers).values(driver))
  )
}

seed().finally(() => {
  client.end()
})

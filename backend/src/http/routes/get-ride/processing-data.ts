import { getDrivers } from '../../../functions/get-drivers/get-drivers'

interface Ride {
  id: number
  date: Date
  origin: string
  destination: string
  distance: number
  duration: string
  driverId: number
  value: number
}

export async function processingRides(rides: Ride[]) {
  const drivers = await getDrivers()

  const processedRides = await Promise.all(
    rides.map(async ride => {
      const driver = drivers.find(driver => driver.id === ride.driverId)

      return {
        id: ride.id,
        date: ride.date,
        origin: ride.origin,
        destination: ride.destination,
        distance: ride.distance,
        duration: ride.duration,
        driver: {
          id: ride.driverId,
          name: driver?.name,
        },
        value: ride.value,
      }
    })
  )

  return processedRides
}

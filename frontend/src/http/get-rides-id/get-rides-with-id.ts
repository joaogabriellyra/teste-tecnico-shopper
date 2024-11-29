import type { GetRideType } from './get-ride-type'

export async function getRidesWithId(
  customerId: string,
  driverId: string
): Promise<GetRideType> {
  if (driverId !== 'todos') {
    const response = await fetch(
      `http://localhost:8080/ride/${customerId}?driver_id=${driverId}`
    )
    const data = await response.json()
    return data
  }
  const response = await fetch(`http://localhost:8080/ride/${customerId}`)
  const data = await response.json()
  return data
}

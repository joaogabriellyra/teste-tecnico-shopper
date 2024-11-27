import { getDrivers } from '../get-drivers/get-drivers'

interface LatLng {
  latitude: number
  longitude: number
}

interface LatLngContainer {
  latLng: LatLng
}
export async function processingData(
  distanceInMeters: number,
  durationInSeconds: string,
  originLatLng: LatLngContainer,
  destinationLatLng: LatLngContainer
) {
  const distanceInKm = distanceInMeters / 1000
  const regex = /^R\$\s?(\d+(?:,\d{1,2})?)$/
  const drivers = await getDrivers()
  const availableDrivers = drivers
    .filter(driver => driver.kmMinimum <= distanceInKm)
    .map(driver => ({
      ...{
        id: driver.id,
        name: driver.name,
        description: driver.description,
        vehicle: driver.vehicle,
        review: {
          rating: driver.rating,
          comment: driver.comment,
        },
      },
      value: Number((driver.ratePerKm * distanceInKm).toFixed(2)),
    }))
    .sort((a, b) => {
      if (a.value > b.value) {
        return 1
      }
      return -1
    })

  return {
    origin: {
      latitude: originLatLng.latLng.latitude,
      longitude: originLatLng.latLng.longitude,
    },
    destination: {
      latitude: destinationLatLng.latLng.latitude,
      longitude: destinationLatLng.latLng.longitude,
    },
    distance: distanceInMeters,
    duration: durationInSeconds,
    options: availableDrivers,
  }
}

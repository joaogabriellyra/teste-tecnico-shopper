import axios from 'axios'
import { env } from '../../../env'
import { processingData } from './processing-data'

export async function estimateARideWithRoutesAPI(
  origin: string,
  destination: string
) {
  const apiKey = env.GOOGLE_API_KEY
  const url = 'https://routes.googleapis.com/directions/v2:computeRoutes'

  try {
    const response = await axios.post(
      url,
      {
        origin: {
          address: origin,
        },
        destination: {
          address: destination,
        },
        travelMode: 'DRIVE',
        routingPreference: 'TRAFFIC_AWARE_OPTIMAL',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask':
            'routes.duration,routes.distanceMeters,routes.legs.startLocation,routes.legs.endLocation',
        },
      }
    )

    const routeResponse = response.data
    const route = response.data.routes[0]
    const originLatLng = route.legs[0].startLocation
    const destinationLatLng = route.legs[0].endLocation
    const distanceInMeters = route.distanceMeters
    const durationInSeconds = route.duration

    return {
      ...(await processingData(
        distanceInMeters,
        durationInSeconds,
        originLatLng,
        destinationLatLng
      )),
      routeResponse,
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        'Erro ao calcular rota:',
        error.response?.data || error.message
      )
    } else {
      console.error('Erro ao calcular rota:', (error as Error).message)
    }
    throw new Error('Falha ao calcular a rota')
  }
}

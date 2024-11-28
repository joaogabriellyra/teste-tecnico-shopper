import type { EstimateRideType } from './types/post-estimate-ride'

export async function postEstimateARide(
  customerId: string,
  origin: string,
  destination: string
): Promise<EstimateRideType> {
  const response = await fetch('http://localhost:8080/ride/estimate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ customer_id: customerId, origin, destination }),
  })
  const data = await response.json()
  return data
}

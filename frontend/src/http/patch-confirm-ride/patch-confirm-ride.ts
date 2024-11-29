import type { ConfirmRideType } from './confirm-ride'

export async function patchConfirmRide(request: ConfirmRideType) {
  const response = await fetch('http://localhost:8080/ride/confirm', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  })
  const data = await response.json()
  return data
}

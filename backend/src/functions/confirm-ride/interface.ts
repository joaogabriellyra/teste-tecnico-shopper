export interface Ride {
  value: number
  id?: string
  customerId: string
  driverId: number
  createdAt?: Date
  origin: string
  destination: string
  distance: number
  duration: string
}

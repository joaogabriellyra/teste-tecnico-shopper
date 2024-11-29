import { useQuery } from '@tanstack/react-query'
import type { EstimateRideType } from '../http/post-estimate-ride/estimate-ride-type'
import { patchConfirmRide } from '../http/patch-confirm-ride/patch-confirm-ride'
import { useNavigate } from 'react-router-dom'

type DriverProps = {
  id: number
  name: string
  description: string
  vehicle: string
  rating: number
  value: number
  comment: string
}

type estimateDataQueryType = EstimateRideType & {
  customerId: string
  addressOrigin: string
  addressDestination: string
}

export function Driver({
  id,
  name,
  description,
  vehicle,
  rating,
  value,
}: DriverProps) {
  const { data: estimateData } = useQuery<estimateDataQueryType>({
    queryKey: ['estimateARide'],
    staleTime: 1000 * 60,
  })

  const navigate = useNavigate()

  async function handleConfirmARide() {
    if (estimateData) {
      const request = {
        customer_id: estimateData.customerId,
        origin: estimateData.addressOrigin,
        destination: estimateData.addressDestination,
        distance: estimateData.distance,
        duration: estimateData.duration,
        driver: {
          id,
          name,
        },
        value,
      }
      const sucess = await patchConfirmRide(request)

      if (sucess.sucess === true) {
        navigate('/history')
      }
    }
  }

  return (
    <div className="bg-[#F3F2F2] flex flex-col rounded-tr-3xl rounded-bl-3xl w-80 items-center pb-5 gap-2">
      <h2 className="font-bold text-2xl">{name}</h2>
      <p className="text-center leading-relaxed text-base px-4">
        {description}
      </p>
      <span className="font-bold text-zinc-600">{vehicle}</span>
      <div>
        <span className="text-green-700">nota: {rating * 5}/5</span>
      </div>
      <span className="text-lg font-bold">Valor da corrida: R${value}</span>
      <button
        onClick={handleConfirmARide}
        type="submit"
        className="px-8 py-2 bg-sky-800 text-zinc-50 hover:bg-sky-600 focus:shadow-[0_0_0_2px_#0284c7]"
      >
        Escolher
      </button>
    </div>
  )
}

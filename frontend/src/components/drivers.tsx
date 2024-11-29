import { useQuery } from '@tanstack/react-query'
import type { EstimateRideType } from '../http/post-estimate-ride/estimate-ride-type'
import { Driver } from './driver'

export function Drivers() {
  const { data: estimateData } = useQuery<EstimateRideType>({
    queryKey: ['estimateARide'],
    staleTime: 1000 * 60,
  })

  return (
    <div className="flex gap-6">
      {estimateData?.options.map(driver => (
        <Driver
          key={String(driver.id)}
          id={driver.id}
          name={driver.name}
          description={driver.description}
          vehicle={driver.vehicle}
          rating={driver.review.rating}
          comment={driver.review.comment}
          value={driver.value}
        />
      ))}
    </div>
  )
}

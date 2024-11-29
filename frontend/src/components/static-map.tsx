import { useQuery } from '@tanstack/react-query'
import type { EstimateRideType } from '../http/post-estimate-ride/estimate-ride-type'

export function StaticMap() {
  const { data: estimateData } = useQuery<EstimateRideType>({
    queryKey: ['estimateARide'],
    staleTime: 1000 * 60,
  })

  const defaultGoogleMapsUrl =
    'https://maps.googleapis.com/maps/api/staticmap?size=400x400&markers=color:blue|label:A|-23.550520,-46.633308&markers=color:red|label:B|-22.903539,-43.209587&path=color:0x0000ff|weight:5|-23.550520,-46.633308|-22.903539,-43.209587&key=AIzaSyBNqFYLwQ6UN3rqWvaYP47urJvSOde_0UE'

  if (estimateData) {
    const rideGoogleMapsUrl = `https://maps.googleapis.com/maps/api/staticmap?size=400x400&markers=color:blue|label:A|${estimateData.origin.latitude},${estimateData.origin.longitude}&markers=color:red|label:B|${estimateData.destination.latitude},${estimateData.destination.longitude}&path=color:0x0000ff|weight:5|${estimateData.origin.latitude},${estimateData.origin.longitude}|${estimateData.destination.latitude},${estimateData.destination.longitude}&key=AIzaSyBNqFYLwQ6UN3rqWvaYP47urJvSOde_0UE`
    return <img src={encodeURI(rideGoogleMapsUrl)} alt="Mapa com rota" />
  }

  return <img src={encodeURI(defaultGoogleMapsUrl)} alt="Mapa com rota" />
}

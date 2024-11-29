import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { getRidesWithId } from '../http/get-rides-id/get-rides-with-id'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import type { GetRideType } from '../http/get-rides-id/get-ride-type'

export function History() {
  const queryClient = useQueryClient()
  const listRidesForm = z.object({
    customerId: z.string().min(1, 'Id do usuário é obrigatório'),
    driverId: z.enum(['1', '2', '3', 'todos']),
  })

  type ListRidesForm = z.infer<typeof listRidesForm>

  const { register, handleSubmit, reset } = useForm<ListRidesForm>({
    resolver: zodResolver(listRidesForm),
  })

  async function handleListRides({ customerId, driverId }: ListRidesForm) {
    const response = await getRidesWithId(customerId, driverId)
    queryClient.setQueryData(['getRide'], response)
    reset()
  }

  const { data: rideData } = useQuery<GetRideType>({
    queryKey: ['getRide'],
    staleTime: 1000 * 60,
  })

  return (
    <div className="flex flex-col items-center pt-32 gap-6">
      <h1 className="text-3xl font-bold">Histoŕico de corridas</h1>
      <p className="text-zinc-600">
        Informe o seu ID para visualizar todas as suas corridas e caso queira
        ver todas as suas corridas com algum motorista especifico, selecione o
        ID do motorista desejado.
      </p>
      <form onSubmit={handleSubmit(handleListRides)}>
        <div className="flex flex-col gap-6">
          <input
            type="text"
            placeholder="Informe o seu ID"
            className="p-2"
            {...register('customerId')}
          />
          <select {...register('driverId')} defaultValue="todos">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="todos">Todos</option>
          </select>
          <button
            type="submit"
            className="px-4 py-2 bg-sky-800 text-zinc-50 hover:bg-sky-600 focus:shadow-[0_0_0_2px_#0284c7]"
          >
            Solicitar
          </button>
        </div>
      </form>
      <div className="p-4 flex flex-col gap-6">
        {rideData?.rides.map(ride => {
          const dateObj = new Date(ride.date)
          const data = dateObj.toLocaleDateString('pt-BR')
          const horario = dateObj.toLocaleTimeString('pt-BR')
          const durationInMinutes = Math.ceil(
            Number(ride.duration.slice(0, -1)) / 60
          )
          return (
            <div
              className="bg-[#F3F2F2] flex flex-col rounded-tr-3xl rounded-bl-3xl w-80 items-center pb-5 gap-2"
              key={ride.id}
            >
              <span>{data}</span>
              <span>{horario}</span>
              <h2 className="text-2xl">{ride.driver.name}</h2>
              <p>{ride.origin}</p>
              <p>{ride.destination}</p>
              <span>{ride.distance / 1000} km</span>
              <span>{durationInMinutes} minutos</span>
              <span>R$: {ride.value}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

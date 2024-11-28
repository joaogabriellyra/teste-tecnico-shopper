import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { postEstimateARide } from '../http/post-estimate-ride'
import { useQueryClient } from '@tanstack/react-query'

const estimateARideForm = z.object({
  customerId: z.string().min(1, 'Id do usuário é obrigatório'),
  origin: z.string().min(3, 'Endereço de origem é obrigatório'),
  destination: z.string().min(3, 'Endereço de destino é obrigatório'),
})

type EstimateARideForm = z.infer<typeof estimateARideForm>

export function Form() {
  const queryClient = useQueryClient()
  const { register, handleSubmit, formState, reset } =
    useForm<EstimateARideForm>({
      resolver: zodResolver(estimateARideForm),
    })

  async function handleEstimateARide({
    customerId,
    origin,
    destination,
  }: EstimateARideForm) {
    const responseEstimateARide = await postEstimateARide(
      customerId,
      origin,
      destination
    )
    reset()
    queryClient.setQueryData(['estimateARide'], responseEstimateARide)
  }

  return (
    <form onSubmit={handleSubmit(handleEstimateARide)}>
      <div className="flex flex-col gap-6">
        <input
          type="text"
          placeholder="ID"
          className="p-2"
          {...register('customerId')}
        />
        {formState.errors.customerId && (
          <p className="text-red-400 text-sm">
            {formState.errors.customerId.message}
          </p>
        )}
        <input
          type="addres"
          placeholder="Origem"
          className="p-2"
          {...register('origin')}
        />
        {formState.errors.origin && (
          <p className="text-red-400 text-sm">
            {formState.errors.origin.message}
          </p>
        )}
        <input
          type="text"
          placeholder="Destino"
          className="p-2"
          {...register('destination')}
        />
        {formState.errors.destination && (
          <p className="text-red-400 text-sm">
            {formState.errors.destination.message}
          </p>
        )}
        <button
          type="submit"
          className="px-4 py-2 bg-sky-800 text-zinc-50 hover:bg-sky-600 focus:shadow-[0_0_0_2px_#0284c7]"
        >
          Solicitar
        </button>
      </div>
    </form>
  )
}

import z from 'zod'

export const estimateARideSchema = {
  body: z
    .object({
      customer_id: z.string().min(1, 'Id do usuário é obrigatório'),
      origin: z.string().min(3, 'Endereço de origem é obrigatório'),
      destination: z.string().min(3, 'Endereço de destino é obrigatório'),
    })
    .refine(
      data => {
        const enderecoOrigem = data.origin.toLowerCase().replace(/\s+/g, '')
        const enderecoDestino = data.destination
          .toLowerCase()
          .replace(/\s+/g, '')
        return enderecoOrigem !== enderecoDestino
      },
      {
        message:
          'O endereço de origem e o endereço de destino não podem ser iguais',
        path: ['destination'],
      }
    ),
}

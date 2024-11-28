import z from 'zod'

const paramsSchema = z.object({
  customer_id: z.string().min(1, 'Nenhum registro encontrado'),
})

const querySchema = z.object({
  driver_id: z.coerce
    .number()
    .min(1, 'Motorista invalido')
    .max(3, 'Motorista invalido')
    .optional(),
})

export const getRide = {
  params: paramsSchema,
  querystring: querySchema,
}

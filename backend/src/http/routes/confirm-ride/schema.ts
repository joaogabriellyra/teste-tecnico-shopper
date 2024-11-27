import z from 'zod'
import { driversMock } from '../../../utils/drivers';

const driverSchema = z.object({
  name: z.string().min(3, 'Nome é obrigatório!'),
  id: z.number().int().positive({message: 'Id é obrigatório e deve ser um valor inteiro e positivo!'}),
});

export const confirmARideSchema = {
  body: z
    .object({
      customer_id: z.string().min(1, 'Id do usuário é obrigatório'),
      origin: z.string().min(3, 'Endereço de origem é obrigatório'),
      destination: z.string().min(3, 'Endereço de destino é obrigatório'),
      duration: z.string().min(1, 'Duração é obrigatório').regex(/^\d+s$/, "Duration deve ser no formato '270s'"),
      distance: z.number().positive(), 
      driver: driverSchema,
      value: z.number()
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
    ).superRefine(({driver: { id, name }, distance}, ctx) => {
      const isAValidDriver = driversMock.find(driver => driver.id === id && driver.name === name)
      if (!isAValidDriver) {
        ctx.addIssue({
          path: ["id", "name"],
          code: "custom",
          message: "DRIVER_NOT_FOUND",
        })
      }
      if (isAValidDriver && (distance / 1000) < isAValidDriver?.kmMinimum) {
        ctx.addIssue({
          path: ["distance"],
          code: "custom",
          message: "INVALID_DISTANCE",
        })
      }
      
    }),
}

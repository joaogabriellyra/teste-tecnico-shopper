import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { confirmARideSchema } from './schema'
import { confirmARide } from '../../../functions/confirm-ride'
export const confirmARideRoute: FastifyPluginAsyncZod = async app => {
  app.patch(
    '/ride/confirm',
    {
      schema: confirmARideSchema,
    },
    async (request, reply) => {
      const {
        customer_id: customerId,
        destination,
        origin,
        distance,
        duration,
        driver: { id: driverId, name },
        value,
      } = request.body
      console.log(request.body)
      try {
        await confirmARide({
          value,
          customerId,
          driverId,
          origin,
          destination,
          distance,
          duration,
        })
        return reply.status(200).send({ sucess: true })
      } catch (error) {
        return reply.status(400).send({
          error_code: 'INVALID_DATA',
          error_description:
            'Os dados fornecidos no corpo da requisição são inválidos',
        })
      }
    }
  )
}

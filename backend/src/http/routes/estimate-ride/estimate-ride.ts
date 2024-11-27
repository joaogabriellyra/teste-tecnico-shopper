import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { estimateARideSchema } from './schema'
import { estimateARideWithRoutesAPI } from '../../../functions/estimate-ride-routes-api/estimate-ride-routes-api'
export const estimateARideRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/ride/estimate',
    {
      schema: estimateARideSchema,
    },
    async (request, reply) => {
      const { customer_id: customerId, destination, origin } = request.body
      try {
        const response = await estimateARideWithRoutesAPI(origin, destination)
        return reply.status(200).send(response)
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

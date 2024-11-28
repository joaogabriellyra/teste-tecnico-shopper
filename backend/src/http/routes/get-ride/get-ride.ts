import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { estimateARideWithRoutesAPI } from '../../../functions/estimate-ride-routes-api'
import { getRide } from './schema'
import { getRides } from '../../../functions/get-ride'
import { processingRides } from './processing-data'
export const getRideRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/ride/:customer_id',
    {
      schema: getRide,
    },
    async (request, reply) => {
      const { customer_id: customerId } = request.params
      const { driver_id: driverId } = request.query
      try {
        const rides = await getRides(customerId, driverId)
        if (!rides.length) {
          throw new Error('Nenhum registro encontrado')
        }
        const response = await processingRides(rides)
        return reply
          .status(200)
          .send({ customer_id: customerId, rides: response })
      } catch (error) {
        return reply.status(404).send({
          error_code: 'NO_RIDES_FOUND',
          error_description: 'Nenhum registro encontrado',
        })
      }
    }
  )
}

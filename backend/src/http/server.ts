import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { env } from '../../env'
import { estimateARideRoute } from './routes/estimate-ride/estimate-ride'
import { ZodError } from 'zod'

const server = fastify().withTypeProvider<ZodTypeProvider>()

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.setErrorHandler((error, _request, reply) => {
  if (error.validationContext) {
    return reply.status(400).send({
      error_code: 'INVALID_DATA',
      error_description:
        'Os dados fornecidos no corpo da requisição são inválidos',
    })
  }
})

server.register(estimateARideRoute)

server.listen({ port: env.PORT || 8080, host: '0.0.0.0' }, () => {
  console.log(`server listening on port ${env.PORT || 8080}`)
})

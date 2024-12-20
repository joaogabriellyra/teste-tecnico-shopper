import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { env } from '../../env'
import { estimateARideRoute } from './routes/estimate-ride/estimate-ride'
import { confirmARideRoute } from './routes/confirm-ride/confirm-ride'
import { getRideRoute } from './routes/get-ride/get-ride'
import fastifyCors from '@fastify/cors'

const server = fastify().withTypeProvider<ZodTypeProvider>()

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.setErrorHandler((error, _request, reply) => {
  const { validation } = error
  if (validation && validation[0].message === 'Motorista invalido') {
    return reply.status(400).send({
      error_code: 'INVALID_DRIVER',
      error_description: 'Motorista invalido',
    })
  }
  if (validation && validation[0].message === 'Nenhum registro encontrado') {
    return reply.status(404).send({
      error_code: 'NO_RIDES_FOUND',
      error_description: 'Nenhum registro encontrado',
    })
  }
  if (validation && validation[0].message === 'DRIVER_NOT_FOUND') {
    return reply.status(404).send({
      error_code: 'DRIVER_NOT_FOUND',
      error_description: 'Motorista não encontrado ',
    })
  }
  if (validation && validation[0].message === 'INVALID_DISTANCE') {
    return reply.status(406).send({
      error_code: 'INVALID_DISTANCE',
      error_description: 'Quilometragem inválida para o motorista',
    })
  }

  if (error.validationContext) {
    return reply.status(400).send({
      error_code: 'INVALID_DATA',
      error_description:
        'Os dados fornecidos no corpo da requisição são inválidos',
    })
  }
})

server.register(fastifyCors, {
  origin: '*',
})

server.register(estimateARideRoute)
server.register(confirmARideRoute)
server.register(getRideRoute)

server.get('/health', (req, reply) => {
  reply.status(200).send('OK')
})
server.listen({ port: env.PORT || 8080, host: '0.0.0.0' }, () => {
  console.log(`server listening on port ${env.PORT || 8080}`)
})

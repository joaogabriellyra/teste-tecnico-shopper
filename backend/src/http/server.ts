import fastify from 'fastify'
import { env } from '../../env'

const server = fastify()

server.listen({ port: env.PORT || 8080 }, () => {
  console.log(`server listening on port ${env.PORT || 8080}`)
})

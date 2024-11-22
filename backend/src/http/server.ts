import fastify from 'fastify'

const server = fastify()

server.listen({ port: 8080 }, () => {
  console.log('server listening on port 8080')
})

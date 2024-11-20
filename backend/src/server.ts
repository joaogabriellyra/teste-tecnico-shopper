import fastify from 'fastify'

const server = fastify()

server.listen({ port: 3000}, () => {
  console.log('server listening on port 3000')
})
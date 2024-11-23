import { client, db } from '.'
import { drivers } from '../utils/drivers'
import { rides } from './schema'

async function seed() {
  await db.delete(rides)

  await db.insert(rides).values([
    {
      customerId: '58',
      driverId: drivers[0].id,
      origin: 'Mardônio de Albuquerque Nascimento, 137',
      destination: 'Green Fitness',
      distance: '10.000',
      duration: '38',
      value: '10.00',
    },
    {
      customerId: '58',
      driverId: drivers[0].id,
      origin: 'Green Fitness',
      destination: 'Mardônio de Albuquerque Nascimento, 137',
      distance: '10.000',
      duration: '38',
      value: '10.00',
    },
    {
      customerId: '2',
      driverId: drivers[1].id,
      origin: 'Green Fitness',
      destination: 'Mardônio de Albuquerque Nascimento, 137',
      distance: '10.000',
      duration: '38',
      value: '10.00',
    },
    {
      customerId: '1',
      driverId: drivers[2].id,
      origin: 'Green Fitness',
      destination: 'Mardônio de Albuquerque Nascimento, 137',
      distance: '10.000',
      duration: '38',
      value: '10.00',
    },
  ])
}

seed().finally(() => {
  client.end()
})

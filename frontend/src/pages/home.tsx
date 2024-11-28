import { Drivers } from '../components/drivers'
import { Form } from '../components/form'
import { StaticMap } from '../components/static-map'

export function Home() {
  return (
    <div className=" flex flex-col items-center pt-20 gap-8">
      <div className="flex gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Shopper Táxi</h1>
          <div className="flex gap-6">
            <Form />
          </div>
        </div>
        <StaticMap />
      </div>
      <Drivers />
    </div>
  )
}

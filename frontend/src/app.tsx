import { Form } from './pages/form'

export function App() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-8">
      <h1 className="text-3xl font-bold">Shopper Táxi</h1>
      <div className="flex gap-6">
        <Form />
      </div>
    </div>
  )
}

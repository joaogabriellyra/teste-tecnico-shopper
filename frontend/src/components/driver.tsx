type DriverProps = {
  name: string
  description: string
  vehicle: string
  rating: number
  value: number
  comment: string
}

export function Driver({
  name,
  description,
  vehicle,
  rating,
  value,
}: DriverProps) {
  return (
    <div className="bg-[#F3F2F2] flex flex-col rounded-tr-3xl rounded-bl-3xl w-80 items-center pb-5 gap-2">
      <h2 className="font-bold text-2xl">{name}</h2>
      <p className="text-center leading-relaxed text-base px-4">
        {description}
      </p>
      <span className="font-bold text-zinc-600">{vehicle}</span>
      <div>
        <span>nota: {rating * 5}/5</span>
      </div>
      <span className="text-lg font-bold">Valor da corrida: R${value}</span>
      <button
        type="submit"
        className="px-8 py-2 bg-sky-800 text-zinc-50 hover:bg-sky-600 focus:shadow-[0_0_0_2px_#0284c7]"
      >
        Escolher
      </button>
    </div>
  )
}

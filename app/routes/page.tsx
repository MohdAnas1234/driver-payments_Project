'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

type Route = {
  id: string
  source: string
  destination: string
  batta_per_trip: number
  salary_per_trip: number
}

export default function Routes() {
  const [source, setSource] = useState('')
  const [destination, setDestination] = useState('')
  const [batta, setBatta] = useState('')
  const [salary, setSalary] = useState('')
  const [routes, setRoutes] = useState<Route[]>([])

  const loadRoutes = async () => {
    const { data } = await supabase.from('routes').select('*')
    setRoutes(data || [])
  }

  const addRoute = async () => {
    if (!source || !destination || !batta || !salary) {
      alert('Fill all fields')
      return
    }

    await supabase.from('routes').insert({
      source,
      destination,
      batta_per_trip: Number(batta),
      salary_per_trip: Number(salary),
    })

    setSource('')
    setDestination('')
    setBatta('')
    setSalary('')
    loadRoutes()
  }

  useEffect(() => {
    loadRoutes()
  }, [])

  return (
    <div className="container">
      <h2>Add Route</h2>

      <input placeholder="Source" value={source} onChange={e => setSource(e.target.value)} />
      <input placeholder="Destination" value={destination} onChange={e => setDestination(e.target.value)} />
      <input placeholder="Batta per Trip" type="number" value={batta} onChange={e => setBatta(e.target.value)} />
      <input placeholder="Salary per Trip" type="number" value={salary} onChange={e => setSalary(e.target.value)} />

      <button onClick={addRoute}>Add Route</button>

      <h3>Routes</h3>
      {routes.map(r => (
        <div key={r.id} className="list-item">
          {r.source} → {r.destination} | Batta: ₹{r.batta_per_trip} | Salary: ₹{r.salary_per_trip}
        </div>
      ))}
    </div>
  )
}

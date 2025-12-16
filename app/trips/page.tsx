'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

type Driver = {
  id: string
  name: string
}

type Route = {
  id: string
  source: string
  destination: string
}

export default function Trips() {
  const [drivers, setDrivers] = useState<Driver[]>([])
  const [routes, setRoutes] = useState<Route[]>([])
  const [driver, setDriver] = useState('')
  const [route, setRoute] = useState('')
  const [vehicle, setVehicle] = useState('')

  useEffect(() => {
    supabase.from('drivers').select('*').then(res => {
      setDrivers(res.data || [])
    })

    supabase.from('routes').select('*').then(res => {
      setRoutes(res.data || [])
    })
  }, [])

  const createTrip = async () => {
    if (!driver || !route || !vehicle) {
      alert('Please fill all fields')
      return
    }

    await fetch('/api/trips', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ driver, route, vehicle }),
    })

    alert('Trip Created')
    setVehicle('')
    setDriver('')
    setRoute('')
  }

  return (
    <div className="container">
      <h2>Create Trip</h2>

      <input
        placeholder="Vehicle Number"
        value={vehicle}
        onChange={e => setVehicle(e.target.value)}
      />

      <label>Driver</label>
      <select  aria-label="Select Driver" value={driver} onChange={e => setDriver(e.target.value)}>
        <option value="">Select Driver</option>
        {drivers.map(d => (
          <option key={d.id} value={d.id}>
            {d.name}
          </option>
        ))}
      </select>

      <label>Route</label>
      <select  aria-label="Select Trip" value={route} onChange={e => setRoute(e.target.value)}>
        <option value="">Select Route</option>
        {routes.map(r => (
          <option key={r.id} value={r.id}>
            {r.source} → {r.destination}
          </option>
        ))}
      </select>

      <button onClick={createTrip}>Submit Trip</button>
    </div>
  )
}

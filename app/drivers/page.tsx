'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

type Driver = {
  id: string
  name: string
  payment_preference: string
}

export default function Drivers() {
  const [name, setName] = useState('')
  const [preference, setPreference] = useState('BATTA_ONLY')
  const [drivers, setDrivers] = useState<Driver[]>([])

  const loadDrivers = async () => {
    const { data } = await supabase.from('drivers').select('*')
    setDrivers(data || [])
  }

  const addDriver = async () => {
    if (!name) {
      alert('Enter driver name')
      return
    }

    await supabase.from('drivers').insert({
      name,
      payment_preference: preference
    })

    setName('')
    loadDrivers()
  }

  useEffect(() => {
    loadDrivers()
  }, [])

  return (
    <div className="container">
      <h2>Add Driver</h2>

      <input
        placeholder="Driver Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <label htmlFor="preference">Payment Preference</label>
<select
  id="preference"
  value={preference}
  onChange={e => setPreference(e.target.value)}
>
  <option value="BATTA_ONLY">Batta Only</option>
  <option value="SALARY_ONLY">Salary Only</option>
  <option value="BATTA_AND_SALARY">Batta + Salary</option>
</select>


      <button onClick={addDriver}>Add</button>

      <h3>Drivers List</h3>
      {drivers.map(d => (
        <p key={d.id}>
          {d.name} — {d.payment_preference}
        </p>
      ))}
    </div>
  )
}

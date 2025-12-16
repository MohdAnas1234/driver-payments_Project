'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'

type Settlement = {
  id: string
  settlement_type: string
  total_batta: number
  total_salary: number
  period_start: string
  period_end: string
  driver_id: string
}

type Driver = {
  id: string
  name: string
}

export default function SettlementHistory() {
  const [settlements, setSettlements] = useState<Settlement[]>([])
  const [drivers, setDrivers] = useState<Driver[]>([])

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const { data: settlementData } = await supabase
      .from('settlements')
      .select('*')
      .order('created_at', { ascending: false })

    const { data: driverData } = await supabase
      .from('drivers')
      .select('*')

    setSettlements(settlementData || [])
    setDrivers(driverData || [])
  }

  const getDriverName = (driverId: string) => {
    const driver = drivers.find(d => d.id === driverId)
    return driver ? driver.name : 'Unknown'
  }

  return (
    <div className="container">
      <h2>Settlement History</h2>

      {settlements.length === 0 && <p>No settlements found.</p>}

      {settlements.map(s => (
        <div
          key={s.id}
          style={{
            border: '1px solid #ddd',
            padding: 12,
            marginBottom: 12,
            borderRadius: 4,
          }}
        >
          <p><strong>Driver:</strong> {getDriverName(s.driver_id)}</p>
          <p><strong>Type:</strong> {s.settlement_type}</p>
          <p><strong>Batta:</strong> ₹{s.total_batta}</p>
          <p><strong>Salary:</strong> ₹{s.total_salary}</p>
          <p>
            <strong>Period:</strong>{' '}
            {new Date(s.period_start).toLocaleDateString()} –{' '}
            {new Date(s.period_end).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  )
}

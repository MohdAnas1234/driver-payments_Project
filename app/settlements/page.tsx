'use client'
import { useState } from 'react'

export default function Settlements() {
  const [loading, setLoading] = useState<'weekly' | 'monthly' | null>(null)

  const weekly = async () => {
    try {
      setLoading('weekly')
      const res = await fetch('/api/settlements/weekly', {
        method: 'POST',
      })

      if (!res.ok) throw new Error('Weekly settlement failed')

      alert('Weekly Settlement Done')
    } catch (err) {
      alert('Error running weekly settlement')
    } finally {
      setLoading(null)
    }
  }

  const monthly = async () => {
    try {
      setLoading('monthly')
      const res = await fetch('/api/settlements/monthly', {
        method: 'POST',
      })

      if (!res.ok) throw new Error('Monthly settlement failed')

      alert('Monthly Settlement Done')
    } catch (err) {
      alert('Error running monthly settlement')
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="container">
      <h2>Settlements</h2>

      <button onClick={weekly} disabled={loading === 'weekly'}>
        {loading === 'weekly' ? 'Processing...' : 'Weekly Settlement'}
      </button>

      <br /><br />

      <button onClick={monthly} disabled={loading === 'monthly'}>
        {loading === 'monthly' ? 'Processing...' : 'Monthly Settlement'}
      </button>
    </div>
  )
}

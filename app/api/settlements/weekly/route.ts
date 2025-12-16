import { supabase } from '../../../../lib/supabase'

export async function POST() {
  const end = new Date()
  const start = new Date()
  start.setDate(end.getDate() - 7)

  const { data } = await supabase
    .from('trip_payments')
    .select('driver_id, batta_amount')
    .gte('created_at', start.toISOString())
    .lte('created_at', end.toISOString())

  const totals: Record<string, number> = {}

  data?.forEach(row => {
    totals[row.driver_id] =
      (totals[row.driver_id] || 0) + row.batta_amount
  })

  for (const driverId in totals) {
    await supabase.from('settlements').insert({
      driver_id: driverId,
      settlement_type: 'WEEKLY',
      total_batta: totals[driverId],
      total_salary: 0,
      period_start: start,
      period_end: end,
    })
  }

  return Response.json({ success: true })
}

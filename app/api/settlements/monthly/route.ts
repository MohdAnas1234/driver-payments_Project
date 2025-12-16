import { supabase } from '../../../../lib/supabase'

export async function POST() {
  const end = new Date()
  const start = new Date()
  start.setMonth(end.getMonth() - 1)

  const { data } = await supabase
    .from('trip_payments')
    .select('driver_id, salary_amount')
    .gte('created_at', start.toISOString())
    .lte('created_at', end.toISOString())

  const totals: Record<string, number> = {}

  data?.forEach(row => {
    totals[row.driver_id] =
      (totals[row.driver_id] || 0) + row.salary_amount
  })

  for (const driverId in totals) {
    await supabase.from('settlements').insert({
      driver_id: driverId,
      settlement_type: 'MONTHLY',
      total_batta: 0,
      total_salary: totals[driverId],
      period_start: start,
      period_end: end,
    })
  }

  return Response.json({ success: true })
}

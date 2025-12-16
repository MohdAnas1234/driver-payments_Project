import { supabase } from '../../../lib/supabase'

export async function POST(req: Request) {
  const { driver, route, vehicle } = await req.json()

  // 1. Get driver preference
  const { data: driverData } = await supabase
    .from('drivers')
    .select('*')
    .eq('id', driver)
    .single()

  // 2. Get route configuration
  const { data: routeData } = await supabase
    .from('routes')
    .select('*')
    .eq('id', route)
    .single()

  const total = routeData.batta_per_trip + routeData.salary_per_trip
  let batta = 0
  let salary = 0

  // 3. Apply assignment logic
  if (driverData.payment_preference === 'BATTA_ONLY') {
    batta = total
  } else if (driverData.payment_preference === 'SALARY_ONLY') {
    salary = total
  } else {
    batta = routeData.batta_per_trip
    salary = routeData.salary_per_trip
  }

  // 4. Save trip
  const { data: trip } = await supabase
    .from('trips')
    .insert({
      vehicle_number: vehicle,
      driver_id: driver,
      route_id: route,
    })
    .select()
    .single()

  // 5. Save trip payment
  await supabase.from('trip_payments').insert({
    trip_id: trip.id,
    driver_id: driver,
    batta_amount: batta,
    salary_amount: salary,
  })

  return Response.json({ success: true })
}

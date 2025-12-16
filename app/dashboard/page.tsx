export default function Dashboard() {
  return (
    <div className="container">
      <h2>Driver Payments Dashboard</h2>
      <p className="dashboard-subtitle">
        Manage drivers, routes, trips and settlements
      </p>

      <div className="dashboard-grid">
        <a className="card" href="/drivers">
          <h3>Drivers</h3>
          <p>Add drivers & payment preferences</p>
        </a>

        <a className="card" href="/routes">
          <h3>Routes</h3>
          <p>Configure batta & salary per trip</p>
        </a>

        <a className="card" href="/trips">
          <h3>Trips</h3>
          <p>Create trips for vehicles</p>
        </a>

        <a className="card" href="/settlements">
          <h3>Settlements</h3>
          <p>Run weekly & monthly payments</p>
        </a>

        <a className="card" href="/settlements/history">
          <h3>History</h3>
          <p>View past settlements</p>
        </a>
      </div>
    </div>
  )
}

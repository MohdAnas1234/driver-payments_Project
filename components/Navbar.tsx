import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/drivers">Drivers</Link>
      <Link href="/routes">Routes</Link>
      <Link href="/trips">Trips</Link>
      <Link href="/settlements">Settlements</Link>
      <Link href="/settlements/history">History</Link>
    </nav>
  )
}

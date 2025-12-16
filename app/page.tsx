

// 'use client'
// import { useState } from 'react'
// import { supabase } from '../lib/supabase'

// export default function LoginPage() {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [error, setError] = useState('')

//   const handleLogin = async () => {
//     const { error } = await supabase.auth.signInWithPassword({
//       email,
//       password
//     })
//     if (error) setError(error.message)
//     else window.location.href = '/dashboard'
//   }

//   return (
//     <div className="container">
//       <h2>Driver Payments System</h2>

//       <label>Email</label>
//       <input
//         placeholder="Enter email"
//         value={email}
//         onChange={e => setEmail(e.target.value)}
//       />

//       <label>Password</label>
//       <input
//         type="password"
//         placeholder="Enter password"
//         value={password}
//         onChange={e => setPassword(e.target.value)}
//       />

//       <button onClick={handleLogin}>Login</button>

//       {error && <p style={{ color: 'red' }}>{error}</p>}
//     </div>
//   )
// }







'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    // Dummy login for assignment
    if (!email || !password) {
      alert('Enter email and password')
      return
    }

    router.push('/dashboard')
  }

  return (
    <div className="container">
      <h2>Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  )
}

import Link from 'next/link'
import { signup } from './actions'

export default function SignUpPage() {
  return (
    <form>
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="displayname">First name:</label>
      <input id="displayname" name="displayname" type="text" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      
      <button formAction={signup}>Sign up</button>
      <br />OR<br />
      <Link href="/signup"><button>Log In</button></Link>
    </form>
  )
}
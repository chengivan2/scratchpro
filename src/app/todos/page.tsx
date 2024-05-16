import Head from 'next/head'
import { useSession } from '@supabase/auth-helpers-react'
import TodoList from '../components/TodoList'

export default function Home() {
  const session = useSession()

  return (
    <>
      <div>
        {session && (
          <div style={{ minWidth: 250, maxWidth: 600, margin: 'auto' }}>
            <TodoList session={session} />
          </div>
        )}
      </div>
    </>
  )
}

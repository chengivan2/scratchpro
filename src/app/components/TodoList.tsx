import { Database } from '../../../lib/schema'
import { Session, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'

type Todos = Database['public']['Tables']['current_todos']['Row']

export default function TodoList({ session }: { session: Session }) {
  const supabase = useSupabaseClient<Database>()
  const [todos, setTodos] = useState<Todos[]>([])
  const [newTodoName, setNewTodoName] = useState('')
  const [newTodoDescription, setNewTodoDescription] = useState('')
  const [errorText, setErrorText] = useState('')

  const user = session.user

  useEffect(() => {
    const fetchTodos = async () => {
      const { data: todos, error } = await supabase
        .from('current_todos')
        .select('*')
        .order('id', { ascending: true })

      if (error) console.log('error', error)
      else setTodos(todos)
    }

    fetchTodos()
  }, [supabase])

  const addTodo = async (todoName: string, todoDescription: string) => {
    let todo = todoName.trim()
    let description = todoDescription.trim()
    if (todo.length && description.length) {
      const { data: newTodo, error } = await supabase
        .from('current_todos')
        .insert({ todo_name: todo, todo_description: description, user_id: user.id })
        .select()
        .single()

      if (error) {
        setErrorText(error.message)
      } else {
        setTodos([...todos, newTodo])
        setNewTodoName('')
        setNewTodoDescription('')
      }
    }
  }

  const deleteTodo = async (id: number) => {
    try {
      await supabase.from('current_todos').delete().eq('id', id).throwOnError()
      setTodos(todos.filter((x) => x.id != id))
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <div>
      <h1>Todo List.</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          addTodo(newTodoName, newTodoDescription)
        }}
      >
        <input
          type="text"
          placeholder="make coffee"
          value={newTodoName}
          onChange={(e) => {
            setErrorText('')
            setNewTodoName(e.target.value)
          }}
        />
        <input
          type="text"
          placeholder="description"
          value={newTodoDescription}
          onChange={(e) => {
            setErrorText('')
            setNewTodoDescription(e.target.value)
          }}
        />
        <button type="submit">
          Add
        </button>
      </form>
      {!!errorText && <Alert text={errorText} />}
      <div>
        <ul>
          {todos.map((todo) => (
            <Todo key={todo.id} todo={todo} onDelete={() => deleteTodo(todo.id)} />
          ))}
        </ul>
      </div>
    </div>
  )
}

const Todo = ({ todo, onDelete }: { todo: Todos; onDelete: () => void }) => {
  const supabase = useSupabaseClient<Database>()
  const [isCompleted, setIsCompleted] = useState(todo.is_complete)

  const toggle = async () => {
    try {
      const { data } = await supabase
        .from('current_todos')
        .update({ is_complete: !isCompleted })
        .eq('id', todo.id)
        .throwOnError()
        .select()
        .single()

      if (data) setIsCompleted(data.is_complete)
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <li>
      <div>
        <div>{todo.todo_name}</div>
        <div>{todo.todo_description}</div>
      </div>
      <div>
        <input
          onChange={(e) => toggle()}
          type="checkbox"
          checked={isCompleted ? true : false}
        />
      </div>
      <button
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          onDelete()
        }}
      >
        Submit
      </button>
    </li>
  )
}

const Alert = ({ text }: { text: string }) => (
  <div>
    <div>{text}</div>
  </div>
)

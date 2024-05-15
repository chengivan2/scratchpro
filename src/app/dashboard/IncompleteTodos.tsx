"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

interface Todo {
  todoid: number;
  todoname: string;
  tododescription: string;
  completed: boolean;
  timeadded: Date;
  todouserid: number;
}

export default function IncompleteTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    // const {
    //   data: { user },
    // } = await supabase.auth.getUser();
    // const userid = user?.id;
    const { data: incompleteTodos, error } = await supabase
      .from("current_todos")
      .select("*")
      .eq("completed", false);
    //   .eq("todouserid", user?.id)

    if (error) {
      console.log("Error: ", error);
    } else {
      setTodos(incompleteTodos || []);
      console.log(incompleteTodos)
      console.log(todos);
    }
  }

  return (
    <div>
      <h2>Incomplete Todos</h2>
      {todos.map((todo) => (
        <div key={todo.todoid}>
          <h2>{todo.todoname}</h2>
          <p>{todo.tododescription}</p>
        </div>
      ))}
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

interface Todo {
  todoid: number;
  todoname: string;
  tododescription: string;
  "completed?": boolean;
  timeadded: Date;
  todouserid: number;
}

export default async function IncompleteTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Get the current user

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Get the user's ID
  const userid = user?.id;

  // Select the user's todos

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    const { data: incompleteTodosData, error } = await supabase
      .from("current_todos")
      .select("*")
      .eq("todouserid", userid)
      .eq("completed?", false);

    if (error) console.log("Error: ", error);
    else setTodos(incompleteTodosData);
    "use server"
    console.log(incompleteTodosData);
  }

  return (
    <div>
      <h2>IncompleteTodos</h2>

      {todos.map((todo, index) => (
        <div key={index}>
          <h2>{todo.todoname}</h2>
          <p>{todo.tododescription}</p>
        </div>
      ))}
    </div>
  );
}

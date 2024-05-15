"use server";

import { createClient } from "@supabase/supabase-js";

export default async function IncompleteTodos() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Select the user's todos
  async function fetchTodos() {
    // // Get the current user

    // const {
    //   data: { user },
    // } = await supabase.auth.getUser();

    // // Get the user's ID
    // const userid = user?.id;
    const { data: incompleteTodosData, error } = await supabase
      .from("current_todos")
      .select("*")
      .eq("completed", false);
    //   .eq("todouserid", userid)

    if (error) {
      console.log("Error: ", error);
    } else {
      console.log("Incomplete Todos: ", incompleteTodosData);
    }
  }

  fetchTodos();

  return (
    <div>
      <h2>IncompleteTodos</h2>
    </div>
  );
}

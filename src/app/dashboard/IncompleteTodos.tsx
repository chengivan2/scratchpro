import { createClient } from "@supabase/supabase-js";

export default async function IncompleteTodos() {
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
  async function fetchTodos() {
    const { data: incompleteTodosData, error } = await supabase
      .from("current_todos")
      .select("*")
      .eq("todouserid", userid)
      .eq("completed", false);

    if (error) {
      console.log("Error: ", error);
    } else {
      console.log("Incomplete Todos: ", incompleteTodosData);
    }

    return (
      <div>
        <h2>IncompleteTodos</h2>
      </div>
    );
  }
}

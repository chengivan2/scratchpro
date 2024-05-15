import { redirect } from "next/navigation";
import { createClient } from "../../../utils/supabase/server";

export default async function PrivatePage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <div>
      <p>
        Hello {data.user.email}. I hope your name is{" "}
        {data.user.user_metadata["first_name"]}
      </p>
    </div>
  );
}

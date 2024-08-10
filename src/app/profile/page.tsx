import { isLoggedIn } from "@/actions/login";
import { redirect } from "next/navigation";

export default async function Profile() {
  const isLogged = await isLoggedIn();

  if (!isLogged) {
    redirect("/");
  }

  return (
    <div>
      <h1>profile</h1>
    </div>
  );
}

import { redirect } from "@sveltejs/kit";
import { GITHUB_CLIENT_ID } from "$env/static/private";

export function GET() {
  const params = new URLSearchParams({
    client_id: GITHUB_CLIENT_ID,
    scope: "read:user user:email"
  });

  throw redirect(302, `https://github.com/login/oauth/authorize?${params}`);
}

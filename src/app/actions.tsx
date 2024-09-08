"use server"
import { redirect } from "next/navigation";
import { env } from "../../env.mjs"
import { generateRandomString } from "@/lib/utils";

export async function spotify_login() {
  const state = generateRandomString(20)

  const scope = [
    'user-read-currently-playing'
  ]

  const search_params = {
    response_type: 'code',
    client_id: env.SPOTIFY_CLIENT_ID,
    scope: scope.join(""),
    redirect_uri: env.SPOTIFY_REDIRECT_URL,
    state
  }

  console.log(search_params)

  let spotify_redirect_url = new URL("https://accounts.spotify.com/authorize")
  let url_search_params = new URLSearchParams("")

  Object.entries(search_params).forEach((entry) => {
    url_search_params.append(...entry)
  })

  spotify_redirect_url.search = url_search_params.toString()
  redirect(spotify_redirect_url.toString())
}

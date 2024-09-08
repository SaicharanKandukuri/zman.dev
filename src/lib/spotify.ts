"use server"
import { redirect } from "next/navigation";
import { env } from "../../env.mjs"
import { generateRandomString } from "./utils";

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

export async function getAccessToken(code: string) {
  const form = {
    code,
    redirect_uri: env.SPOTIFY_REDIRECT_URL,
    grant_type: 'authorization_code'
  }


  try {
    const res = await fetch("https://accounts.spotify.com/api/token", {
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + (Buffer.from(env.SPOTIFY_CLIENT_ID + ':' + env.SPOTIFY_CLIENT_SECRET).toString('base64'))
      },
      body: (new URLSearchParams(form)).toString(),
      method: "POST",
    })

    console.log(await res.json())
  } catch (e) {
    console.error(e)
  }
}

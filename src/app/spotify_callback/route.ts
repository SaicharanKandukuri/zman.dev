import { getAccessToken } from "@/lib/spotify"

export async function GET(request: Request) {
  console.log(": Got a spotify auth callback")
  const url = new URL(request.url)
  const params = new URLSearchParams(url.search)
  const spotifyUserCode =  params.get("code")

  if (!spotifyUserCode) {
    console.error("Invalid GET.")
    return Response.json({
      msg: "Oopsie daisy! Invalid Get request",
      url: request.url
    })
  }

  await getAccessToken(spotifyUserCode)

  return Response.json({
    msg: "Bonjur GET"
  })
}

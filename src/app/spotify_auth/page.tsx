"use client"
import { spotify_login } from "../actions";
import { Button } from "@/components/ui/button";

export default function PAGE() {
  return (
    <div>
      <Button onClick={async () => {
        await spotify_login()
      }}>Do auth</Button>
    </div>
  )
}
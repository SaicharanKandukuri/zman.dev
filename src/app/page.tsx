"use client";
import RetroGrid from "@/components/magicui/retro-grid";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-24">
      <span className="pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] bg-clip-text text-center text-5xl md:text-9xl font-bold leading-none tracking-tighter text-transparent">
        zman.dev
      </span>
      <RetroGrid />
    </main>
  );
}


"use client";
import RetroGrid from "@/components/magicui/retro-grid";
import BearButton from "@/components/bearcheckbox/bear";

export default function Home() {
  return (
    <main className=" flex min-h-screen flex-col items-center justify-center p-24">
        <div className="flex">
            <span className="pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] bg-clip-text text-center text-5xl md:text-9xl font-bold leading-none tracking-tighter text-transparent">
                zman.dev
            </span>
            <div className="-bottom-0">
                <BearButton />
            </div>
        </div>
      <RetroGrid />
    </main>
  );
}


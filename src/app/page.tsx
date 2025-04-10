import { HydrateClient } from "@/trpc/server";
import { TypewriterEffect } from "@/components/blocks/typewriter";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="h-screen">
        <div className="flex h-full flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-neutral-800 dark:text-neutral-100">
            <div className="flex items-center gap-2">
              <TypewriterEffect
                content={[
                  "Welcome to Leet Types",
                  "Master TypeScript with interactive challenges",
                ]}
              />
              <span className="blinking-cursor">|</span>
            </div>
          </h1>
          <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
            <span className="inline-block [animation:typing_3.5s_steps(40,end)_1s_forwards] overflow-hidden whitespace-nowrap">
              Master TypeScript with interactive challenges
            </span>
          </p>

          <Button className="mt-4 cursor-pointer" size="lg" asChild>
            <Link prefetch href="/playground">
              Get Started
            </Link>
          </Button>
        </div>
        <div className="absolute right-0 bottom-4 left-0 flex justify-center text-sm text-neutral-500 dark:text-neutral-400">
          Powered by{" "}
          <a
            href="https://tsch.js.org"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 hover:text-neutral-800 dark:hover:text-neutral-200"
          >
            Type Challenges
          </a>
        </div>
      </main>
    </HydrateClient>
  );
}

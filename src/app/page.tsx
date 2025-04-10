import { HydrateClient } from "@/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="h-screen">ss</main>
    </HydrateClient>
  );
}

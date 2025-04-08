import { HydrateClient } from "@/trpc/server";

import DockviewDemo from "@/components/demo/app";
export default async function Home() {
  return (
    <HydrateClient>
      <main className="h-screen">
        <DockviewDemo />
      </main>
    </HydrateClient>
  );
}

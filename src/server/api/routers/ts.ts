import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const tsRouter = createTRPCRouter({
  hello: publicProcedure.query(() => {
    return "Hello, world!";
  }),
  getVersions: publicProcedure
    .input(
      z.object({
        version: z.string().optional(),
        limit: z.number().optional(),
      }),
    )
    .query(async ({ input }) => {
      try {
        const response = await fetch("https://registry.npmjs.org/typescript");
        if (!response.ok)
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: `HTTP error! status: ${response.status}`,
          });

        const data = (await response.json()) as {
          versions: Record<string, unknown>;
        };

        const versions = Object.keys(data.versions).sort().reverse();

        const filteredVersions = versions
          .filter((version) => {
            if (input.version) return version.startsWith(input.version);
            return (
              version.startsWith("3.9") ||
              version.startsWith("4") ||
              version.startsWith("5")
            );
          })
          .filter((version) => {
            return (
              !version.includes("rc") &&
              !version.includes("beta") &&
              !version.includes("alpha") &&
              !version.includes("dev") &&
              !version.includes("insiders")
            );
          });

        return input.limit
          ? filteredVersions.slice(0, input.limit)
          : filteredVersions;
      } catch (error) {
        console.error("Error fetching TypeScript versions:", error);
        return [];
      }
    }),
});

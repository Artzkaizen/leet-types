import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import redis from "@/server/db/redis";
import { TRPCError } from "@trpc/server";
import type { GithubContent, Problem } from "@/types";

const ONE_DAY = 60 * 60 * 24;

export const problemRouter = createTRPCRouter({
  getProblems: publicProcedure.query(async () => {
    try {
      // Try to get from cache first
      const cachedProblems = await redis.get<Problem[]>(
        "type-challenges:problems",
      );

      if (cachedProblems) return cachedProblems;

      const owner = "type-challenges";
      const repo = "type-challenges";
      const path = "questions";

      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
        {
          headers: {
            Accept: "application/vnd.github.v3+json",
          },
        },
      );

      if (!response.ok) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `GitHub API error: ${response.statusText}`,
        });
      }

      const contents = (await response.json()) as GithubContent[];

      const problems = contents
        .filter(
          (item): item is GithubContent & { name: string } =>
            item.type === "dir" && typeof item.name === "string",
        )
        .map((item) => {
          const parts = item.name.split("-");
          if (parts.length < 3) return null;

          const [number, difficulty, ...nameParts] = parts;
          return {
            id: number,
            difficulty,
            name: nameParts
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" "),
            path: item.path,
          };
        })
        .filter((item): item is Problem => item !== null)
        .sort((a, b) => Number(a.id) - Number(b.id));

      await redis.set("type-challenges:problems", problems, { ex: ONE_DAY });
      return problems;
    } catch (error) {
      console.error("Error fetching problems:", error);
      throw error;
    }
  }),

  getProblemContent: publicProcedure
    .input(z.object({ path: z.string() }))
    .query(async ({ input }) => {
      try {
        // Try to get from cache first
        const cacheKey = `type-challenges:content:${input.path}`;
        const cachedContent = await redis.get<string>(cacheKey);
        if (cachedContent) return { content: cachedContent };

        const owner = "type-challenges";
        const repo = "type-challenges";

        const response = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/contents/${input.path}/README.md`,
          {
            headers: {
              Accept: "application/vnd.github.v3.raw",
            },
          },
        );

        if (!response.ok) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: `GitHub API error: ${response.statusText}`,
          });
        }

        const content = await response.text();

        // Cache the content
        await redis.set(cacheKey, content, { ex: ONE_DAY });
        return { content };
      } catch (error) {
        console.error("Error fetching problem content:", error);
        throw error;
      }
    }),
});

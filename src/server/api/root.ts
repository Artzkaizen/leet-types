import { tsRouter } from "@/server/api/routers/ts";
import { problemRouter } from "@/server/api/routers/problem";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  ts: tsRouter,
  problem: problemRouter,
});

export type AppRouter = typeof appRouter;
export const createCaller = createCallerFactory(appRouter);

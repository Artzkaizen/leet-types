import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { Problem } from "@/types";
import Link from "next/link";

export function ProblemSheet({
  problems,
  children,
}: {
  problems: Problem[];
  children: React.ReactNode;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Problems</SheetTitle>
          <SheetDescription>Select a problem to get started.</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 overflow-y-auto p-4">
          <div className="space-y-1">
            {problems.map((problem) => (
              <Link
                prefetch
                key={problem.id}
                className="block w-full rounded-lg bg-neutral-800/50 p-4 text-left hover:bg-neutral-800/70"
                href={`/playground/description?problem=${problem.path}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-neutral-400">{problem.id}.</span>
                    <span className="text-white">{problem.name}</span>
                  </div>
                  <span
                    className={`text-sm ${
                      problem.difficulty.toLowerCase() === "easy"
                        ? "text-emerald-400"
                        : problem.difficulty.toLowerCase() === "medium"
                          ? "text-yellow-400"
                          : problem.difficulty.toLowerCase() === "hard"
                            ? "text-red-400"
                            : problem.difficulty.toLowerCase() === "warm"
                              ? "text-blue-400"
                              : problem.difficulty.toLowerCase() === "extreme"
                                ? "text-purple-400"
                                : "text-neutral-400"
                    }`}
                  >
                    {problem.difficulty}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

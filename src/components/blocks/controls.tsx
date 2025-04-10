import { api } from "@/trpc/react";
import { ChevronLeft, ChevronRight, Menu, Shuffle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useQueryState } from "nuqs";
import { z } from "zod";
import { ProblemSheet } from "./sheet";

export function DailyQuestionHeader() {
  const problems = api.problem.getProblems.useQuery();

  const [selectedProblem, setSelectedProblem] = useQueryState(
    "problem",
    z.string().optional(),
  );

  const handleNextProblem = () => {
    const currentIndex = problems.data?.findIndex(
      (problem) => problem.path === selectedProblem,
    );
    if (
      problems.data &&
      currentIndex !== undefined &&
      currentIndex < (problems.data?.length ?? 0) - 1
    ) {
      void setSelectedProblem(problems.data[currentIndex + 1]?.path ?? null);
    }
  };

  const handlePreviousProblem = () => {
    const currentIndex = problems.data?.findIndex(
      (problem) => problem.path === selectedProblem,
    );
    if (problems.data && currentIndex !== undefined && currentIndex > 0) {
      void setSelectedProblem(problems.data[currentIndex - 1]?.path ?? null);
    }
  };

  const getRandomProblem = () => {
    const randomIndex = Math.floor(
      Math.random() * (problems.data?.length ?? 0),
    );
    void setSelectedProblem(problems.data?.[randomIndex]?.path ?? null);
  };
  return (
    <div className="group/leet-types flex items-center">
      <ul className="relative mr-2 flex h-10 items-center">
        <Link href="/" className="mr-2 self-center">
          <div className="mb-0.5 pl-1">
            <div className="hidden h-5 dark:flex">
              <Image
                width={100}
                height={100}
                className="h-full fill-white stroke-white"
                alt="Leet Types"
                src="/leet-types.svg"
              />
            </div>
            <div className="flex h-5 dark:hidden">
              <Image
                width={100}
                height={100}
                className="h-full fill-white stroke-white"
                alt="Leet Types"
                src="/leet-types.svg"
              />
            </div>
          </div>
        </Link>
      </ul>

      <div className="group flex items-center overflow-hidden rounded hover:bg-neutral-100 md:flex dark:hover:bg-neutral-800">
        <ProblemSheet problems={problems.data ?? []}>
          <div
            className="group/nav-back flex h-[32px] cursor-pointer items-center gap-2 px-2 text-neutral-500 transition-none hover:bg-neutral-200 hover:text-neutral-600 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-100"
            data-state="closed"
          >
            <Menu />
            <div className="relative flex items-center gap-2">
              <div className="max-w-[170px] truncate font-medium text-neutral-800 group-hover:text-neutral-600 group-hover/nav-back:invisible hover:text-neutral-600 dark:text-neutral-100 dark:group-hover:text-neutral-100 dark:hover:text-neutral-100">
                Daily Question
              </div>
              <div className="invisible absolute top-0 left-0 flex w-full max-w-[170px] gap-1 overflow-hidden group-hover/nav-back:visible">
                <div className="flex-1 truncate font-medium text-neutral-800 group-hover:text-neutral-600 hover:text-neutral-600 dark:text-neutral-100 dark:group-hover:text-neutral-100 dark:hover:text-neutral-100">
                  Daily Question
                </div>
              </div>
            </div>
          </div>
        </ProblemSheet>
        <div className="h-[28px] w-[1px] bg-neutral-200 opacity-0 group-hover/leet-types:opacity-100 dark:bg-neutral-700"></div>
        <Link
          onClick={handlePreviousProblem}
          className="group flex h-[32px] w-[32px] cursor-pointer items-center text-neutral-500 transition-none group-hover:text-neutral-600 hover:bg-neutral-200 dark:text-neutral-400 dark:group-hover:text-neutral-100 dark:hover:bg-neutral-700"
          data-state="closed"
          href="/"
        >
          <ChevronLeft />
        </Link>
        <div className="h-[28px] w-[1px] bg-neutral-200 opacity-0 group-hover/leet-types:opacity-100 dark:bg-neutral-700"></div>
        <Link
          onClick={handleNextProblem}
          className="group flex h-[32px] w-[32px] cursor-pointer items-center text-neutral-500 transition-none group-hover:text-neutral-600 hover:bg-neutral-200 dark:text-neutral-400 dark:group-hover:text-neutral-100 dark:hover:bg-neutral-700"
          data-state="closed"
          href=""
        >
          <ChevronRight />
        </Link>
        <div className="h-[28px] w-[1px] bg-neutral-200 opacity-0 group-hover/leet-types:opacity-100 dark:bg-neutral-700"></div>
        <Link
          onClick={getRandomProblem}
          href=""
          target=""
          rel=""
          className="flex h-[32px] w-[32px] cursor-pointer items-center justify-center text-neutral-500 transition-none hover:bg-neutral-200 hover:text-neutral-600 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-100"
          data-state="closed"
        >
          <Shuffle className="size-4" />
        </Link>
      </div>
    </div>
  );
}

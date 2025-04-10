"use client";

import MarkdownRenderer from "@/components/blocks/markdown-renderer";
import { api } from "@/trpc/react";
import { useQueryState } from "nuqs";
import { useEffect } from "react";
import { z } from "zod";

export default function PlaygroundDescription() {
  const [selectedProblem, setSelectedProblem] = useQueryState(
    "problem",
    z.string().optional(),
  );

  const problems = api.problem.getProblems.useQuery();
  const problemContent = api.problem.getProblemContent.useQuery(
    { path: selectedProblem ?? "" },
    { enabled: !!selectedProblem },
  );

  useEffect(() => {
    if (problems.data && problems.data.length > 0 && !selectedProblem) {
      void setSelectedProblem(problems.data[0]?.path ?? null);
    }
  }, [problems.data, selectedProblem, setSelectedProblem]);

  if (problemContent.isError || problems.isError) {
    return (
      <div className="flex h-full items-center justify-center">
        Error loading problem content
      </div>
    );
  }

  return <MarkdownRenderer markdown={problemContent.data?.content ?? ""} />;
}

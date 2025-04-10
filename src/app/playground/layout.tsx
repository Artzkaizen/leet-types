"use client";
import { DailyQuestionHeader } from "@/components/blocks/controls";
import { SimpleGridview } from "@/components/blocks/dock";
import { SettingsDialog } from "@/components/settings-dialog";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="dockview-theme-dark grid h-screen grid-rows-[50px_1fr]">
      <div className="flex items-center justify-center">
        <DailyQuestionHeader />
        <div>
          <SettingsDialog />
        </div>
      </div>
      <div className="p-2">
        <SimpleGridview>{children}</SimpleGridview>
      </div>
    </main>
  );
}

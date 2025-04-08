
import { SimpleGridview } from "@/components/blocks/dock";
import { SettingsDialog } from "@/components/settings-dialog";


export default function Home() {
  return (
      <main className="grid grid-rows-[50px_1fr] h-screen dockview-theme-dark">
        <div className="flex items-center justify-center bg-red-300">
          <div >
            <SettingsDialog />
          </div>
        </div>
        <div className="p-2">
        <SimpleGridview />
        </div>
      </main>
  );
}

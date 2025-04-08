
import { SimpleGridview } from "@/components/blocks/dock";
import { SettingsDialog } from "@/components/settings-dialog";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";


export default function Home() {
  return (
      <main className="grid grid-rows-[50px_1fr] h-screen">
        <div className="flex items-center justify-center bg-red-300">
          <div >
          {/* 
          <Button variant={"ghost"} className="cursor-pointer hover:bg-transparent" size={"icon"}>
            <Settings  className="size-6"/>
            </Button> */}
            <SettingsDialog />
          </div>
        </div>
        <SimpleGridview />
      </main>
  );
}

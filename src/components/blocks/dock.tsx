"use client";

import {
  DockviewDefaultTab,
  DockviewReact,
  themeVisualStudio,
  type DockviewApi,
  type DockviewReadyEvent,
  type IDockviewPanelHeaderProps,
  type IDockviewPanelProps,
} from "dockview";

import Editor from "./editor";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import LangSettings from "./lang-settings";

const PanelWrapper = (props: React.PropsWithChildren) => {
  return <div className="h-full">{props.children}</div>;
};

export const SimpleGridview = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname().split("/").pop();

  const apiRef = useRef<DockviewApi | null>(null);

  const onReady = (event: DockviewReadyEvent) => {
    apiRef.current = event.api;

    // Your existing panel creation code...
    event.api.addPanel({
      id: "panel_1",
      title: "Description",
      component: "default",
      params: { title: "description" },
    });
    event.api.addPanel({
      id: "panel_2",
      title: "Solutions",
      component: "default",
      params: {
        title: "solutions",
      },
    });

    event.api.addPanel({
      id: "panel_3",
      component: "default",
      title: "Editor",
      params: {
        title: "editor",
      },
      position: { referencePanel: "panel_1", direction: "right" },
    });

    event.api.addPanel({
      id: "panel_4",
      title: ".JS",
      component: "default",
      position: { referencePanel: "panel_3", direction: "below" },
    });
    event.api.addPanel({
      id: "panel_5",
      title: "Console",
      component: "default",
      position: { referencePanel: "panel_4" },
    });
    event.api.addPanel({
      id: "panel_6",
      title: "Errors",
      component: "default",
      position: { referencePanel: "panel_4" },
    });

    // Set active panel based on current path
    const currentPath = pathname ?? "description";
    setActivePanelFromPath(currentPath);
  };

  // Function to set the active panel
  const setActivePanelFromPath = (path: string) => {
    if (!apiRef.current) return;

    const panelId = (() => {
      switch (path) {
        case "description":
          return "panel_1";
        case "solutions":
          return "panel_2";
        case "editor":
          return "panel_3";
        default:
          return "panel_1";
      }
    })();

    const panel = apiRef.current.panels.find((p) => p.id === panelId);
    if (panel) {
      panel.api.setActive();
    }
  };

  // Use effect to respond to path changes
  useEffect(() => {
    if (pathname) {
      setActivePanelFromPath(pathname);
    }
  }, [pathname]);

  const components = {
    default: (props: IDockviewPanelProps<{ title: string }>) => {
      switch (props.api.id) {
        case "panel_1":
          return (
            <PanelWrapper>
              <div className="h-full overflow-auto p-4">{children}</div>
            </PanelWrapper>
          );
        case "panel_2":
          return (
            <PanelWrapper>
              <div className="h-full overflow-auto p-4">{children}</div>
            </PanelWrapper>
          );
        case "panel_3":
          return (
            <PanelWrapper>
              <div className="h-full border-b border-gray-300">
                {/* <div >
                  <Select defaultValue={tsVersions[0]}>
                    <SelectTrigger >
                      <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                      {tsVersions.map((version) => (
                        <SelectItem key={version} value={version}>
                          {version}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div> */}

                <LangSettings />
                <div className="h-full overflow-auto">
                  <Editor />
                </div>
              </div>
            </PanelWrapper>
          );

        default:
          return (
            <PanelWrapper>
              <div className="p-4">
                {props.params.title} {props.api.id}
              </div>
            </PanelWrapper>
          );
      }
    },
    tab: (props: IDockviewPanelProps<{ title: string }>) => {
      return (
        <div className="bg-green-300s h-full">
          <div className="bg-red-100 p-4">{props.params.title}</div>
        </div>
      );
    },
  };
  return (
    <DockviewReact
      components={components}
      defaultTabComponent={headerComponents.default}
      theme={{ ...themeVisualStudio, gap: 8 }}
      onReady={onReady}
    />
  );
};

const headerComponents = {
  default: (props: IDockviewPanelHeaderProps<{ title: string }>) => {
    const onContextMenu = (event: React.MouseEvent) => {
      event.preventDefault();
      alert("context menu");
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();
    return (
      <DockviewDefaultTab
        hideClose
        onContextMenu={onContextMenu}
        onClick={() =>
          (props.params.title === "description" ||
            props.params.title === "solutions") &&
          router.push(`/playground/${props.params.title}`)
        }
        {...props}
      />
    );
  },
};

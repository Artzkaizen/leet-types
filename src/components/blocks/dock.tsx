"use client";

import {
    DockviewDefaultTab,
    DockviewReact,
    themeAbyss,
    type DockviewReadyEvent,
    type IDockviewPanelHeaderProps,
    type IDockviewPanelProps
} from "dockview";

const PanelWrapper = (props: React.PropsWithChildren) => {
  return <div className="h-full">{props.children}</div>;
};
const components = {
  default: (props: IDockviewPanelProps<{ title: string }>) => {
    return (
        <PanelWrapper>
        <div className="bg-red-100 p-4">
          {props.params.title} {props.api.id}
        </div>
        </PanelWrapper>
    );
  },
  tab: (props: IDockviewPanelProps<{ title: string }>) => {
    return (
      <div className="bg-green-300s h-full">
        <div className="bg-red-100 p-4">{props.params.title}</div>
      </div>
    );
  },
};

export const SimpleGridview = () => {
  const onReady = (event: DockviewReadyEvent) => {
    event.api.addPanel({
      id: "panel_1",
      title: "Description",
      component: "default",
      params: {
        title: "Panel 1",
      },
    });
    event.api.addPanel({
      id: "panel_2",
      title: "Solutions",
      component: "default",
      params: {
        title: "Panel 2",
      },
    });

    event.api.addPanel({
      id: "panel_3",
      component: "default",
      title: "Editor",
      params: {
        title: "Panel 3",
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
      position: { referencePanel: "panel_4", },
    });
    event.api.addPanel({
      id: "panel_6",
      title: "Errors",
      component: "default",
            position: { referencePanel: "panel_4" },
    });
  };


  return (
    <DockviewReact
      components={components}
      defaultTabComponent={headerComponents.default}
      theme={{...themeAbyss, gap: 8}}
      onReady={onReady}
    />
  );
};

const headerComponents = {
  default: (props: IDockviewPanelHeaderProps) => {
    const onContextMenu = (event: React.MouseEvent) => {
      event.preventDefault();
      alert("context menu");
    };
    return (
         <DockviewDefaultTab hideClose onContextMenu={onContextMenu} {...props} />
    );
  },
};

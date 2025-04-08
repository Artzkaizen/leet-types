"use client";

import {
  DockviewDefaultTab,
  DockviewReact,
  themeLight,
  type DockviewReadyEvent,
  type IDockviewPanelHeaderProps,
  type IDockviewPanelProps,
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
  // nested: (props: IDockviewPanelProps) => {
  //     return (
  //         <DockviewReact
  //             components={{
  //                 default: (props: IDockviewPanelProps) => {
  //                     return <div className='p-4 bg-red-100'>{props.params.title}</div>;
  //                 }
  //             }}
  //             onReady={(event: DockviewReadyEvent) => {
  //                 event.api.addPanel({ id: 'panel_1', component: 'default', params: { title: 'Panel 1' } });
  //                 event.api.addPanel({ id: 'panel_2', component: 'default', params: { title: 'Panel 2' } });
  //                 event.api.addPanel({
  //                     id: 'panel_3',
  //                     component: 'default',
  //                 });

  //                 event.api.onDidRemovePanel((e) => {
  //                     console.log('remove', e);
  //                 });
  //             }}
  //         />
  //     );
  // },
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
      // tabComponent: 'tab',
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
      title: "Console",
      component: "default",
      params: {
        title: "Panel 4",
      },
      position: { referencePanel: "panel_3", direction: "below" },
    });

    // event.api.addPanel({
    //     id: 'panel_5',
    //     component: 'default',
    //     params: {
    //         title: 'Panel 5',
    //     },
    //     position: { referencePanel: 'panel_3', direction: 'right' },
    // });

    // event.api.addPanel({
    //     id: 'panel_6',
    //     component: 'default',
    //     params: {
    //         title: 'Panel 6',
    //     },
    //     position: { referencePanel: 'panel_5', direction: 'below' },
    //     minimumWidth: 10,
    // });

    // event.api.addPanel({
    //     id: 'panel_7',
    //     component: 'default',
    //     params: {
    //         title: 'Panel 7',
    //     },
    //     position: { referencePanel: 'panel_6', direction: 'right' },
    //     minimumWidth: 10,
    // });

    // event.api.addPanel({
    //     id: 'panel_8',
    //     component: 'default',
    //     params: {
    //         title: 'Panel 8',
    //     },
    //     position: { referencePanel: 'panel_6', direction: 'right' },
    //     minimumWidth: 10,
    // });
  };

  return (
    // <GridviewReact
    //     components={components}
    //     onReady={onReady}

    //     proportionalLayout={false}
    //     orientation={Orientation.HORIZONTAL}
    //     // className="dockview-theme-abyss"
    // />

    <DockviewReact
      components={components}
      defaultTabComponent={headerComponents.default}
      // rightHeaderActionsComponent={RightControls}
      // leftHeaderActionsComponent={LeftControls}

      // watermarkComponent={
      //     watermark ? WatermarkComponent : undefined
      // }
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

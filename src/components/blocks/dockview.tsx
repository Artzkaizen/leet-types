"use client"

import {
    type IGridviewPanelProps,
    Orientation,
    GridviewReact,
    type GridviewReadyEvent,
    type IDockviewPanelProps,
    DockviewReact,
    type DockviewReadyEvent,
} from 'dockview';
import * as React from 'react';

const components = {
    default: (props: IGridviewPanelProps<{ title: string }>) => {
        return (<div className='h-full'>
            <div className='p-4 bg-red-100'>{props.params.title}</div>
        </div>)
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
    const onReady = (event: GridviewReadyEvent) => {
        event.api.addPanel({
            id: 'panel_1',
            component: 'default',
            params: {
                title: 'Panel 1',
            },
        });

        event.api.addPanel({
            id: 'panel_2',
            component: 'default',
            params: {
                title: 'Panel 2',
            },
        });

        event.api.addPanel({
            id: 'panel_3',
            component: 'default',
            params: {
                title: 'Panel 3',
            },
        });

        event.api.addPanel({
            id: 'panel_4',
            component: 'default',
            params: {
                title: 'Panel 4',
            },
            position: { referencePanel: 'panel_1', direction: "below"},
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
        // defaultTabComponent={headerComponents.default}
        // rightHeaderActionsComponent={RightControls}
        // leftHeaderActionsComponent={LeftControls}
       
        // watermarkComponent={
        //     watermark ? WatermarkComponent : undefined
        // }
        onReady={onReady}
        theme={props.theme}
    />
    );
};
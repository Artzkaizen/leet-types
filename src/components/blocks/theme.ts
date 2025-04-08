// customTheme.ts
import type { DockviewTheme } from "dockview";
import { themeAbyss } from "dockview"; // Import an existing theme to extend from

export const themeShadcnBlackGlass: DockviewTheme = {
  ...themeAbyss, // extend the Abyss theme
  name: "shadcn-black-glass",
  // Optionally override the className if needed
  className: "dockview-theme-shadcn-black-glass",
  // Optional drag-and-drop overlay mounting and panel overlay settings
  dndOverlayMounting: "absolute",
  dndPanelOverlay: "group",
  // You can adjust the gap between groups if desired
  gap: 8,
  // Now override the CSS variables for our custom look
  // These variables will be applied to elements within the Dockview component.
  // You can place these overrides in a CSS file targeting the theme className or inject via CSS-in-JS.
  // Below we list the ones of interest.
  // Use the glass effect on panels and floating groups.
  css: {
    "--dv-background-color": "rgba(15, 15, 15, 0.85)", // dark nearly black background
    "--dv-group-view-background-color": "rgba(15, 15, 15, 0.9)",
    "--dv-paneview-header-border-color": "rgba(255, 255, 255, 0.1)",
    "--dv-activegroup-visiblepanel-tab-background-color":
      "rgba(30, 30, 30, 0.8)",
    "--dv-activegroup-hiddenpanel-tab-background-color":
      "rgba(20, 20, 20, 0.7)",
    "--dv-inactivegroup-visiblepanel-tab-background-color":
      "rgba(10, 10, 10, 0.5)",
    "--dv-inactivegroup-hiddenpanel-tab-background-color":
      "rgba(10, 10, 10, 0.4)",
    "--dv-activegroup-visiblepanel-tab-color": "#fff",
    "--dv-activegroup-hiddenpanel-tab-color": "#aaa",
    "--dv-inactivegroup-visiblepanel-tab-color": "#ccc",
    "--dv-inactivegroup-hiddenpanel-tab-color": "#aaa",
    "--dv-tab-divider-color": "rgba(255, 255, 255, 0.05)",
    "--dv-separator-border": "1px solid rgba(255, 255, 255, 0.1)",

    // Define a glass effect. These are not built into Dockview so you’ll need to apply them
    // on the panel containers using the theme’s className.
    "--dv-panel-background": "rgba(20, 20, 20, 0.6)", // semi-transparent background for a glass effect
    "--dv-panel-border-color": "rgba(255, 255, 255, 0.2)",
    "--dv-panel-box-shadow": "0 4px 12px rgba(0, 0, 0, 0.5)",

    // Custom properties for glass effect that you can then use in your CSS
    "--dv-glass-backdrop-filter": "blur(12px)",
    "--dv-glass-border": "1px solid rgba(255, 255, 255, 0.2)",
  },
};

---
layout: home
hero:
  name: ScriptedScreens
  text: Custom Touchscreen UIs for Stationeers
  tagline: Build interactive dashboards, control panels, and games — all rendered on in-game computer screens using Lua
  image:
    src: /logo.png
    alt: ScriptedScreens Logo
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: Element Reference
      link: /api/display-elements
    - theme: alt
      text: Steam Workshop
      link: https://steamcommunity.com/sharedfiles/filedetails/?id=3666779631

features:
  - icon: 🖥️
    title: Declarative UI System
    details: Define UIs with simple Lua tables — element types, positions, styles, and event handlers. No C# or Unity knowledge needed.
  - icon: 🎨
    title: Rich Element Library
    details: Labels, buttons, sliders, checkboxes, progress bars, gauges, sparklines, bar charts, line charts, tables, and more.
  - icon: 🎮
    title: Touch & Keyboard Input
    details: Interactive elements with click, change, and toggle events. Full keyboard capture in Interface Mode for games and text input.
  - icon: 📊
    title: Data Visualization
    details: Built-in sparkline, bar chart, line chart, gauge, and table elements with live update support for real-time dashboards.
  - icon: 🖌️
    title: Canvas Drawing
    details: Pixel-level rendering for custom graphics — lines, circles, arcs, triangles, polylines. Perfect for games and oscilloscopes.
  - icon: 📱
    title: Tablet Support
    details: Tablet cartridges with target detection — point at any device to see its stats, atmosphere, power, and slot contents.
---

## Quick Example

```lua
local ui = ss.ui.surface("main")
ss.ui.activate("main")
ui:clear()

ui:element({
    id = "title",
    type = "label",
    rect = { unit = "px", x = 20, y = 10, w = 200, h = 30 },
    props = { text = "STATION STATUS" },
    style = { font_size = 18, color = "#22C55E" }
})

ui:element({
    id = "btn",
    type = "button",
    rect = { unit = "px", x = 20, y = 50, w = 120, h = 36 },
    props = { text = "CLICK ME" },
    style = { bg = "#334155", text = "#FFFFFF" },
    on_click = function(player) print("Clicked by " .. player) end
})

ui:commit()
```

::: tip New to ScriptedScreens?
Start with the [Getting Started guide](/guide/getting-started) for a step-by-step walkthrough, or browse the [Example Gallery](/examples/gallery) for copy-paste inspiration.
:::

::: warning AI-Generated Documentation
This documentation was AI-generated and may contain inaccuracies. If you find errors, please [submit a pull request](https://github.com/OrbitalFoundryModTeam/ScriptedScreensDocs) with corrections.
:::

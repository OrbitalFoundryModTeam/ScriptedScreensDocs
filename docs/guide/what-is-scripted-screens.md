# What is ScriptedScreens?

ScriptedScreens is a companion mod for [StationeersLua](https://orbitalfoundrymodteam.github.io/StationeersLuaDocs/) that enables **custom touchscreen user interfaces** on Stationeers computer consoles and tablets. Build interactive dashboards, monitoring displays, control panels, and even games — all rendered directly on in-game screens using Lua scripts.

## Features

- **Declarative UI System** — Define UIs using simple Lua tables with element types, positions, and styles
- **Rich Element Library** — Labels, buttons, checkboxes, sliders, progress bars, panels, scroll views, icons, and more
- **Data Visualization** — Sparklines, bar charts, line charts, gauges, and sortable tables with live update support
- **Touch & Keyboard Input** — Interactive elements with click, change, and toggle events; full keyboard capture in Interface Mode
- **Canvas Drawing** — Pixel-level rendering for custom graphics, games, and visualizations
- **60fps Rendering** — Optional `on_frame` callbacks for smooth animations and games
- **Multiple Surfaces** — Maintain multiple named UI views per physical screen and switch between them
- **Layout Helpers** — Grid, flex, and nested layout systems for responsive UIs without manual pixel math
- **Image & Media** — Display remote images (PNG, JPG, animated GIF), stream video with spatial audio
- **CCTV Integration** — Display live security camera feeds (requires CCTV mod)
- **Sound Playback** — Play built-in game sounds, announcements, and remote audio with 3D spatial positioning
- **Tablet Support** — Cartridges with target detection and wireless data network access
- **Multiplayer Compatible** — UI state synced across all connected clients
- **Save/Load Persistence** — Board UI snapshots persisted across world saves

## How It Works

ScriptedScreens introduces new circuit boards and cartridges that host Lua chips with direct screen access:

1. **Circuitboard (Lua Chip)** / **Motherboard (Lua Chip)** — Insert into a Computer or Console
2. **Cartridge (Lua Chip)** / **Cartridge (Lua Chip, Wireless)** — Insert into a Tablet

Each board/cartridge has a slot for an **Integrated Circuit (Lua)**. Your Lua script runs on the chip and uses the `ss` API to create UI elements, handle input, and draw on the screen.

## Community

- **[Discord](https://discord.gg/HxvySSu5G3)** — Orbital Foundry Mod Team
- **[Ko-fi](https://ko-fi.com/G2G61S5ZB5)** — Support development

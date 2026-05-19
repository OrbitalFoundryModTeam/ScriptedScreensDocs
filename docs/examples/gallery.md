# Example Gallery

ScriptedScreens ships with a large collection of example scripts in the `Examples/` folder. Here's a categorized overview.

## Programmable Visor HUDs

- **VisorHudLayoutDemo.lua** - Compact visor HUD showing `ss.client_overlay()`-aware placement and dynamic layout rebuilds.
- **VisorHudStopwatch.lua** - Interactive mission timer HUD with draggable visor panel behavior.
- **VisorHudSciFiTicker.lua** - Bottom-edge ticker HUD that stays clear of the vanilla suit UI.
- **VisorHudMissionDeck.lua** - Button-driven visor HUD panel with status text and mission-style interactions.
- **VisorHudPong.lua** - Playable Pong on a visor HUD using canvas drawing, `on_frame`, and keyboard/input mode.
- **VisorHudMultiPanel.lua** - Main reference example for larger visor HUDs using `surface:layout(...)`, per-panel `offset`, and `drag_group = "auto"`.
- **VisorHudBatteryMarkers.lua** - Wireless battery markers with room filtering and distance-scaled world-anchored tags (`ss.hud.mark_*`, `anchor_marker`).
- **VisorHudLookTargetMarkers.lua** - Look-at target HUD with `ss.hud.target` and a world-anchored info card.
- **VisorHudFloatingCanvas.lua** - World-anchored panel + canvas mini-graph with distance scaling.
- **UiContextProbe.lua** - Live overlay probe that draws the current `ss.client_overlay()` rectangles so you can see exactly what visor HUD space the vanilla UI is using.
- **DragDropSilo.lua** - Drag-payload/drop-target example: drag items between slots, validate the drop, and handle status events. Best reference for `drag_payload`, `drop_target`, `drop_accepts`, and drop callback patterns.
- **DragBoundsDemo.lua** - Small copyable demo showing `drag_bounds = "screen"` and `drag_bounds = "element:<id>"`.

## Tablet Cartridges (Target Detection)

- **AtmosAnalyzer.lua** — Replicates the base game's atmos cartridge. Point at pipes, tanks, or vents to see pressure, temperature, and gas composition.
- **DeviceInspector.lua** — Detailed device inspector showing logic values, slot contents, power state, power/data networks, and health.
- **EnergyNetworkTarget.lua** — Focused view of power cable network loads and battery totals.
- **WirelessTabletDemo.lua** — Wireless cartridge demo connecting to omni transmitters.

## Network Examples

- **NetChat.lua** — Peer-to-peer chat between Lua chips on the same data network.
- **NetPeerMonitor.lua** — Monitor all Lua chips on the network with ping/latency display.
- **NetAnnouncements.lua** — Broadcast announcements to all connected displays.
- **NetSensorDashboard.lua** — Station-wide sensor dashboard using **pub/sub**. Subscribes to `sensor/*` topics and renders a live multi-zone monitoring panel.
- **NetRemoteControl.lua** — Remote system control panel using **RPC**. Discovers peers, queries status via `ic.net.request`, and lets the operator toggle systems.

## Widget & Layout Demos

- **WidgetShowcase.lua** — Static showcase of every chart, table, gauge, and layout widget on a single screen.
- **LiveDashboard.lua** — Animated station monitoring dashboard that updates every tick with simulated sensor data.
- **GradientShowcase.lua** — All gradient features: 2-color, multi-stop, all four directions, and the `ss.ui.gradient()` helper.
- **ProgressSpinnerDemo.lua** — Progress bar features (`color_stops`, `indeterminate`), spinners, and gauge invert mode.
- **ZIndexDemo.lua** — Overlapping panels with `props.z_index` / `props.zIndex`: static stack, animated phase cycle, scrollview overlap (visual test for draw order).

## Control Panels

- **AccessControl.lua** — Security keypad with PIN and biometric authentication.
- **AirlockControl.lua** — Tick-driven airlock controller with auto-detect single/dual vent, safety interlocks, and error-resilient cycling.
- **FindByName.lua** — Demonstrates `ic.find()` / `ic.find_all()` for finding devices by Labeler name.
- **SolarTrackerMaxiMK2-ScriptedScreens.lua** — Solar panel tracking system with UI display.
- **PowerManager.lua** — Power grid management and monitoring.
- **PIDDashboard.lua** — PID controller dashboard with tuning.

## Media & Assets

- **ImageElement.lua** — Remote image display (PNG, JPG, animated GIF).
- **MediaPlayer.lua** — HTTP video streaming with spatial audio.
- **SoundDemo.lua** — Built-in game sounds, announcements, and remote audio.
- **PrefabIconDemo.lua** — Browse and display game item/structure icons.

## Utility

- **WallClock.lua** — Beautiful 12-hour analog+digital wall clock with AM/PM, day counter, and analog clock face.
- **SmeltingGuide.lua** — Interactive smelting recipe browser.
- **SmeltingMonitor.lua** — Live furnace monitoring dashboard.
- **ChipLibraryDashboard.lua** — Library chip module browser and loader.
- **UnicodeTest.lua** — Unicode character rendering test.

## SampleUI/ Dashboards

- **PowerGrid.lua** — Power grid monitoring
- **LifeSupport.lua** — Life support systems
- **CommsStatus.lua** — Communications status
- **AtmosphereMonitor.lua** — Atmospheric monitoring
- **AirlockStatus.lua** — Airlock status display
- **RocketMonitor.lua** / **RocketControlDemo.lua** — Rocket telemetry
- **StationOS.lua** — Multi-page station operating system

## Games

- **SnakeGame.lua** — Classic snake game with keyboard control
- **Tetris.lua** — Tetris clone
- **Doom.lua** — Doom-style raycaster demo

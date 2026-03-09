# Example Gallery

ScriptedScreens ships with a large collection of example scripts in the `Examples/` folder. Here's a categorized overview.

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

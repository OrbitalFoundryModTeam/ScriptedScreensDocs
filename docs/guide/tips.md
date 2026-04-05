# Tips & Best Practices

- **Stable element IDs** — Make element ids unique and consistent across updates
- **Batch changes** — Call `ui:commit()` once after all updates, not after each element
- **Use handles** — Prefer `ui:get(id)` + `handle:set_props/set_style` for small updates instead of rebuilding
- **Avoid clearing every frame** — Don't call `ui:clear()` every tick unless intentionally rebuilding everything
- **Multiple surfaces** — Use separate surfaces for multi-page UIs instead of hiding/showing elements
- **Nested elements** — Use `parent:element()` for containers with children (headers, panels, toolbars)
- **Throttle live updates** — Update at 2–4 Hz for dashboards to avoid excessive UI rebuilds
- **Use layout helpers** — `ss.ui.grid()`, `ss.ui.flex()`, and `ui:layout()` eliminate manual pixel math
- **Pin hints** — On motherboards/circuitboards, `ss.pin_label(0, "Label")` … `ss.pin_label(5, …)` stores short hints for **d0–d5** that appear on the built-in **config** screen (separate from `device_label` on the IC). One-arg `ss.pin_label(i)` reads the hint. Not available on tablet cartridges.

## Debugging

`print(...)` writes to the **Lua Debugger motherboard** Logs tab. Insert the debugger board into a computer, select your endpoint, and view captured logs.

If you are attached with the **StationeersLua VS Code debugger**, ScriptedScreens log output and runtime errors are also forwarded into the attached debug session.

## Troubleshooting

| Problem                  | Solution                                                   |
| ------------------------ | ---------------------------------------------------------- |
| UI not showing           | Ensure you called `ss.ui.activate("main")`                 |
| UI blank after joining a multiplayer server | Your script likely never calls `ss.ui.activate` for the surface you draw (e.g. `"main"`). Late-join sync can restore the UI **model**, but **clients only build the on-screen widgets for the active surface**, and that choice is replicated when you call `activate`. |
| Wrong screen             | Check the screen index parameter on `ss.ui.surface()`      |
| Button clicks not firing | Make sure the element is on the active surface and visible |
| Keyboard doesn't work    | Click the screen to enter **Interface Mode**               |
| Exit keyboard mode       | Press **ALT** or call `ss.exit_interface_mode()`           |

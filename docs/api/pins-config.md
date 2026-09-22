# Pins & Custom Config Surface

Motherboard / circuitboard only. Tablet cartridges, visors, and the Air Conditioner face have no pin-config screen.

## Built-in config screen (default)

With **`Features.AllowCustomConfigSurface` off** (default), entering config mode draws the built-in device-mapping UI:

- **Computer** — insert a **Configuration Disk** (not a vanilla Data Disk)
- **Console** — Activate screw on the side

That UI assigns **d0–d5** and shows optional script hints from `ss.pin_label`.

While that physical config view is up, **`ss.ui.activate(...)` does nothing** so a tick cannot kick the player back to `"main"`.

## Pin hint labels

```lua
ss.pin_label(0, "Interior temp")
ss.pin_label(1, "Vent out")
local hint = ss.pin_label(0)  -- string or nil
```

Hints are stored with the board port config (`FilterString`) and shown on the **built-in** config screen. They are independent of Labeller names and of `ic.device_label`.

## Custom config surface (opt-in)

Enable **`Features.AllowCustomConfigSurface`** on the host (BepInEx / in-game mod settings; **default off**, server-authoritative). Dedicated and listen-server config is the authority; a pure client's local toggle does nothing.

When the feature is **on**:

1. Config mode still activates the `"config"` surface (screen index 1).
2. The built-in six-pin UI is **not** drawn - the surface stays blank until your script paints it.
3. Your script assigns pins with `ss.pin` / `ss.pin_devices`.

```lua
if not ss.custom_config() then
  -- Feature off: leave the built-in UI alone
  return
end

local cfg = ss.ui.surface("config")
cfg:clear()
-- draw your own pin picker...
cfg:commit()
```

Example chip: **`Examples/CustomConfigSurface.lua`** in the ScriptedScreens mod.

### Host setting

| Setting | Default | Purpose |
| --- | --- | --- |
| `AllowCustomConfigSurface` | `false` | Allow board Lua to own `"config"` and assign pins. Off = built-in device-mapping UI. |

See [Installation - BepInEx Features settings](/guide/installation#bepinex-features-settings).

## API reference

All of these are motherboard / circuitboard only. Writes that need the feature raise a chip error naming `Features.AllowCustomConfigSurface` when it is off.

### `ss.custom_config()`

Returns `true` when this host allows a custom config surface.

### `ss.config_mode()`

Returns `true` when the physical config view is showing (Screen0 off, Screen1 on).

### `ss.config_screen()` / `ss.config_screen(registered)`

- No args: returns whether Configuration Disk / Activate still enter config mode (default `true`).
- `ss.config_screen(false)`: deregisters the screen (persisted as `|NOCFG` on the port string). Later Disk/Activate calls do nothing. If config mode is already showing, the board returns to `"main"`.
- `ss.config_screen(true)`: clears the deregister bit. If a Configuration Disk is present, enters config mode without drawing the built-in UI.

Setting `false` while the feature is off raises an error.

### `ss.pin(index)` / `ss.pin(index, refId)`

`index` is `0`–`5` (**d0–d5**).

- One arg: returns `nil` or `{ id, name, prefab }` for the assigned device.
- Two args: assigns. Pass `nil` or `0` to clear. `refId` must be in the selectable list (same devices as the built-in screen). Returns nothing on success; errors if the device is not on this computer's data network.

Assignment requires the feature on. Reads work with the feature off so scripts can branch.

```lua
local devices = ss.pin_devices()
ss.pin(0, devices[1] and devices[1].id)
local d = ss.pin(0)  -- { id = ..., name = "...", prefab = "..." } or nil
ss.pin(0, nil)       -- clear
```

### `ss.pin_devices()`

Returns the selectable device list (computer itself excluded, sorted by display name), each entry `{ id, name, prefab }`. Same set the built-in config UI uses.

### `ss.pin_label(index [, text])`

See [Pin hint labels](#pin-hint-labels). Always available on boards; does not require the custom-config feature.

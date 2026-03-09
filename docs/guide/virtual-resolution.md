# Virtual Resolution

By default, surfaces use the physical screen resolution of the in-game device (determined by the Unity RectTransform). If no screen is attached, the fallback is 256×256. Tablets automatically scale up to a minimum virtual width of 640px while preserving aspect ratio. You can override the resolution for any surface.

## Setting Resolution

```lua
local ui = ss.ui.surface("main")
ss.ui.activate("main")

-- Set a custom virtual resolution (e.g. 960×544 for 2x detail)
ui:set_resolution(960, 544)

local size = ui:size()   -- returns { w = 960, h = 544 }
```

All element positioning then uses the virtual coordinate space. The UI is scaled to fit the physical screen automatically.

## Querying Resolution

```lua
local res = ui:get_resolution()   -- returns { w, h }
```

Both `get_resolution()` and `size()` return the effective resolution (virtual if set, physical otherwise).

## Resetting

Setting resolution to `0, 0` resets to the physical screen size:

```lua
ui:set_resolution(0, 0)
```

## Limits

Max virtual width and height are configurable (default 4096px each).

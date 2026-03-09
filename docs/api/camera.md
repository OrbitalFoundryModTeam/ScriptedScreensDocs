# Camera Element (CCTV)

Display live security camera feeds on your UI. **Requires the CCTV mod** (`StructureSecurityCamera`).

```lua
-- A single camera feed from device slot 0
ui:element({
    id = "cam_main", type = "camera",
    rect = { unit = "px", x = 10, y = 10, w = 320, h = 200 },
    props = { device = "0" },
})

-- A smaller thumbnail from device slot 2
ui:element({
    id = "cam_thumb", type = "camera",
    rect = { unit = "px", x = 340, y = 10, w = 120, h = 80 },
    props = { device = "2" },
})

-- Swap which camera an element shows at runtime
local main = ui:get("cam_main")
main:set_props({ device = "3" })  -- now showing slot 3
```

| Prop | Description |
|---|---|
| `device` | Device slot index (string) — same as `ic.read` pin numbering |

Each camera element independently specifies which device slot to display. Multiple elements can reference the same slot simultaneously (e.g. a large primary view and a small thumbnail).

The C# side manages the CCTV connection lifecycle — incrementing the camera's `Connections` counter, lazily creating `RenderTextureHD`, and starting the render coroutine. Connections are cleanly released when elements are destroyed or the device changes.

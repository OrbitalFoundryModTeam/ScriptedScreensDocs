# Visor HUD Targeting & World Anchors

Visor-only APIs on **`ss.hud`** for **Programmable Visor Glasses**. Requires the visor chip on a wireless data network for marker discovery.

## Look-at target

Same concept as [Tablet Target Detection](/api/tablet-target), but raycasts from the **visor wearer**:

```lua
ss.hud.target(function(t)
    if t and t.has_target then
        print(t.display_name, t.distance)
    end
end, 0.1)  -- poll interval in seconds (minimum 0.05)

ss.hud.target(nil)  -- unsubscribe
```

- Event name: `scriptedscreens.hud.target`
- `ss.hud.target_snapshot()` returns the latest snapshot without waiting for the event
- Optional third argument `true` includes atmosphere fields on the target (like tablet)
- Snapshot includes `hud_x`, `hud_y`, `hud_visible` for debugging only — **do not** use these to position UI

## Marker rules (wireless network)

Register devices on the chip's wireless data network:

```lua
ss.hud.mark_prefabs("StructureBattery*", {
    mode = "glob",
    max_distance = 20,
    max_count = 12,
})

ss.hud.mark_names("*Battery*", { mode = "glob", max_distance = 20 })

for _, m in ipairs(ss.hud.markers()) do
    print(m.reference_id, m.distance, m.display_name)
end

ss.hud.mark_clear()
```

| `mode` | Behavior |
|--------|----------|
| `auto` | Exact match, then glob, then regex |
| `exact` | Full string match |
| `glob` | `*` and `?` wildcards |
| `regex` | .NET regex |

Each marker entry includes `reference_id`, `prefab_hash`, `display_name`, `distance`, optional `room = { id, name }`, and diagnostic `hud_x` / `hud_y` / `hud_visible`.

## Room filtering

```lua
local here = ss.hud.wearer_room()  -- { id, name } or nil

for _, m in ipairs(ss.hud.markers()) do
    if here and m.room and m.room.id == here.id then
        -- same room as wearer
    end
end
```

Look-at snapshots include `room` on the target when resolved.

## World-anchored HUD elements

The **wearer client** repositions elements tagged with `visor_anchor_*` props every frame. Server Lua supplies stats at a throttled rate (~20 Hz); layout must not depend on `hud_x` / `hud_y` from `ss.hud.markers()`.

### `ss.hud.anchor_marker(opts)`

Returns `{ panel = {...}, label = {...} }` — compact panel + label above/below a world ref:

```lua
local parts = ss.hud.anchor_marker({
    id = "b1",
    ref = battery_ref_id,
    text = "85%  12.3 m",
    w = 96, h = 16,
    place = "above",
    pad = 4,
    scale_by_distance = true,
    scale_near_m = 2,
    scale_far_m = 12,
    scale_min = 0.35,
    scale_max = 1.0,
})
hud:element(parts.panel)
hud:element(parts.label)
```

### `ss.hud.anchor(elementDef, opts)`

Stamps anchor props onto **any** element definition (panel, label, canvas, layout root, etc.):

```lua
local card = ss.hud.anchor({
    id = "card",
    type = "panel",
    rect = { unit = "px", x = 0, y = 0, w = 132, h = 52 },
    style = { bg = "#000000c8" },
}, {
    ref = battery_ref_id,
    w = 132, h = 52,
    place = "above",
    pad = 6,
    scale_by_distance = true,
    scale_near_m = 2,
    scale_far_m = 12,
})
hud:element(card)
```

### `ss.hud.anchor_props(opts)`

Returns a props table to merge into your own `hud:element({ ... })`.

### Placement

| `place` | Effect |
|---------|--------|
| `above` | Anchor above world point (default) |
| `below` | Anchor below |
| `pad` | Pixel gap from anchor point |

`ss.hud.set_anchor_smooth(tau)` adjusts follow smoothing (default ~0.028 s).

## Distance scaling

Optional on anchors and `anchor_marker`:

| Field | Meaning |
|-------|---------|
| `scale_by_distance` | Enable scaling |
| `scale_near_m` | Full size at/inside this distance (default 3 m) |
| `scale_far_m` | Minimum size at/beyond this distance (default 25 m) |
| `scale_min` / `scale_max` | Multipliers at far / near (defaults 0.45 / 1.0) |

Closer = larger, farther = smaller. Updates every frame on the wearer client without rebuilding the Lua UI tree. Panel roots use `localScale`; labels adjust `fontSize`.

```lua
local mult = ss.hud.distance_scale(distance_m, {
    scale_near_m = 2,
    scale_far_m = 12,
    scale_min = 0.35,
    scale_max = 1.0,
})
```

## Examples

- **VisorHudBatteryMarkers.lua** — wireless battery markers, room filter, distance-scaled tags
- **VisorHudLookTargetMarkers.lua** — look-at target card with anchor
- **VisorHudFloatingCanvas.lua** — anchored panel + canvas mini-graph

Tune `MAX_DISPLAY_DISTANCE_M` and `SCALE_*` constants at the top of each sample.

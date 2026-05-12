# Programmable Visor HUDs

`ScriptedScreens` visor scripts use **`ss.hud`** instead of `ss.ui`. The API is intentionally familiar - you still create surfaces, elements, layouts, canvases, and input handlers - but the output is a wearer-tied HUD overlay instead of a world-space console or tablet screen.

## When to use `ss.hud`

Use **`ss.hud`** when your Lua chip is installed in **Programmable Visor Glasses**:

```lua
local hud = ss.hud.surface("main")
ss.hud.activate("main")
```

Use **`ss.ui`** for consoles and tablets. If a script is meant only for visor glasses, build it around `ss.hud` from the start.

## How visor HUDs behave

- The chip only executes while the visor is **powered, worn, and in the glasses slot**.
- The HUD renders as a **screen-space overlay** tied to the current wearer.
- The same surface helpers still apply: `surface:element`, `surface:layout`, `surface:on_frame`, canvas helpers, `poll_input`, and `surface:commit()`.
- Inventory windows stay above the visor HUD so they remain clickable.

## Minimal visor script

```lua
local hud = ss.hud.surface("main")
ss.hud.activate("main")

local size = hud:size()
local W, H = size.w, size.h

hud:clear()
hud:element({
    id = "title",
    type = "label",
    rect = { unit = "px", x = 16, y = 16, w = 260, h = 24 },
    props = { text = "VISOR ONLINE" },
    style = { font_size = 18, color = "#22C55E" },
})
hud:commit()
```

## Avoiding the vanilla HUD

Visor HUDs should usually avoid the stock hands strip, vitals, inventory windows, and temporary popups. The main tool for that is **`ss.client_overlay()`**.

### `ss.hud.safe_area([pad])`

Returns `{ x, y, w, h, pad, ok }` - a canvas-space rect that already clears every edge-touching vanilla panel (hands strip, suit status, open inventory windows, Stationpedia, etc.) plus an optional inset. Use it directly as your panel's position and size:

```lua
local function rebuild()
    local sz   = hud:size()
    local W, H = sz.w, sz.h
    local safe = ss.hud.safe_area()   -- {x, y, w, h} in visor canvas pixels
    local x = (safe and tonumber(safe.x)) or 0
    local y = (safe and tonumber(safe.y)) or 0
    local w = (safe and tonumber(safe.w)) or W

    hud:clear()
    hud:layout({
        id = "panel", type = "panel",
        layout = "column",
        rect = { unit = "px", x = x, y = y, w = w, h = 120 },
        gap = 4, padding = 8,
        children = {
            { id = "title", type = "label", rect = { h = 24 },
              props = { text = "STATION STATUS" },
              style = { font_size = 16, color = "#22C55E" } },
        },
    })
    hud:commit()
end
```

The pad defaults to 8 px. Set it once at startup with **`ss.hud.set_safe_padding(n)`** so every later `safe_area()` call uses your value automatically:

```lua
ss.hud.set_safe_padding(16)   -- override default 8 px
```

### `ss.hud.first_free_anchor(anchors, w, h)`

Picks the first anchor from a list that does not collide with any current vanilla panel. Falls back to the first entry if all conflict. Returns `{ x, y, w, h, anchor }` or `nil`:

```lua
local PANEL_W, PANEL_H = 240, 160

local function base_xy()
    local p = ss.hud.first_free_anchor(
        { "top_left", "top_right", "bottom_left", "bottom_right" },
        PANEL_W, PANEL_H)
    if not p then return 0, 0 end
    return tonumber(p.x) or 0, tonumber(p.y) or 0
end
```

Valid anchor names: `"top_left"`, `"top_right"`, `"bottom_left"`, `"bottom_right"`, `"center"`. Use this when `safe_area()` is too conservative and you want to try specific screen corners first.

### `ss.hud.intersects_vanilla(x, y, w, h)`

Returns `true` if a proposed rect overlaps any current vanilla panel. Useful when you have a fixed position and just want to know if it needs to move:

```lua
local x, y, w, h = 20, 20, 300, 100
if ss.hud.intersects_vanilla(x, y, w, h) then
    -- fall back: place below the safe area instead
    local safe = ss.hud.safe_area()
    y = (safe and (tonumber(safe.y) + tonumber(safe.h) - h)) or y
end
```

### `ss.client_overlay_version()`

Returns a monotonic int that bumps only when the overlay snapshot actually changes (panel rects, modal flags, canvas dimensions). Compare it against a stored value to skip rebuilds on frames where nothing moved:

```lua
local last_v = -1

hud:on_frame(function()
    local v = ss.client_overlay_version()
    if v ~= last_v then
        last_v = v
        rebuild()
    end
end)
```

This replaces the old pattern of hashing 5-11 overlay fields every frame. One int compare is cheap enough to run every `on_frame`.

If you want to inspect every overlay rect visually, use **`Examples/UiContextProbe.lua`** - it draws them color-coded by `kind` in the exact coordinate space your scripts use.

### Raw overlay table fields

`ss.client_overlay()` always returns a table (never `nil`) so you do not have to guard against nil. Key fields:

| Field | Description |
| ----- | ----------- |
| `ok` | `true` if a real snapshot is available; `false` if the overlay is not ready yet |
| `reason` | String explaining why `ok = false` (e.g. `"no_remote_client_overlay"`) |
| `source` | `"local"` (this process is the wearer) or `"remote_client"` (relayed from wearer in multiplayer / on a dedicated server) |
| `panels` | Array of rects, each with `x`, `y`, `w`, `h`, `kind`, and optional `title` |
| `kind` | Panel category: `"hands"`, `"clothing"`, `"vitals"`, `"inventory_window"`, `"chrome"`, `"system_modal"`, `"panel"` |
| `canvas_w`, `canvas_h` | Visor canvas dimensions (same as `hud:size()`) |
| `screen_w`, `screen_h` | Wearer's physical screen resolution |
| `relay_age_s` | Seconds since the snapshot was relayed (0 for local) |
| `relay_stale` | `true` if `relay_age_s > 5` |
| `version` | Monotonic int - compare with `ss.client_overlay_version()` to skip rebuilds when nothing changed |

All panel rects are in **visor canvas coordinates** (top-left origin, Y increases downward) - the same space as your `hud:element` rects. No scaling math needed.

## Trust `hud:size()`

For visor scripts, **`hud:size()`** is the right coordinate space to use. It reflects the wearer's actual visor canvas, including non-16:9 layouts such as ultrawide or 16:10.

Do **not** hardcode `1920x1080`, and do not clamp the result upward. On dedicated servers, the wearer client relays the real visor canvas size back to the host so server-side Lua still lays out the HUD in the same space the wearer sees.

## Dragging visor panels

Draggable visor HUDs use the same drag system as normal ScriptedScreens surfaces:

```lua
props = {
    draggable = "true",
    drag_group = "auto",
    drag_bounds = "screen",
    drag_dispatch_id = "deck",
}
```

- **`drag_group = "auto"`** is the easiest way to move a whole layout subtree together.
- **`drag_bounds = "screen"`** is the usual visor choice when you want the panel to stop at the visible edge during the drag.
- If you omit `drag_bounds`, drag stays raw and unclamped.
- Keep your own saved `lay_dx` / `lay_dy` clamp in rebuild code as a safety net for stale saves or changed aspect ratios.

The basic pattern - accumulate drag offsets in `poll_input`, clamp them, then use them in `rebuild`:

```lua
local lay_dx, lay_dy = 0, 0

local function rebuild()
    local base_x, base_y = ... -- from safe_area or first_free_anchor

    -- clamp so the panel cannot be dragged fully off-screen
    local sz = hud:size()
    lay_dx = math.max(-base_x, math.min(sz.w - PANEL_W - base_x, lay_dx))
    lay_dy = math.max(-base_y, math.min(sz.h - PANEL_H - base_y, lay_dy))

    hud:clear()
    hud:layout({
        id = "panel", type = "panel",
        layout = "column",
        rect = { unit = "px", x = base_x + lay_dx, y = base_y + lay_dy,
                 w = PANEL_W, h = PANEL_H },
        props = {
            draggable = "true",
            drag_group = "auto",
            drag_bounds = "screen",
            drag_dispatch_id = "panel",
        },
        children = { ... },
    })
    hud:commit()
end

hud:on_frame(function()
    -- accumulate drag deltas from poll_input
    for _, ev in ipairs(hud:poll_input() or {}) do
        if ev.event == "drag_end" and ev.id == "panel" then
            local dx, dy = ev.value:match("([^&]+)&([^&]+)")
            lay_dx = lay_dx + (tonumber(dx) or 0)
            lay_dy = lay_dy + (tonumber(dy) or 0)
            rebuild()
        end
    end
end)
```

See **`Examples/VisorHudStopwatch.lua`**, **`VisorHudMissionDeck.lua`**, and **`VisorHudMultiPanel.lua`** for complete working versions of this pattern.

## Visor lens tint

Programmable visors also expose visor-only lens tint control through **`ss.hud.lens_color()`**:

```lua
local current = ss.hud.lens_color()   -- e.g. "green"
ss.hud.lens_color("purple")
```

You can set the tint by color name or numeric index. This controls the visor lens tint itself, not the HUD widget colors.

## `on_frame` and canvas HUDs

Visor HUDs are a good fit for `surface:on_frame(...)` when you want smooth animation or canvas mini-games.

The important rule is simple: if an `on_frame` callback redraws a canvas, still call **`surface:commit()` every frame** after your draw work. Without the commit, remote clients can see a static or empty canvas even though your local script kept drawing.

**`Examples/VisorHudPong.lua`** is the main reference here.

## Recommended visor examples

- **`VisorHudStopwatch.lua`** - simple draggable timer HUD
- **`VisorHudSciFiTicker.lua`** - bottom-edge ticker that stays clear of vanilla HUD space
- **`VisorHudMissionDeck.lua`** - button-driven visor panel
- **`VisorHudLayoutDemo.lua`** - overlay-aware placement and rebuild patterns
- **`VisorHudMultiPanel.lua`** - larger multi-panel HUD using `surface:layout(...)`, `offset`, and `drag_group = "auto"`
- **`VisorHudPong.lua`** - `on_frame`, canvas, and interface-mode example
- **`UiContextProbe.lua`** - live visor overlay diagnostic for `ss.client_overlay()`

## Next Steps

- **[Getting Started](/guide/getting-started)** - initial ScriptedScreens setup
- **[Surfaces & Views](/guide/surfaces)** - shared surface concepts used by both `ss.ui` and `ss.hud`
- **[Input & Events](/guide/input-events)** - clicks, drag events, and interface mode
- **[Nested Layout](/api/nested-layout)** - declarative layout for multi-panel visor HUDs
- **[Example Gallery](/examples/gallery)** - overview of the bundled sample scripts

# Programmable Visor HUDs

`ScriptedScreens` visor scripts use **`ss.hud`** instead of `ss.ui`. The API is intentionally familiar - you still create surfaces, elements, layouts, canvases, and input handlers - but the output is a wearer-tied HUD overlay instead of a world-space console or tablet screen.

::: tip Credits
Thanks to **WIKUS** for the visor model used by the Programmable Visor in-game.
:::

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

### `ss.hud.on_overlay_change(fn)`

Registers a callback that fires when the vanilla overlay snapshot actually changes (panel rects, modal flags, canvas dimensions). Use it to rebuild layout without a polling loop:

```lua
ss.hud.on_overlay_change(function()
    rebuild()
end)
```

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

All panel rects are in **visor canvas coordinates** (top-left origin, Y increases downward) - the same space as your `hud:element` rects. No scaling math needed.

## Trust `hud:size()`

For visor scripts, **`hud:size()`** is the right coordinate space to use. It reflects the wearer's actual visor canvas, including non-16:9 layouts such as ultrawide or 16:10.

Do **not** hardcode `1920x1080`, and do not clamp the result upward. On dedicated servers, the wearer client relays the real visor canvas size back to the host so server-side Lua still lays out the HUD in the same space the wearer sees.

## Dragging visor panels

Three props on the panel define a draggable HUD:

- **`draggable = "true"`** - this panel receives pointer drags.
- **`drag_group = "auto"`** - moves every descendant of this layout subtree along with the panel. Omit it if you only want the panel itself to move.
- **`drag_bounds = "screen"`** - clamps the live drag so the panel cannot leave the visor canvas. Omit it for raw unclamped drag.

By default, grabbing a draggable panel also raises it above overlapping siblings (`drag_to_front`, on by default). Set **`drag_to_front = "false"`** on the leader panel if you manage **`z_index`** yourself.

For **PAN suit vitals** (no wireless link), see **`Examples/VisorHudSuitPan.lua`** in the mod folder.

The runtime stores the cumulative offset for each draggable element. Read it back with **`hud:drag_offset(id)`** during `rebuild()`, then re-run `rebuild()` from a single callback when the offset changes:

```lua
local PANEL_W, PANEL_H = 240, 96
local BASE_X, BASE_Y = 24, 24

local function rebuild()
    local off = hud:drag_offset("panel")
    hud:clear()
    hud:layout({
        id = "panel", type = "panel",
        rect = {
            unit = "px",
            x = BASE_X + off.dx,
            y = BASE_Y + off.dy,
            w = PANEL_W, h = PANEL_H,
        },
        props = {
            draggable = "true",
            drag_group = "auto",
            drag_bounds = "screen",
        },
        children = { --[[ your widgets ]] },
    })
    hud:commit()
end

hud:on_move(rebuild)   -- fires on drag-end AND overlay change (replaces the two calls below)
-- hud:on_drag(rebuild)              -- (individual alternative)
-- ss.hud.on_overlay_change(rebuild) -- (individual alternative)
rebuild()
```

**`hud:on_move(fn)`** is the preferred single-call registration for visor HUDs. It registers the same callback for both drag-end and overlay changes. On board/cartridge surfaces it is identical to `hud:on_drag(fn)`. Pass `nil` to unregister both.

**Skipping rebuilds during drag.** If your `tick()` calls `rebuild()` on a timer, the panel will snap back to its committed position every tick while the user is still holding the mouse - because `drag_offset` only updates on `drag_end`. Guard it:

```lua
function tick(dt)
  refresh_elapsed = refresh_elapsed + dt
  if refresh_elapsed < REFRESH_S then return end
  refresh_elapsed = 0
  if not hud:is_dragging() then  -- skip while panel is held
    rebuild()
  end
end
```

`hud:is_dragging()` returns `true` for any panel on the surface. `hud:is_dragging("deck")` tests a specific element. The flag is set in `OnBeginDrag` and cleared before `on_drag` fires, so your `on_drag` rebuild callback always sees `false`.

**Persisting position across saves.** Use StationeersLua **`ic.persist`** (hydrated before init; survives housing power cycles):

```lua
local PERSIST_KEY = "layout"

local function persist_save_layout()
    local off = hud:drag_offset("panel")
    local ok, raw = pcall(util.json.encode, { dx = off.dx, dy = off.dy })
    if ok and raw then ic.persist.set(PERSIST_KEY, raw) end
end

local function persist_restore_layout()
    if not ic.persist.has(PERSIST_KEY) then return end
    local raw = ic.persist.get(PERSIST_KEY)
    if type(raw) ~= "string" then return end
    local ok, t = pcall(util.json.decode, raw)
    if ok and type(t) == "table" then
        hud:set_drag_offset("panel", tonumber(t.dx) or 0, tonumber(t.dy) or 0)
    end
end

persist_restore_layout()
hud:on_drag(function()
    rebuild()
    persist_save_layout()
end)
```

See **`Examples/VisorHudStopwatch.lua`**, **`VisorHudMissionDeck.lua`**, and **`VisorHudMultiPanel.lua`** for complete working versions of this pattern.

## Multiplayer

Visor HUD logic runs on the **server**. The **wearer's** client sends look-at target updates, marker screen positions, and optional vanilla UI overlay snapshots (`ss.client_overlay()`). The server drives `ss.hud.target` and marker callbacks from that data.

**Tablet cartridges** use the same pattern: `ss.tablet.target` and UI clicks are handled on the server from the client that **holds** the tablet, not from other players.

## World targeting and anchored markers

Visor-only APIs on `ss.hud` (full reference: [Visor HUD Targeting & World Anchors](/api/visor-hud-target)):

- **`ss.hud.target(callback, interval)`** — look-at raycast from the wearer (like tablet target)
- **`ss.hud.mark_names` / `mark_prefabs` / `mark_clear` / `markers()`** — devices on the wireless data network
- **`ss.hud.wearer_room()`** — room the wearer stands in; filter markers with `m.room.id`
- **`ss.hud.anchor` / `anchor_marker` / `anchor_props`** — world-anchored panels, labels, canvas, or trees; the wearer client projects them every frame
- **Distance scaling** — `scale_by_distance`, `scale_near_m`, `scale_far_m`, `scale_min`, `scale_max`; closer = larger, farther = smaller without Lua rebuild

Examples: **VisorHudBatteryMarkers.lua**, **VisorHudLookTargetMarkers.lua**, **VisorHudFloatingCanvas.lua** (tune `MAX_DISPLAY_DISTANCE_M` and `SCALE_*` at the top).

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
- **`VisorHudBatteryMarkers.lua`** - wireless battery markers, room filter, distance-scaled tags
- **`VisorHudLookTargetMarkers.lua`** - look-at target card with world anchor
- **`VisorHudFloatingCanvas.lua`** - anchored panel + canvas mini-graph
- **`UiContextProbe.lua`** - live visor overlay diagnostic for `ss.client_overlay()`

## Next Steps

- **[Getting Started](/guide/getting-started)** - initial ScriptedScreens setup
- **[Surfaces & Views](/guide/surfaces)** - shared surface concepts used by both `ss.ui` and `ss.hud`
- **[Input & Events](/guide/input-events)** - clicks, drag events, and interface mode
- **[Nested Layout](/api/nested-layout)** - declarative layout for multi-panel visor HUDs
- **[Visor HUD Targeting & World Anchors](/api/visor-hud-target)** - markers, look-at, anchors, distance scaling
- **[Example Gallery](/examples/gallery)** - overview of the bundled sample scripts

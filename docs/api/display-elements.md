# Display Elements

## Draw order (`z_index`)

All element types can use **`z_index`** or **`zIndex`** on **`props` only** to control **stacking among siblings** (widgets that share the same parent in the UI tree: surface root, a nested container’s children, or scroll view **content**). Visual styling stays in `style`; draw order is always a prop so authors are not split between two tables.

| Rule | Detail |
|------|--------|
| Larger value | Drawn **in front** of smaller values |
| Key name | `z_index` or `zIndex` (either form on **`props`**) |
| Same `z_index` | Order follows **sibling index** after the batch (upsert / append order; pre–`z_index` behavior) |
| Scope | **Per parent only** — z on a child does not reorder against cousins under another parent |

Order is applied after each UI sync batch (e.g. after `ui:commit()` or tick-driven updates). Overlapping labels and panels both participate.

For a full explanation and nested examples, see [Elements — Draw order](/guide/elements#draw-order). Shipped regression demo: **`Examples/ZIndexDemo.lua`**.

## `label`

Text display. Supports TMP rich text tags (`<b>`, `<color>`, etc.).

```lua
ui:element({
    id = "title", type = "label",
    rect = { unit = "px", x = 20, y = 10, w = 200, h = 30 },
    props = { text = "Hello World" },
    style = { font_size = 18, color = "#FFFFFF", align = "left" }
})
```

| Prop | Description |
|---|---|
| `text` | Text content (supports TMP rich text) |

| Style | Description |
|---|---|
| `font_size` | Font size (default 16) |
| `color` | Text color |
| `align` | `"left"`, `"center"`, `"right"` |

## `panel`

Background rectangle. By default the panel image does **not** receive pointer hits (clicks pass through to widgets behind). Optional **draggable** mode turns on hit-testing on the panel so you can drag a HUD cluster or reposition a chrome region (works on **motherboard** `ss.ui`, **tablet cartridge** `ss.ui`, and **visor** `ss.hud` — same props everywhere).

```lua
ui:element({
    id = "bg", type = "panel",
    rect = { unit = "px", x = 0, y = 0, w = 480, h = 272 },
    style = { bg = "#0F172A" }
})
```

| Style | Description |
|---|---|
| `bg` | Background color |
| `gradient` | End color for gradient (start = `bg`), array of colors, or array of `{position, color}` pairs |
| `gradient_dir` | `"horizontal"`, `"vertical"` (default), `"diagonal"`, `"radial"` |

### Draggable panels

Set **`props.draggable`** to `"true"` or `"1"` on a **`type = "panel"`** element. While dragging, every listed **`drag_group`** widget moves together; on **pointer release**, their rectangles are written back to the authoritative UI model and synced like any other layout change.

| Prop | Description |
|---|---|
| `draggable` | `"true"` / `"1"` — panel receives pointer drag; raise **`z_index`** on buttons, `interface_button`, and other controls **above** this panel so they stay clickable. |
| `drag_group` | Comma- or semicolon-separated **element ids** on the **same surface** that move with this drag (default: this panel’s id only). Every id in the group must use **`rect.unit = "px"`** (same flat sibling layout under the surface root). |
| `drag_dispatch_id` | Optional. Element id used for **`drag_begin`** / **`drag_end`** in `surface:poll_input()` and for the tick event-bus names (default: this panel’s **`id`**). |

**Lua / `poll_input`:** on a valid drag start, **`event = "drag_begin"`**, **`id`** = dispatch id, **`value`** = `"<x>&<y>"` — **leader** (first in `drag_group`) top-left in **surface pixels** at grab time (script space, Y down). When the drag finishes, **`event = "drag_end"`**, same **`id`**, **`value`** = `"<dx>&<dy>"` — this gesture’s **delta** in surface pixels (not cumulative across past drags). If your script calls `clear()` and rebuilds absolute rects from formulas, add the **`drag_end`** delta to your base position so the next rebuild matches where the user dropped the cluster. See [Input & events — Frame-aligned input](/guide/input-events#frame-aligned-input-on-frame) and example **`Examples/VisorHudPong.lua`**.

**Multiplayer:** `drag_begin` / `drag_end` use the same serialized UI-input path as clicks (`DispatchUiInput` → host). The host applies **`drag_end`** deltas to the authoritative model and flushes; pure clients mirror live **`RectTransform`** positions into the local element dictionary (no pending ops) so **`ApplyRect`** does not snap the group back before the next sync.

**`set_props` / `set_style` during drag:** property-only handle updates merge from the model; the engine refreshes the snapshot **rect** from the live `RectTransform` for **pixel** elements so mid-drag text/style updates (e.g. a score label) do not snap widgets back to stale coordinates. While a **`drag_group`** pointer drag is active, **`ApplyRect`** is skipped for those live `RectTransform`s so a concurrent flush cannot reset mid-drag positions.

### Drag payload & drop targets (uGUI drag-and-drop)

Separate from **panel reposition** drags: you can mark **`panel`**, **`button`**, or **`icon`** elements as **payload sources** and other **`panel` / `button` / `icon`** elements as **drop zones** (Unity `IDropHandler`). Use this for “drag this ingot thumbnail into that silo slot” style UX. While dragging, the engine spawns a **semi-opaque duplicate of the source graphic** (sprite or `RawImage` texture) parented to the same canvas so it **follows the pointer**; the source slot dims until release. Example: **`Examples/DragDropSilo.lua`** (full-surface **`ss.ui`** demo with per-silo “last accepted” icons).

| Prop | Elements | Description |
|---|---|---|
| `drag_source` | `panel`, `button`, `icon` | `"true"` / `"1"` — this widget starts a **payload** drag (not `drag_group` movement). Requires **`drag_payload`**. Mutually exclusive with **`draggable`** on the **same** `panel`: if both are set, **`drag_source`** wins (no `ScriptedScreensUiDragGroup` on that element). |
| `drag_payload` | (with `drag_source`) | Non-empty string token carried to the drop handler (e.g. prefab name `ItemSteelIngot`). Avoid `&` in the token; **`drop`** **`value`** uses `&` as delimiter. |
| `drop_target` | `panel`, `button`, `icon` | `"true"` / `"1"` — accepts drops from the same chip + surface. The panel/image must receive raycasts (`drop_target` forces hit-testing on `panel` when it would otherwise be transparent to hits). |
| `drop_accepts` | (with `drop_target`) | Optional whitelist of allowed **`drag_payload`** values (case-insensitive). Prefer a Lua array of strings, e.g. `{ "ItemSteelIngot", "ItemGoldIngot" }`. Legacy: a single comma/semicolon-separated string is still parsed. Omit or leave empty to accept any non-empty payload. |
| `drop_dispatch_id` | (with `drop_target`) | Optional. **`poll_input`** **`ev.id`** for successful **`drop`** events (defaults to the drop zone element’s **`id`**). |

**`poll_input`:** **`drop`** — **`id`** = **`drop_dispatch_id`** or drop zone **`id`**; **`value`** = `"<payload>&<source_element_id>&<target_element_id>"`. Optional: **`drag_payload_begin`** / **`drag_payload_cancel`** on the **source** element **`id`** ( **`value`** = payload; cancel fires if the pointer released without a valid drop).

**Multiplayer:** `drag_payload_begin`, `drag_payload_cancel`, and **`drop`** are sent over the same UI-input channel. The host re-validates each **`drop`** (source **`drag_payload`**, target **`drop_accepts`**, ids) before **`DispatchInputEvent`** so clients cannot forge drops.

## `progress`

Progress bar with filled portion. Supports color stops, indeterminate mode, and configurable fill direction (horizontal or vertical).

```lua
-- Basic progress bar
ui:element({
    id = "hp", type = "progress",
    rect = { unit = "px", x = 10, y = 10, w = 200, h = 20 },
    props = { value = 75, min = 0, max = 100 },
    style = { bg = "#1E293B", fill = "#22C55E" },
})

-- With color stops (fill changes color based on value)
ui:element({
    id = "temp", type = "progress",
    rect = { unit = "px", x = 10, y = 40, w = 200, h = 20 },
    props = { value = 0.7 },
    style = {
        bg = "#1E293B",
        fill = "#22C55E",
        color_stops = {
            { 0.5, "#EAB308" },    -- yellow from 50%
            { 0.8, "#EF4444" },    -- red from 80%
        },
    },
})

-- Indeterminate (animated sliding bar)
ui:element({
    id = "loading", type = "progress",
    rect = { unit = "px", x = 10, y = 70, w = 200, h = 8 },
    props = { indeterminate = true },
    style = { bg = "#1E293B", fill = "#38BDF8" },
})

-- Vertical progress bar (bottom to top)
ui:element({
    id = "fuel_level", type = "progress",
    rect = { unit = "px", x = 10, y = 100, w = 30, h = 120 },
    props = { value = 60, min = 0, max = 100, direction = ss.direction.BottomToTop },
    style = { bg = "#1E293B", fill = "#38BDF8" },
})

-- Right-to-left progress bar
ui:element({
    id = "rtl_bar", type = "progress",
    rect = { unit = "px", x = 50, y = 100, w = 200, h = 20 },
    props = { value = 0.4, direction = ss.direction.RightToLeft },
    style = { bg = "#1E293B", fill = "#EAB308" },
})
```

| Prop | Description |
|---|---|
| `value` | Current value (ignored in indeterminate mode) |
| `min` | Minimum value (default 0) |
| `max` | Maximum value (default 1) |
| `indeterminate` | If true, shows animated sliding fill |
| `direction` | Fill direction: `ss.direction.LeftToRight` (default), `ss.direction.RightToLeft`, `ss.direction.TopToBottom`, `ss.direction.BottomToTop`. Raw strings `"ltr"`, `"rtl"`, `"ttb"`, `"btt"` also accepted. Works with both determinate and indeterminate modes. |

| Style | Description |
|---|---|
| `bg` | Track background color |
| `fill` | Base fill color |
| `color_stops` | Array of `{ fraction, "#color" }` — fill color changes at thresholds |
| `speed` | Animation speed for indeterminate mode (default 1.2) |

## `divider`

Horizontal or vertical separator line.

```lua
ui:element({
    id = "sep", type = "divider",
    rect = { unit = "px", x = 10, y = 50, w = 460, h = 1 },
    style = { color = "#334155" }
})
```

| Style | Description |
|---|---|
| `color` | Divider color (default gray) |

# Canvas Drawing

A **canvas** element gives you a pixel buffer for direct drawing — useful for graphs, games, or custom visualizations.

## Creating a Canvas

```lua
ui:element({
    id = "my_canvas", type = "canvas",
    rect = { unit = "px", x = 10, y = 10, w = 160, h = 120 }
})
```

## Drawing Functions

Colors can be **hex strings** (`"#RRGGBB"` / `"#RRGGBBAA"`), **CSS-style** (`"rgb(r,g,b)"` / `"rgba(r,g,b,a)"`), or **numeric** (`r, g, b [, a]`). Always call `canvas_apply` when done.

```lua
-- Basic drawing
ui:canvas_clear("my_canvas", "#000000")
ui:canvas_pixel("my_canvas", 10, 10, "#FF0000")
ui:canvas_hline("my_canvas", 50, 0, 159, "#333333")
ui:canvas_vline("my_canvas", 80, 0, 119, "#333333")
ui:canvas_line("my_canvas", 0, 0, 159, 119, "#FFFFFF", 2)

-- Shapes
ui:canvas_rect("my_canvas", 20, 20, 40, 30, "#00FF00")
ui:canvas_rect_outline("my_canvas", 20, 20, 40, 30, "#FFFF00")
ui:canvas_circle("my_canvas", 80, 60, 30, "#00AAFF")
ui:canvas_fill_circle("my_canvas", 80, 60, 15, "#0066CC")
ui:canvas_fill_triangle("my_canvas", 80, 10, 60, 50, 100, 50, "#FF6600")

-- Multi-point & arcs
ui:canvas_polyline("my_canvas", {10,10, 50,30, 90,10, 130,30}, "#FFFFFF")
ui:canvas_arc("my_canvas", 80, 60, 40, 0, 90, "#FF00FF")

ui:canvas_apply("my_canvas")  -- Commit to screen
```

## Function Reference

| Function               | Arguments                                                |
| ---------------------- | -------------------------------------------------------- |
| `canvas_clear`         | `(id, color)`                                            |
| `canvas_pixel`         | `(id, x, y, color)`                                      |
| `canvas_hline`         | `(id, y, x1, x2, color)`                                 |
| `canvas_vline`         | `(id, x, y1, y2, color)`                                 |
| `canvas_line`          | `(id, x0, y0, x1, y1, color [, thickness])`              |
| `canvas_rect`          | `(id, x, y, w, h, color)`                                |
| `canvas_rect_outline`  | `(id, x, y, w, h, color [, thickness])`                  |
| `canvas_circle`        | `(id, cx, cy, r, color [, thickness])`                   |
| `canvas_fill_circle`   | `(id, cx, cy, r, color)`                                 |
| `canvas_fill_triangle` | `(id, x0, y0, x1, y1, x2, y2, color)`                    |
| `canvas_polyline`      | `(id, {x,y,...}, color [, thickness])`                   |
| `canvas_arc`           | `(id, cx, cy, r, startDeg, endDeg, color [, thickness])` |
| `canvas_apply`         | `(id)`                                                   |
| `canvas_begin_update`  | `(id)` — start a grouped paint (multiplayer)             |
| `canvas_end_update`    | `(id)` — end grouped paint                               |
| `canvas_with_update`   | `(id, function)` — run callback between begin/end (sync) |

## Multiplayer sync

With **command replication** enabled (default in BepInEx `ScriptedScreens.cfg`, section **Multiplayer**, `CanvasCommandReplication`), the server records draw **operations** and sends them to nearby clients. Clients **replay** the same ops into a local pixel buffer, then update the GPU texture. You still call `canvas_apply(id)` as usual; sync happens when the UI flush runs on the server.

### Update groups (one logical frame → one network batch)

Without grouping, each primitive can become its **own** pending batch. For animations and multi-step paints, wrap the draw calls so the server can pack them into **one** batch when op/byte limits allow:

```lua
ui:canvas_begin_update("my_canvas")
ui:canvas_clear("my_canvas", "#000022")
ui:canvas_fill_circle("my_canvas", 40, 40, 10, "#FF0000")
ui:canvas_end_update("my_canvas")
ui:canvas_apply("my_canvas")
```

Or use a single synchronous callback (must not yield):

```lua
ui:canvas_with_update("my_canvas", function()
  ui:canvas_clear("my_canvas", "#000022")
  ui:canvas_fill_circle("my_canvas", 40, 40, 10, "#FF0000")
end)
ui:canvas_apply("my_canvas")
```

Open groups are **auto-closed** before the server flush if you forget `canvas_end_update`, but prefer matching begin/end explicitly. Very large groups may be sent as a **full RGBA snapshot** or **split** (see mod config `CanvasDenseFrameOpThreshold`, `CanvasDenseFrameSnapshotMaxPixels`, `CanvasCommandMaxOpsPerBatch`).

### Server send rate (backlog vs single frame)

`CanvasCommandMinSyncAutoTune` / `CanvasCommandMinSyncInterval` limit how often the server sends **when multiple groups are queued**. When there is **exactly one** pending group and it contains **more than one** op (typical `begin`/`end` frame), that flush **skips** the min-sync delay so one grouped animation frame is not throttled like a backlog.

### Client display: coalescing vs every batch

By default, the **game client** may **merge** several received canvas batches that finish in the same Unity frame into **one** GPU texture upload (fewer `SetPixels32` calls). Intermediate batches might not appear on screen even though they were received.

To show **every** received batch as its own GPU update (smoother motion when the server sends rapid batches, at higher GPU cost), set on the **client** machine:

`CanvasRemoteEveryBatchGpuUpload = true` (same **Multiplayer** section).

### Dedicated server and Lua

Lua runs on the **server** process. `canvas_begin_update` and other surface APIs come from the **server’s** `ScriptedScreens.dll`.

### Legacy pixel sync

If `CanvasCommandReplication` is **false**, canvases may use XOR-style pixel diffs instead of command batches. Grouping still helps server-side batching where applicable; client coalescing applies to texture updates in both paths.

::: warning
Always call `canvas_apply(id)` after drawing. Drawing operations are buffered and only rendered when applied.
:::

# Input & Events

## Element Events

Events are set directly on the element definition:

```lua
ui:element({
    id = "btn", type = "button",
    rect = { unit = "px", x = 10, y = 10, w = 100, h = 30 },
    props = { text = "Click" },
    on_click = function(playerName)
        print("Clicked by " .. playerName)
    end
})
```

### Event Types

| Event | Elements | Callback Args |
|---|---|---|
| `on_click` | button, checkbox, toggle, table | `(playerName)` or `(value, playerName)` |
| `on_change` | slider, select, textinput, table | `(value, playerName)` |
| `on_toggle` | checkbox, toggle, **select** | Checkbox/toggle: `(playerName)` or `(isChecked, playerName)`. **select:** optional `(playerName)` when you use legacy manual `open` state — omit for default client-managed dropdowns (see [inputs → select](../api/inputs.md#select)) |

## Dynamic Handler Registration

```lua
local btn = ui:get("btn")

btn:on("click", function(playerName)
    print("clicked", playerName)
end)

btn:off("click")       -- Unregister
btn:on("click", nil)   -- Also unregisters
```

## Keyboard Input (Interface Mode)

Keyboard events are surface-level and only work in **Interface Mode** (click the screen or use an `interface_button`):

```lua
ui:on_keydown(function(key)
    if key == "Escape" or key == "LeftAlt" then
        ss.exit_interface_mode()
    end
    print("Key down: " .. key)
end)

ui:on_keyup(function(key)
    print("Key up: " .. key)
end)

-- Unregister
ui:on_keydown(nil)
ui:on_keyup(nil)
```

### Interface Mode Control

```lua
if ss.is_interface_mode() then
    -- Currently capturing keyboard input
end

ss.exit_interface_mode()  -- Return to normal game input
```

## Frame-Aligned Input (`on_frame`)

For smooth rendering (games), poll input events directly each frame:

```lua
ui:on_frame(function()
    for _, ev in ipairs(ui:poll_input()) do
        if ev.event == "keydown" then
            print("down", ev.value)
        elseif ev.event == "keyup" then
            print("up", ev.value)
        elseif ev.event == "click" then
            print("click", ev.id, ev.value)
        elseif ev.event == "drag_begin" then
            -- Draggable panel: pointer went down on a valid drag; id = drag_dispatch_id or panel id
            -- value = "x&y" = leader top-left in surface pixels at grab (see Display elements → panel)
            print("drag_begin", ev.id, ev.value)
        elseif ev.event == "drag_end" then
            -- Panel drag finished (props.draggable on type "panel"); id = drag_dispatch_id or panel id
            -- value = "dx&dy" in surface pixels for this gesture (see Display elements → panel)
            print("drag_end", ev.id, ev.value)
        elseif ev.event == "drop" then
            -- Payload drag-and-drop: drag_source + drag_payload onto drop_target (panel/button/icon)
            -- id = drop_dispatch_id or drop zone element id; value = "payload&source_id&target_id"
            print("drop", ev.id, ev.value)
        elseif ev.event == "drag_payload_begin" then
            print("drag_payload_begin", ev.id, ev.value)
        elseif ev.event == "drag_payload_cancel" then
            print("drag_payload_cancel", ev.id, ev.value)
        end
    end
end)
```

`poll_input()` drains a per-frame input queue so `on_frame` scripts get smooth, frame-aligned events. Tick-based handlers still work — events are delivered to both paths.

### `drag_begin` / `drag_end` (draggable `panel`)

For a **`panel`** with **`props.draggable`**, **`drag_begin`** fires when a drag **starts** (left button, valid `drag_group` targets resolved). **`ev.id`** is **`drag_dispatch_id`** or the panel’s **`id`**. **`ev.value`** is **`"<x>&<y>"`**: the **leader** rect’s top-left in **surface pixels** (same coordinate system as element rects).

**`drag_end`** fires on **release** after positions are committed to the model. **`ev.value`** is **`"<dx>&<dy>"`**: horizontal and vertical **delta** for this gesture only (not cumulative across older drags).

Tick event-bus names: `scriptedscreens.ui.<surface>.drag_begin:<id>` and `scriptedscreens.ui.<surface>.drag_end:<id>`. Payload drops: `scriptedscreens.ui.<surface>.drop:<id>`, `…drag_payload_begin:<id>`, `…drag_payload_cancel:<id>`. Full props and stacking: [Display elements — `panel` → Draggable panels](/api/display-elements#draggable-panels) and [Drag payload & drop targets](/api/display-elements#drag-payload--drop-targets-ugui-drag-and-drop).

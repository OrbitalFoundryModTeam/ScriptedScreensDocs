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
        end
    end
end)
```

`poll_input()` drains a per-frame input queue so `on_frame` scripts get smooth, frame-aligned events. Tick-based handlers still work — events are delivered to both paths.

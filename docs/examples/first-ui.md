# Your First UI — Step by Step

A complete walkthrough building a simple status display with a button.

## Full Script

```lua
-- Get a surface and activate it
local ui = ss.ui.surface("main")
ss.ui.activate("main")

-- Get screen dimensions (physical screen size, or 256x256 fallback)
local size = ui:size()
local W, H = size.w, size.h

ui:clear()

-- 1. Background panel (dark space theme)
ui:element({
    id = "bg",
    type = "panel",
    rect = { unit = "px", x = 0, y = 0, w = W, h = H },
    style = { bg = "#0F172A" }
})

-- 2. Title bar with gradient
ui:element({
    id = "titlebar",
    type = "panel",
    rect = { unit = "px", x = 0, y = 0, w = W, h = 36 },
    style = {
        bg = "#1E293B",
        gradient = "#0F172A",
        gradient_dir = "vertical",
    }
})

-- 3. Title text
ui:element({
    id = "title",
    type = "label",
    rect = { unit = "px", x = 12, y = 6, w = W - 24, h = 24 },
    props = { text = "STATION CONTROL" },
    style = { font_size = 16, color = "#22C55E", align = "left" }
})

-- 4. Status indicator
ui:element({
    id = "status",
    type = "label",
    rect = { unit = "px", x = 12, y = 50, w = W - 24, h = 20 },
    props = { text = "System: ONLINE" },
    style = { font_size = 12, color = "#94A3B8" }
})

-- 5. Temperature gauge
ui:element({
    id = "temp_gauge",
    type = "gauge",
    rect = { unit = "px", x = 12, y = 80, w = 120, h = 80 },
    props = {
        value = 22,
        min = -20,
        max = 60,
        warn = 0.7,
        danger = 0.9,
        label = "TEMP",
        unit = "°C",
    },
})

-- 6. Pressure progress bar
ui:element({
    id = "press_label",
    type = "label",
    rect = { unit = "px", x = 150, y = 80, w = 200, h = 16 },
    props = { text = "Pressure: 101.3 kPa" },
    style = { font_size = 11, color = "#94A3B8" }
})
ui:element({
    id = "press_bar",
    type = "progress",
    rect = { unit = "px", x = 150, y = 100, w = 200, h = 12 },
    props = { value = 0.85 },
    style = { bg = "#1E293B", fill = "#3B82F6" },
})

-- 7. Action button
local clickCount = 0
ui:element({
    id = "action_btn",
    type = "button",
    rect = { unit = "px", x = 12, y = H - 50, w = 140, h = 36 },
    props = { text = "CYCLE AIRLOCK" },
    style = { bg = "#334155", text = "#FFFFFF", font_size = 12 },
    on_click = function(player)
        clickCount = clickCount + 1
        local status = ui:get("status")
        status:set_props({ text = "Airlock cycled " .. clickCount .. "x by " .. player })
        ui:commit()
    end
})

ui:commit()
```

## What This Creates

1. A dark background with a gradient title bar
2. A live temperature gauge with warning/danger zones
3. A pressure progress bar
4. A clickable button that updates the status text

## Key Takeaways

- **`ss.ui.surface("main")`** creates or gets a named surface
- **`ss.ui.activate("main")`** makes it the visible surface
- **`ui:element({...})`** creates UI elements and returns handles
- **`handle:set_props()`** updates element content without recreating it
- **`ui:commit()`** pushes all pending changes to the screen

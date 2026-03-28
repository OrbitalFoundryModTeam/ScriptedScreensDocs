# Getting Started

## In-Game Setup

1. Place a **Computer** or **Console**
2. Craft/spawn a **ScriptedScreens Circuitboard (Lua Chip)** or **Motherboard (Lua Chip)**
3. Insert the board into the computer
4. Insert an **Integrated Circuit (Lua)** into the board's built-in chip slot
5. Open the IC10 Editor and paste a Lua script

::: info Tablet Setup
For tablets, use a **Cartridge (Lua Chip)** or **Cartridge (Lua Chip, Wireless)**. Insert the cartridge into a tablet, then insert the Lua chip into the cartridge's slot.
:::

### Wiring Devices to Pins

If your script reads or writes external devices (dials, lights, sensors):

1. Use a **screwdriver** on the **bolt on the side** of the console to open the **configuration screen** (or insert a **Data Disk** into one of the computer's disk slots)
2. Assign devices to pins **d0** through **d5**
3. Your script can use `ic.read(0, ...)` / `ic.write(0, ...)` to talk to whatever device you assigned to d0, etc.

## Your First UI

```lua
local ui = ss.ui.surface("main")
ss.ui.activate("main")

-- Get screen dimensions (physical screen size, or 256x256 fallback)
local size = ui:size()
local W, H = size.w, size.h

ui:clear()

-- Background
ui:element({
    id = "bg",
    type = "panel",
    rect = { unit = "px", x = 0, y = 0, w = W, h = H },
    style = { bg = "#0F172A" }
})

-- Title
ui:element({
    id = "title",
    type = "label",
    rect = { unit = "px", x = 20, y = 10, w = W - 40, h = 40 },
    props = { text = "SCRIPTEDSCREENS" },
    style = { font_size = 24, color = "#22C55E", align = "left" }
})

-- Button
ui:element({
    id = "btn",
    type = "button",
    rect = { unit = "px", x = 20, y = H - 60, w = 180, h = 40 },
    props = { text = "CLICK ME" },
    style = { bg = "#334155", text = "#FFFFFF" },
    on_click = function(playerName)
        print("Clicked by: " .. tostring(playerName))
    end
})

ui:commit()
```

## Understanding the Script

### Surface

A **surface** is a named UI view. You create one with `ss.ui.surface("name")` and activate it with `ss.ui.activate("name")`:

```lua
local ui = ss.ui.surface("main")
ss.ui.activate("main")
```

### Elements

An **element** is a UI widget identified by a unique `id`. You define it with a table containing `type`, `rect`, `props`, and `style`:

```lua
ui:element({
    id = "title",           -- Unique identifier
    type = "label",         -- Element type
    rect = { unit = "px", x = 20, y = 10, w = 200, h = 30 },  -- Position/size
    props = { text = "Hello" },     -- Content properties
    style = { font_size = 18, color = "#FFFFFF" }  -- Visual styling
})
```

### Commit

Changes are batched. After creating/updating elements, call `ui:commit()` to push them to the screen.

### Rect / Layout Units

- `unit = "px"` — Pixels (top-left origin, Y increases downward)
- `unit = "%"` / `"percent"` — Percentages (0–100) of screen size

## Next Steps

- **[Surfaces & Views](/guide/surfaces)** — Multi-page UIs
- **[Elements](/guide/elements)** — Element handles and updates
- **[Display Elements](/api/display-elements)** — Full element type reference
- **[Example Gallery](/examples/gallery)** — Copy-paste examples

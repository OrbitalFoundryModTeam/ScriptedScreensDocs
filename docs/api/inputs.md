# Slider, Select & TextInput

## `slider`

Draggable slider with configurable direction.

```lua
-- Horizontal slider (default)
ui:element({
    id = "vol", type = "slider",
    rect = { unit = "px", x = 10, y = 40, w = 200, h = 20 },
    props = { value = "0.5", min = "0", max = "1" },
    style = { bg = "#1E293B", fill = "#3B82F6", handle = "#FFFFFF" },
    on_change = function(value, player)
        print("New value:", value)
    end,
})

-- Vertical slider (bottom to top)
ui:element({
    id = "throttle", type = "slider",
    rect = { unit = "px", x = 10, y = 70, w = 24, h = 120 },
    props = { value = "75", min = "0", max = "100", direction = ss.direction.BottomToTop },
    style = { bg = "#1E293B", fill = "#22C55E", handle = "#FFFFFF" },
    on_change = function(value, player)
        print("Throttle:", value)
    end,
})
```

| Prop | Description |
|---|---|
| `value` | Current value |
| `min` | Minimum (default 0) |
| `max` | Maximum (default 100) |
| `direction` | Slide direction: `ss.direction.LeftToRight` (default), `ss.direction.RightToLeft`, `ss.direction.TopToBottom`, `ss.direction.BottomToTop`. Raw strings `"ltr"`, `"rtl"`, `"ttb"`, `"btt"` also accepted. |

| Style | Description |
|---|---|
| `bg` | Track background |
| `fill` | Filled portion color |
| `handle` | Handle color |

| Event | Callback Args |
|---|---|
| `on_change` | `(value, playerName)` |

## `select`

Dropdown select. Supply labels as a **Lua array** or a **pipe-separated string** (legacy). Supports **multi-select** mode where multiple options can be toggled on/off.

```lua
-- Single-select (default)
ui:element({
    id = "mode", type = "select",
    rect = { unit = "px", x = 10, y = 40, w = 200, h = 28 },
    props = { options = { "Auto", "Manual", "Off" }, selected = "0" },
    style = { bg = "#1E293B", text = "#E2E8F0", font_size = 12 },
    on_change = function(value, player)
        print("Selected index:", value)  -- 0-based index as string
    end,
})

-- Multi-select with highlight (selected rows are highlighted)
ui:element({
    id = "tags", type = "select",
    rect = { unit = "px", x = 10, y = 80, w = 200, h = 28 },
    props = {
        options = { "Alpha", "Beta", "Gamma", "Delta" },
        multi = "highlight",
        selected = "0,2",
    },
    style = { bg = "#1E293B", text = "#E2E8F0", font_size = 12, selected_bg = "#2563EB" },
    on_change = function(value, player)
        -- value is the 0-based index of the toggled option
    end,
})

-- Multi-select with checkbox indicators
ui:element({
    id = "filters", type = "select",
    rect = { unit = "px", x = 10, y = 120, w = 200, h = 28 },
    props = {
        options = { "Errors", "Warnings", "Info" },
        multi = "checkbox",
        selected = "0,2",
    },
    style = { bg = "#1E293B", text = "#E2E8F0", font_size = 12 },
    on_change = function(value, player)
        -- value is the 0-based index of the toggled option
    end,
})
```

| Prop | Description |
|---|---|
| `options` | Array of strings, e.g. `{ "A", "B" }`, **or** pipe-delimited `"A\|B"` |
| `selected` | 0-based selected index (single-select), **or** comma-separated indices `"0,2,3"` (multi-select) |
| `open` | *(Optional)* `"true"` / `"false"` — omit for automatic open/close |
| `multi` | `"none"` (default, single-select), `"highlight"` (multi-select with row highlighting), or `"checkbox"` (multi-select with ☐/☑ indicators). Dropdown stays open after each pick in multi-select modes. |

| Style | Description |
|---|---|
| `bg` | Background color |
| `text` | Text color |
| `font_size` | Font size |
| `selected_bg` | Background color for selected items (default blue highlight) |

| Event | Callback Args |
|---|---|
| `on_change` | `(optionIndex, playerName)` — option selected (single) or toggled (multi) |
| `on_toggle` | *(Optional)* `(playerName)` — only if you need legacy manual `open` state |

## `textinput`

Single-line text input. In interface mode: direct keyboard input. Outside: modal text dialog.

```lua
ui:element({
    id = "name_input", type = "textinput",
    rect = { unit = "px", x = 10, y = 40, w = 200, h = 28 },
    props = { value = "", placeholder = "Enter name...", title = "Name" },
    style = { bg = "#0F172A", text = "#E2E8F0", placeholder_color = "#475569", font_size = 12 },
    on_change = function(value, player)
        print("Input:", value)
    end,
})
```

| Prop | Description |
|---|---|
| `value` | Current text value |
| `placeholder` | Placeholder text when empty |
| `title` | Dialog title (non-interface mode) |

| Event | Callback Args |
|---|---|
| `on_change` | `(value, playerName)` — fired on end-edit |

# ScrollView

Scrollable container. Child elements are parented inside the scroll content area.

```lua
local scroll = ui:element({
    id = "log_scroll", type = "scrollview",
    rect = { unit = "px", x = 10, y = 50, w = 460, h = 200 },
    props = { content_height = "800" },
    style = {
        bg = "#0F172A",
        scrollbar_bg = "#1E293B",
        scrollbar_handle = "#475569",
        scroll_speed = "30",
    },
})

-- Add children inside the scroll content
for i = 1, 20 do
    scroll:element({
        id = "row_" .. i,
        type = "label",
        rect = { unit = "px", x = 5, y = (i - 1) * 30, w = 440, h = 28 },
        props = { text = "Log entry " .. i },
        style = { color = "#E2E8F0", font_size = 11 },
    })
end
```

| Prop | Description |
|---|---|
| `content_height` | Total scrollable content height in pixels (default 500) |

| Style | Description |
|---|---|
| `bg` | Scroll area background |
| `scrollbar_bg` | Scrollbar track color |
| `scrollbar_handle` | Scrollbar handle color |
| `scroll_speed` | Scroll sensitivity (default 20) |
| `padding_bottom` | Extra padding at content bottom (default 20) |

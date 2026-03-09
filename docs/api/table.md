# Table

Data table with column headers, alternating row colors, row selection, and sortable column headers.

```lua
ui:element({
    id = "sensor_table", type = "table",
    rect = { unit = "px", x = 10, y = 120, w = 300, h = 120 },
    props = {
        columns = { "Zone", "Temp", "Status" },
        rows = {
            { "HAB-1", 21.5, "OK" },
            { "HAB-2", 19.0, "WARN" },
            {
                "AIRLOCK",
                { text = "8.2", style = { color = "#F59E0B" } },
                { text = "ALERT", style = { color = "#EF4444" } },
            },
        },
        col_widths = { 2, 1, 1 },
        selected_row = 1,
        sort_column = 1,
        sort_dir = "asc",
    },
    style = {
        header_bg = "#1E293B",
        header_color = "#94A3B8",
        row_bg = "#111827",
        alt_row_bg = "#0F172A",
        row_color = "#E2E8F0",
        selected_bg = "#1E3A5F",
        selected_color = "#67E8F9",
        font_size = 11,
        row_height = 22,
    },
    on_click = function(value, playerName)
        print("Row clicked: " .. tostring(value))
    end,
    on_change = function(value, playerName)
        print("Sort by column: " .. tostring(value))
    end
})
```

| Prop | Description |
|---|---|
| `columns` | Array of column header strings |
| `rows` | Array of rows (each row = array of cell values) |
| `col_widths` | Array of relative column widths (default all equal) |
| `selected_row` | 1-based selected row index (0 for none) |
| `sort_column` | 1-based sorted column index (0 for none) |
| `sort_dir` | `"asc"` or `"desc"` |

### Cell Styling

Individual cells can have per-cell styling:

```lua
{ text = "ALERT", style = { color = "#EF4444" } }
```

| Event | Callback Args |
|---|---|
| `on_click` | `(rowIndex, playerName)` — data row clicked |
| `on_change` | `(columnIndex, playerName)` — header clicked (sort) |

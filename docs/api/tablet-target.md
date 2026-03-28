# Tablet Target Detection

When running on a **tablet cartridge**, detect what the player is looking at using `ss.tablet.target`.

```lua
ss.tablet.target(function(data)
    if data.has_target then
        print("Looking at:", data.display_name)
        print("Distance:", data.distance, "m")
        print("Type:", data.target_kind or "unknown")

        if data.power_network then
            print("Power net", data.power_network.id,
                  "required", data.power_network.required_load)
        end

        if data.power_usage then
            print("Used:", data.power_usage.used_power, "W")
        end

        if data.data_network then
            print("Data network:", data.data_network.id,
                  "devices:", data.data_network.device_count)
        end
    else
        -- No target — optionally check room atmosphere
        if data.atmosphere_mode == "room" and data.room then
            print("Room:", data.room.name)
        end
    end
end, 0.1, true)  -- interval in seconds (min 0.05), includeRoomAtmos

-- Unsubscribe
ss.tablet.target(nil)
```

## Callback Data Fields

| Field | Type | Description |
|---|---|---|
| `has_target` | boolean | Whether a valid target was found |
| `display_name` | string | Target's display name |
| `distance` | number | Distance in meters |
| `target_kind` | string | Target category |
| `power_network` | table \| nil | Power network info (id, required_load, ...) |
| `power_usage` | table \| nil | Power usage info (used_power, ...) |
| `data_network` | table \| nil | Data network info (id, device_count, ...) |
| `atmosphere_mode` | string | `"room"` or `"world"` |
| `room` | table \| nil | Room atmosphere data (if mode = "room") |
| `world` | table \| nil | World atmosphere data |
| `logic` | table \| nil | When the target exposes logic: readable values as string keys → numbers, using the **same names** as `ic.enums.LogicType` (e.g. `Setting`, `Power`, `Pressure`, `Temperature`, `On`, `Mode`, `Charge`). May also include `Error`, `Maximum`, `Volume`, `TotalMoles`, identity-style fields when the device offers them, and **extra gas/liquid ratio** fields for newer substances when the device exposes them. Only fields the device actually allows reading are included. |

## Parameters

| Parameter | Type | Default | Description |
|---|---|---|---|
| `callback` | function \| nil | required | Handler function (nil to unsubscribe) |
| `interval` | number | 0.1 | Update interval in seconds (min 0.05) |
| `includeRoomAtmos` | boolean | false | Include room/world atmosphere data |

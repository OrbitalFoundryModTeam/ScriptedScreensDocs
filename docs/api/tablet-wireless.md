# Tablet Wireless Networks

Wireless Lua cartridges can tether to **omni power transmitters** on the data network, letting scripts connect as if the tablet were wired in.

## Listing Transmitters

```lua
local transmitters = ss.tablet.wireless.list()
for i, t in ipairs(transmitters) do
    print(i, t.name, t.id, t.network_id, t.distance .. "m")
end
```

## Connecting

```lua
-- Connect by transmitter id (or network_id), with mesh enabled
local ok, err = ss.tablet.wireless.connect(transmitters[1].id, true)
if not ok then
    print("connect failed:", err)
end
```

## Status

```lua
local status = ss.tablet.wireless.status()
print("connected:", status.connected, "in range:", status.in_range)
```

## Disconnecting

```lua
ss.tablet.wireless.disconnect()
```

## API Reference

| Function | Returns | Description |
|---|---|---|
| `ss.tablet.wireless.list()` | table[] | List available omni transmitters in range |
| `ss.tablet.wireless.connect(id, mesh?)` | ok, err | Connect to a transmitter |
| `ss.tablet.wireless.status()` | table | Query connection status |
| `ss.tablet.wireless.disconnect()` | — | Disconnect from current network |

### Transmitter Entry Fields

| Field | Type | Description |
|---|---|---|
| `name` | string | Transmitter display name |
| `id` | number | Transmitter ReferenceId |
| `network_id` | number | Data network ID |
| `distance` | number | Distance in meters |

### Status Fields

| Field | Type | Description |
|---|---|---|
| `connected` | boolean | Currently connected |
| `in_range` | boolean | Transmitter is in range |
| `transmitter_id` | number | Connected transmitter ID |
| `network_id` | number | Connected network ID |

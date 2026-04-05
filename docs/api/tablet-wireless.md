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

## Remote Network Data Parity

Once connected, a wireless Lua cartridge can use the remote data network almost like a wired ScriptedScreens board.

While you stay **connected and in range**, the **tablet battery** drains a bit faster—about the same extra drain as the suit **Wireless Development Board**. When you inspect the cartridge, the description includes a note while this extra drain is happening.

Available operations include:

- `batch_read()` / `batch_write()` against remote-network devices
- `device_list()` on the remote network
- `read_id()` / `write_id()` and `read_slot_id()` / `write_slot_id()`
- device-memory calls by id such as `mem_get_id()` / `mem_put_id()` / `mem_clear_id()`
- `require("modname")` for StationeersLua library chips on the remote network
- `ic.net.*` messaging, pub/sub, and RPC over the wireless link

::: info Limitation
Tablet cartridges do **not** expose configurable `d0`-`d5` pin mappings like a wired computer or console board. Use remote-network operations and id-based addressing instead.
:::

## API Reference

| Function                                | Returns | Description                               |
| --------------------------------------- | ------- | ----------------------------------------- |
| `ss.tablet.wireless.list()`             | table[] | List available omni transmitters in range |
| `ss.tablet.wireless.connect(id, mesh?)` | ok, err | Connect to a transmitter                  |
| `ss.tablet.wireless.status()`           | table   | Query connection status                   |
| `ss.tablet.wireless.disconnect()`       | —       | Disconnect from current network           |

### Transmitter Entry Fields

| Field        | Type   | Description              |
| ------------ | ------ | ------------------------ |
| `name`       | string | Transmitter display name |
| `id`         | number | Transmitter ReferenceId  |
| `network_id` | number | Data network ID          |
| `distance`   | number | Distance in meters       |

### Status Fields

| Field            | Type    | Description              |
| ---------------- | ------- | ------------------------ |
| `connected`      | boolean | Currently connected      |
| `in_range`       | boolean | Transmitter is in range  |
| `transmitter_id` | number  | Connected transmitter ID |
| `network_id`     | number  | Connected network ID     |

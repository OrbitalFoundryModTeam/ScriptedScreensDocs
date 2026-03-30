# Global Tables & Enums

ScriptedScreens exposes several constant tables on the `ss` object that you can use instead of hardcoding strings. Using these constants gives you autocomplete-friendly names and protects against typos.

## `ss.direction`

Fill/slide direction constants used by [`progress`](/api/display-elements#progress) and [`slider`](/api/inputs#slider) elements.

| Constant | Value | Description |
|---|---|---|
| `ss.direction.LeftToRight` | `"ltr"` | Left to right (default) |
| `ss.direction.RightToLeft` | `"rtl"` | Right to left |
| `ss.direction.TopToBottom` | `"ttb"` | Top to bottom |
| `ss.direction.BottomToTop` | `"btt"` | Bottom to top |

```lua
-- Vertical progress bar filling upward
ui:element({
    id = "fuel", type = "progress",
    rect = { unit = "px", x = 10, y = 10, w = 30, h = 120 },
    props = { value = 60, max = 100, direction = ss.direction.BottomToTop },
    style = { bg = "#1E293B", fill = "#38BDF8" },
})

-- Vertical slider
ui:element({
    id = "throttle", type = "slider",
    rect = { unit = "px", x = 50, y = 10, w = 24, h = 120 },
    props = { value = "75", min = "0", max = "100", direction = ss.direction.BottomToTop },
    style = { bg = "#1E293B", fill = "#22C55E", handle = "#FFFFFF" },
    on_change = function(v) end,
})
```

::: tip Raw strings still work
You can always pass the short string directly (`"ltr"`, `"rtl"`, `"ttb"`, `"btt"`) if you prefer. The enum is purely for readability.
:::

## `ss.sounds`

Built-in game sound names for use with [`ss.play_sound()`](/api/sound). Organized into categories.

### UI Feedback

| Constant | Sound |
|---|---|
| `ss.sounds.ActivateButton` | Button activation click |
| `ss.sounds.SwitchOn` / `SwitchOff` | Switch toggle |
| `ss.sounds.DialTurn` | Dial rotation |
| `ss.sounds.CompletedChime` | Completion chime |
| `ss.sounds.DirectionNextButton` / `DirectionPreviousButton` | Direction buttons |
| `ss.sounds.Label` / `LabelConfirm` / `LabelCancel` | Labeller sounds |

### Logic / IC

| Constant | Sound |
|---|---|
| `ss.sounds.LogicOnBeep` / `LogicOffBeep` | Logic beeps |
| `ss.sounds.LogicError` | Logic error |
| `ss.sounds.LogicOn` / `LogicOff` | Logic state changes |
| `ss.sounds.LogicRead` / `LogicWrite` | Logic I/O |
| `ss.sounds.LogicMath` | Logic math operation |
| `ss.sounds.Error` | Generic error |

### Mechanical / Devices

| Constant | Sound |
|---|---|
| `ss.sounds.LeverDown` / `LeverUp` | Lever toggle |
| `ss.sounds.ThrottleLeverDown` / `ThrottleLeverUp` | Throttle lever |
| `ss.sounds.PipeDeviceOn` / `PipeDeviceOff` | Pipe device toggle |
| `ss.sounds.PipeValveOn` / `PipeValveOff` | Pipe valve toggle |
| `ss.sounds.ShutterOpen` / `ShutterClose` | Shutter open/close |
| `ss.sounds.VentInwards` / `VentOutwards` | Vent direction |
| `ss.sounds.DeviceExport` / `DeviceImport` | Device I/O |
| `ss.sounds.WrenchOneShot` / `ScrewDriverOneShot` | Tool sounds |

### APC / Power

| Constant | Sound |
|---|---|
| `ss.sounds.ApcOpen` / `ApcClose` | APC door |
| `ss.sounds.ApcOn` / `ApcOff` | APC power |
| `ss.sounds.ApcCharged` / `ApcDischarged` | APC charge state |
| `ss.sounds.ElectricalFailure` | Electrical failure |

### Alerts (`ss.sounds.alerts`)

Announcement sounds played through the game's SoundAlert system.

| Constant | Sound |
|---|---|
| `ss.sounds.alerts.Warning` | Warning |
| `ss.sounds.alerts.Danger` | Danger |
| `ss.sounds.alerts.Alert` | Alert |
| `ss.sounds.alerts.IntruderAlert` | Intruder alert |
| `ss.sounds.alerts.StormIncoming` | Storm incoming |
| `ss.sounds.alerts.Depressurising` / `Pressurising` | Pressure change |
| `ss.sounds.alerts.AirlockCycling` | Airlock cycling |
| `ss.sounds.alerts.PowerLow` | Low power |
| `ss.sounds.alerts.SystemFailure` | System failure |
| `ss.sounds.alerts.FireFireFire` | Fire alert |
| `ss.sounds.alerts.RocketLaunching` / `LiftOff` | Rocket launch |
| `ss.sounds.alerts.TraderIncoming` / `TraderLanded` | Trader events |
| `ss.sounds.alerts.PressureHigh` / `PressureLow` | Pressure alerts |
| `ss.sounds.alerts.TemperatureHigh` / `TemperatureLow` | Temperature alerts |
| `ss.sounds.alerts.PollutantsDetected` / `HighCarbonDioxide` | Atmosphere alerts |
| `ss.sounds.alerts.Alarm1` through `Alarm12` | Generic alarms |
| `ss.sounds.alerts.Music1` / `Music2` / `Music3` | Music tracks |
| `ss.sounds.alerts.One` through `Five` | Number announcements |
| `ss.sounds.alerts.Floor` | Floor announcement |

```lua
-- Play a warning alert
ss.play_sound(ss.sounds.alerts.Warning)

-- Play a UI click
ss.play_sound(ss.sounds.ActivateButton)

-- Looping alarm
ss.play_sound(ss.sounds.alerts.Alarm1, { loop = true, id = "siren" })
ss.stop_sound("siren")
```

## `ss.ui.icons`

Icon constants for the [`icon`](/api/icons) element type. Organized into sub-tables.

| Table | Usage | Example |
|---|---|---|
| `ss.ui.icons.gas` | Gas type icons | `ss.ui.icons.gas.Oxygen` |
| `ss.ui.icons.slot` | Item slot type icons | `ss.ui.icons.slot.Helmet` |
| `ss.ui.icons.prefab` | In-game item/structure icons | `ss.ui.icons.prefab.ItemKitComputer` |

See the [Icons & Prefab Icons](/api/icons) page for full listings and usage examples.

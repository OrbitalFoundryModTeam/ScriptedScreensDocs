# Sound Playback

Play sounds from your scripts. Sounds originate from the screen/tablet position and respond to atmosphere — muffled in vacuum, normal in pressurized rooms.

## Playing Built-In Game Sounds

```lua
-- One-shot sound
ss.play_sound(ss.sounds.LogicOnBeep)

-- With options
ss.play_sound(ss.sounds.CompletedChime, { volume = 0.5 })

-- Looping sound with explicit id
ss.play_sound(ss.sounds.LogicOn, { loop = true, id = "alarm" })

-- Announcements
ss.play_sound(ss.sounds.alerts.Warning)
ss.play_sound(ss.sounds.alerts.IntruderAlert, { loop = true, id = "intruder" })
```

## Stopping Sounds

```lua
ss.stop_sound("alarm")       -- Stop a specific sound
ss.stop_all_sounds()          -- Stop all sounds on this device
```

## Remote Audio

If the server has media enabled (`AllowMediaPlayback = true`):

```lua
ss.play_sound("https://example.com/alert.wav", {
    volume = 0.7, loop = false, id = "web_sound",
})
```

## API Reference

| Function                    | Description                               |
| --------------------------- | ----------------------------------------- |
| `ss.play_sound(src, opts?)` | Play a sound. Returns the sound id string |
| `ss.stop_sound(id)`         | Stop a specific sound by id               |
| `ss.stop_all_sounds()`      | Stop all sounds on this device            |

### Options

| Option   | Type    | Default | Description                |
| -------- | ------- | ------- | -------------------------- |
| `volume` | number  | 1.0     | Volume (0..1)              |
| `loop`   | boolean | false   | Loop the sound             |
| `id`     | string  | auto    | Explicit id for later stop |

## Built-In Sounds (`ss.sounds`)

**UI feedback:** `ActivateButton`, `SwitchOn`, `SwitchOff`, `DialTurn`, `CompletedChime`, `DirectionNextButton`, `DirectionPreviousButton`, `Label`, `LabelConfirm`, `LabelCancel`

**Logic / IC:** `LogicOnBeep`, `LogicOffBeep`, `LogicError`, `LogicOn`, `LogicOff`, `LogicRead`, `LogicWrite`, `LogicMath`, `Error`

**Mechanical:** `LeverDown`, `LeverUp`, `ThrottleLeverDown`, `ThrottleLeverUp`, `PipeDeviceOn`, `PipeDeviceOff`, `PipeValveOn`, `PipeValveOff`, `PipeFail`, `PipeLeak`, `PipeDamage`, `ShutterOpen`, `ShutterClose`, `ShutterOpenStop`, `ShutterCloseStop`, `VentInwards`, `VentOutwards`, `DeviceExport`, `DeviceImport`, `WrenchOneShot`, `ScrewDriverOneShot`, `Splice`, `DryFire`

**Power:** `ApcOpen`, `ApcClose`, `ApcOn`, `ApcOff`, `ApcCharged`, `ApcDischarged`, `ApcCharging`, `ApcDischarging`, `ElectricalFailure`

**Environment:** `AtmosphereFireStart`, `AtmosphereFire`

**Storage:** `StorageLockerOpen`, `StorageLockerClose`, `StorageLockerSmallOpen`, `StorageLockerSmallClose`, `CornerLockerOpen`, `CornerLockerClose`, `ChuteBinOpen`, `ChuteBinClose`, `EggCartonOpen`, `EggCartonClose`

**Misc:** `BobbleHead`, `CapsuleImpact`

## Announcements (`ss.sounds.alerts`)

`Danger`, `Warning`, `Alert`, `IntruderAlert`, `SystemFailure`, `Welcome`, `MalfunctionDetected`, `HaltWhoGoesThere`, `FireFireFire`, `StormIncoming`, `Depressurising`, `Pressurising`, `AirlockCycling`, `PowerLow`, `PressureHigh`, `PressureLow`, `TemperatureHigh`, `TemperatureLow`, `PollutantsDetected`, `HighCarbonDioxide`, `RocketLaunching`, `LiftOff`, `TraderIncoming`, `TraderLanded`, `Floor`, `One`, `Two`, `Three`, `Four`, `Five`, `Alarm1`–`Alarm12`, `Music1`, `Music2`, `Music3`

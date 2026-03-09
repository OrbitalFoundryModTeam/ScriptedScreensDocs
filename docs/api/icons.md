# Icons & Prefab Icons

Display game icons (gas types, slot types, item thumbnails) using the built-in icon atlas.

## Basic Usage

```lua
-- Using an enum value (auto-detected type)
ui:element({
    id = "o2_icon", type = "icon",
    rect = { unit = "px", x = 10, y = 10, w = 24, h = 24 },
    props = { name = ss.ui.icons.gas.Oxygen },
    style = { tint = "#3B82F6" },
})

-- Using a raw string (specify icon_type explicitly)
ui:element({
    id = "steel", type = "icon",
    rect = { unit = "px", x = 40, y = 10, w = 32, h = 32 },
    props = { icon_type = "prefab", name = "ItemSteelIngot" },
})
```

| Prop          | Description                                                                  |
| ------------- | ---------------------------------------------------------------------------- |
| `name`        | Enum value (auto-detects) or raw icon name                                   |
| `icon_type`   | `"gas"`, `"slot"`, `"prefab"`, or `"resource"` (only needed for raw strings) |
| `color_index` | Painted color variant index (prefab icons)                                   |

| Style  | Description                     |
| ------ | ------------------------------- |
| `tint` | Icon tint color (default white) |

## Icon Types

- **`gas`** — Gas type icons. Use `ss.ui.icons.gas.*`
- **`slot`** — Slot type icons. Use `ss.ui.icons.slot.*`
- **`prefab`** — Any game item/structure thumbnail. Pass a prefab name string or numeric hash
- **`resource`** — Raw Unity resource path (advanced)

## Gas Icons (`ss.ui.icons.gas`)

`Oxygen`, `Nitrogen`, `CarbonDioxide` (alias `CO2`), `Volatiles`, `Pollutant`, `Water`, `NitrousOxide` (alias `N2O`), `LiquidNitrogen`, `LiquidOxygen`, `LiquidVolatiles`, `Steam`, `LiquidCarbonDioxide` (alias `LiquidCO2`), `LiquidPollutant`, `LiquidNitrousOxide`, `Hydrogen` (alias `H2`), `LiquidHydrogen`, `PollutedWater`

## Slot Icons (`ss.ui.icons.slot`)

`None`, `Helmet`, `Suit`, `Back`, `GasFilter`, `GasCanister`, `Motherboard`, `Circuitboard`, `DataDisk`, `Organ`, `Ore`, `Plant`, `Uniform`, `Entity`, `Battery`, `Egg`, `Belt`, `Tool`, `Appliance`, `Ingot`, `Torpedo`, `Cartridge`, `AccessCard`, `Magazine`, `Circuit`, `Bottle`, `ProgrammableChip` (alias `Chip`), `Glasses`, `CreditCard`, `DirtCanister`, `SensorProcessingUnit` (alias `SPU`), `LiquidCanister`, `LiquidBottle`, `Wreckage`, `SoundCartridge`, `DrillHead`, `ScanningHead`, `Flare`, `SuitMod`, `Crate`, `Portables`, `RocketPayload`

## Prefab Icons (`ss.ui.icons.prefab`)

A curated set of common prefab names. You can also pass **any** prefab name string or numeric hash.

**Ingots:** `IronIngot`, `SteelIngot`, `CopperIngot`, `GoldIngot`, `SilverIngot`, `NickelIngot`, `LeadIngot`, `SiliconIngot`, `CoalIngot`, `ElectrumIngot`, `SolderIngot`, `ConstantanIngot`, `InvarIngot`, `AstroloyIngot`, `HastelloyIngot`, `WaspaloyIngot`, `InconelIngot`, `SteliteIngot`

**Ores:** `IronOre`, `CopperOre`, `GoldOre`, `SilverOre`, `NickelOre`, `LeadOre`, `SiliconOre`, `CoalOre`, `UraniumOre`, `CobaltOre`

**Ice:** `IceOxite`, `IceVolatiles`, `IceNitrice`

**Tools:** `Wrench`, `Screwdriver`, `Crowbar`, `Welder`, `AngleGrinder`, `Pickaxe`, `Drill`, `DuctTape`, `Multitool`, `Tablet`, `Labeller`

**Components:** `Cable`, `CableCoil`, `Pipe`, `SteelSheets`, `IronSheets`, `CopperSheets`, `GoldSheets`, `SteelFrames`, `IronFrames`, `CircuitBoard`, `IC`, `LuaChip`, `Battery`, `BatteryLarge`, `GasCanister`, `GasFilter`, `DataDisk`, `SensorLens`, `Motor`

**Gas Canisters:** `GasOxygen`, `GasNitrogen`, `GasCO2`, `GasVolatiles`, `GasWater`, `GasN2O`

**Food / Plants:** `Potato`, `Tomato`, `Pumpkin`, `Corn`, `Wheat`, `Soybean`, `Rice`, `Mushroom`, `CannedFood`

**Equipment:** `Helmet`, `Suit`, `Jetpack`, `MiningBelt`, `ToolBelt`, `Uniform`

**Machines:** `ArcFurnace`, `Autolathe`, `ElectronicsPrinter`, `HydraulicPipeBender`, `Furnace`, `SolarPanel`, `BatterySmall`, `BatteryLargeStruct`, `AdvancedFurnace`, `Computer`, `Console`, `Light`, `Tank`, `GasMixer`, `PipeAnalyzer`, `ActiveVent`, `PassiveVent`, `Filtration`

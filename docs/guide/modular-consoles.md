# Modular Consoles

ScriptedScreens is compatible with the **Modular Consoles** mod, which adds alternative computer and console structures to the game. Your Lua scripts and UIs work on modular consoles the same way they do on vanilla computers — no code changes needed.

## Supported Structures

| Structure | Description |
|---|---|
| **Modular Console Computer** | Functions like a vanilla Computer. Insert a ScriptedScreens board and Lua chip as normal. |
| **Modular Console Console** | Functions like a vanilla Console. Same setup process. |

## Setup

Setup is identical to vanilla hardware:

1. Place a **Modular Console Computer** or **Modular Console Console**
2. Insert an **Integrated Circuit (Lua)** into a **ScriptedScreens Circuitboard (Lua Chip)**
3. Insert the board into the motherboard slot
4. Open the IC10 Editor, paste your script, and export

Your UI will appear on the modular console's screen just like it would on a vanilla computer.

## Error Display

On vanilla computers, you can hover over the **power switch** to see Lua error details in the tooltip. Modular consoles don't have a power switch, so errors are shown on different interaction points:

| Structure | Where to check for errors |
|---|---|
| **Modular Console Console** | Hover over the **screw on the side** |
| **Modular Console Computer** | Hover over either **disk drive slot** |

The tooltip shows the same error information — the error message and line number — that you'd see on the vanilla power switch.

## Screen Size

The modular console screen is slightly smaller than the vanilla computer screen. Your UI will render at the same resolution but appear physically smaller on the modular console's display. The `ui:size()` function returns the same pixel dimensions regardless of which hardware you're using, so layouts don't need adjustment.

::: tip
If your UI looks too small on a modular console, this is a known difference in the physical screen size set by the Modular Consoles mod, not a ScriptedScreens issue.
:::

## Known Differences

- **No power switch** — Use the screw or disk drives for error tooltips (see above)
- **Smaller physical screen** — Same pixel resolution, smaller physical display area
- **Same Lua API** — All `ss.*` functions, elements, events, and features work identically

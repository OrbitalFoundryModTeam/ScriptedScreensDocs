# Media Streaming (Video)

Play HTTP video streams on your UI. Video renders to a texture; audio is spatialized from the screen position.

```lua
ui:element({
    id = "player", type = "media",
    rect = { unit = "px", x = 0, y = 0, w = 480, h = 272 },
    props = {
        url = "https://example.com/video.mp4",
        playing = "true",
        volume = "0.8",
        loop = "true",
    },
})
```

- Audio responds to atmosphere — muffled in vacuum, normal in pressurized rooms
- Players adjust per-screen volume with **Ctrl+Alt+MouseWheel**
- Global mute toggle in client config
- If the game applies a **mixer snapshot** (for example during an airlock pressurisation cycle), playback that was interrupted is **restarted** when the server still expects the clip to be playing — audio no longer stays permanently silent after that transition

| Prop | Description |
|---|---|
| `url` | HTTP/HTTPS URL to a video file |
| `playing` | `"true"` / `"false"` |
| `volume` | `"0"` to `"1"` (default 1) |
| `loop` | `"true"` / `"false"` |
| `time` | Seek to specific time in seconds |

## Server Config

| Setting | Default | Description |
|---|---|---|
| `EnableExperimentalVideo` | `false` | Must be enabled on server |
| `AllowMediaPlayback` | `true` | Master switch for all media |
| `AllowedMediaTypes` | — | Restrict file extensions |
| `MaxResolutionWidth/Height` | — | Limit resource usage |

## Client Config

| Setting | Default | Description |
|---|---|---|
| `EnableMediaLocally` | `true` | Opt out of all media locally |
| `ClientMasterVolume` | `0.5` | Scale all media audio |

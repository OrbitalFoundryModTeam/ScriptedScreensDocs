# Image Element

Display remote images (PNG, JPG, animated GIF) on your UI.

```lua
ui:element({
    id = "logo", type = "image",
    rect = { unit = "px", x = 10, y = 10, w = 200, h = 120 },
    props = { url = "https://example.com/image.png" },
})
```

- Each client downloads the image independently — the URL flows through the standard UI sync pipeline
- Animated GIFs play back frame-by-frame with correct timing, transparency, and looping
- Images are cached in a per-client LRU cache (default 64 entries)
- Transparency is fully supported (PNG alpha, GIF transparency)

| Prop | Description |
|---|---|
| `url` | HTTP/HTTPS URL to a PNG, JPG, or GIF image |

## Server Config

| Setting | Default | Description |
|---|---|---|
| `AllowRemoteImages` | `true` | Gate whether image elements are processed |
| `MaxImageDimension` | `1024` | Max width/height in pixels |
| `ImageCacheSize` | `64` | LRU cache max entries |

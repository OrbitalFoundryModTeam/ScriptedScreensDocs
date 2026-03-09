import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'ScriptedScreens',
  description: 'Custom touchscreen UIs for Stationeers using Lua scripting',
  base: '/ScriptedScreensDocs/',

  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/ScriptedScreensDocs/favicon.png' }],
  ],

  themeConfig: {
    logo: '/logo.png',

    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Elements', link: '/api/display-elements' },
      { text: 'API', link: '/api/canvas' },
      { text: 'Examples', link: '/examples/gallery' },
      {
        text: 'Links',
        items: [
          { text: 'StationeersLua Docs', link: 'https://orbitalfoundrymodteam.github.io/ScriptedScreensDocs/' },
          { text: 'Discord', link: 'https://discord.gg/HxvySSu5G3' },
          { text: 'Ko-fi', link: 'https://ko-fi.com/G2G61S5ZB5' },
        ]
      }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'What is ScriptedScreens?', link: '/guide/what-is-scripted-screens' },
            { text: 'Installation', link: '/guide/installation' },
            { text: 'Getting Started', link: '/guide/getting-started' },
          ]
        },
        {
          text: 'Core Concepts',
          items: [
            { text: 'Surfaces & Views', link: '/guide/surfaces' },
            { text: 'Elements', link: '/guide/elements' },
            { text: 'Colors & Gradients', link: '/guide/colors' },
            { text: 'Input & Events', link: '/guide/input-events' },
            { text: 'Virtual Resolution', link: '/guide/virtual-resolution' },
            { text: 'Persistence', link: '/guide/persistence' },
            { text: 'Tips & Best Practices', link: '/guide/tips' },
          ]
        },
      ],
      '/api/': [
        {
          text: 'Display Elements',
          items: [
            { text: 'Label, Panel, Progress', link: '/api/display-elements' },
            { text: 'Spinner, Line, Shapes', link: '/api/shapes' },
            { text: 'Icon & Prefab Icons', link: '/api/icons' },
          ]
        },
        {
          text: 'Interactive Elements',
          items: [
            { text: 'Button & Interface Button', link: '/api/buttons' },
            { text: 'Checkbox, Radio, Toggle', link: '/api/toggles' },
            { text: 'Slider, Select, TextInput', link: '/api/inputs' },
            { text: 'ScrollView', link: '/api/scrollview' },
          ]
        },
        {
          text: 'Data Visualization',
          items: [
            { text: 'Sparkline', link: '/api/sparkline' },
            { text: 'Bar Chart', link: '/api/barchart' },
            { text: 'Line Chart', link: '/api/linechart' },
            { text: 'Gauge', link: '/api/gauge' },
            { text: 'Table', link: '/api/table' },
          ]
        },
        {
          text: 'Drawing & Media',
          items: [
            { text: 'Canvas Drawing', link: '/api/canvas' },
            { text: 'Image Element', link: '/api/image' },
            { text: 'Media Streaming', link: '/api/media' },
            { text: 'Camera (CCTV)', link: '/api/camera' },
            { text: 'Sound Playback', link: '/api/sound' },
          ]
        },
        {
          text: 'Layout',
          items: [
            { text: 'Grid Layout', link: '/api/grid' },
            { text: 'Flex Layout', link: '/api/flex' },
            { text: 'Nested Layout', link: '/api/nested-layout' },
          ]
        },
        {
          text: 'Tablet',
          items: [
            { text: 'Target Detection', link: '/api/tablet-target' },
            { text: 'Wireless Networks', link: '/api/tablet-wireless' },
          ]
        },
      ],
      '/examples/': [
        {
          text: 'Examples',
          items: [
            { text: 'Example Gallery', link: '/examples/gallery' },
            { text: 'First UI', link: '/examples/first-ui' },
            { text: 'Live Dashboard', link: '/examples/live-dashboard' },
          ]
        },
      ],
    },

    socialLinks: [
      { icon: 'discord', link: 'https://discord.gg/HxvySSu5G3' },
    ],

    search: {
      provider: 'local'
    },

    editLink: {
      pattern: 'https://github.com/orbitalfoundrymodteam/ScriptedScreensDocs/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },
    footer: {
      message: '⚠️ This documentation was AI-generated and may contain inaccuracies. Please submit pull requests with corrections as needed.',
      copyright: 'Stationeers is developed by Rocketwerkz'
    },

    outline: {
      level: [2, 3]
    },
  },

  markdown: {
    lineNumbers: true
  }
})

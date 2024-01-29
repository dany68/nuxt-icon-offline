# Nuxt 3 + Offline Nuxt-Icon

## Current State:
Basic install of Nuxt 3 with [nuxt-icon](https://github.com/nuxt-modules/icon) package.

Define in ./icons.txt the icons that need to be downloaded offline with the format `<iconSet>:<iconName>`. Each icon must be in a separate line (see the default ./icons.txt file), and run:
```
npm run download-icons
```
The svg icons will be downloaded/sync in ./assets/icons

## Todo
- [ ] Parallel download with `Promise.all`
- [ ] Pull request on nuxt-icon to use SVG file from assets folder (instead of creating a vue component for each icon)
- [ ] Pull request on nuxt-icon to check if icon exists in assets folder before using the Iconify API
- [ ] Detect icons used in /pages and /components instead of using an icons.txt file ?
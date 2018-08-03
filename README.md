# Sync counter - UI
An online synchronous counter using [socket.io](https://socket.io) and [auth0](https://auth0.com).

## Configuration
Rename `src/config.example.js` to `config.js` and set the variables.

## Build
This project has 2 different build modes: `production` and `development`.

### Production
This will build the output files ready for production. These output files van be found in `dist/`. Assets are not handled correctly and should thus be copied over manually from `src/assets/` to `dist/`.

```
npm install
npm run build
```

#### Deloyment
Please check (this)[https://router.vuejs.org/guide/essentials/history-mode.html] document when deploying on a live webserver. Make sure the configuration has been handled otherwise the routing will mess up.

Also set `path` in `src/config.js` to `<path> +  /teller/socket.io'`.

### Development
This will open a local webserver which can be used to interact with the application.

```
npm install
npm run dev
```

## Notes
Might someone in the future atempt to make large changes or rework a part of the application my advise would be to start from scratch using Vue-CLI 3 or whatever version is latest.

# The Panel Class

# The Panel Class

```javascript
const {Panel} = require("@akarui/aoi.panel")

const panel = new Panel({
  //params here...
});
```

## Parameters

| Name | Description | type | required| Example |
| -------- | -------- | -------- | -------- | -------- |
| `port` | Port on which the panel is hosted. | integer | `false`. Default: `3000` | `8000`
| `client` | Your aoi.js or discord.js client. | object | `true` | `bot`

## Functions
1. `loadAPI` : Will load the api of panel. If this function is not called, aoi.panel will not work. Read more about the API [here](https://github.com/AkaruiDevelopment/aoi.panel/tree/v0.0.5/docs/api.md)
2. `loadGUI` : Will load GUI of panel. This is optional and if you want to design your own GUI with the help of [aoi.panel API](https://github.com/AkaruiDevelopment/aoi.panel/tree/v0.0.5/docs/api.md), you do not need to call this function.

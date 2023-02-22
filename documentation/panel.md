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
| `username` | user name for logging into the panel (can be an Array). | String or String array | `true` | `["Leref","Blurr","Ayaka"]` or `"Blurr1447"`
| `password` | password for logging into the panel (can be an Array). | String or String array | `true` | `["HelloHell123","abcd","123"]` or `"HelloHell"`
| `secret` | Session Secret For Express. | String | `true` | `"SomeRandomSessionSecret"`
| `port` | Port on which the panel is hosted. | integer | `false`. Default: `3000` | `8000`
| `bot` | Your aoi.js or discord.js client. | object | `true` | `bot`
| `mainFile` | Name of the main file where the code is running. | string | `true` | `"index.js"`
| `commands` | Commands Folder Where all message commands are handled. | string | `false` | `"./commands/"`|
| `interactions` | Interactitons Folder Where all slash commands are handled. | string | `false` | `"./interactions/"` |
|`version`| Version Of aoi.js: `v5` or `v6` | string | `false`. Default:`v5`| `"v6"` or `"v5"`|
|`type`| Type of panel. aoi.js or discord.js | string | `false`. Default: `aoi.js` | `"djs"` or `"aoi"`|
|`theme`| The colour theme of the panel | string | `false`. Default: `indigo` | All colour themes are listed below. |
|`codetheme`| The code highlighting Scheme of the panel | string | `false`. Default: `night` | All code themes are listed below. |

### Colour Themes
`red`, `pink`, `purple`, `deep-purple`, `indigo` [default], `blue`, `light-blue`, `cyan`, `teal`, `green`, `light-green`, `lime`, `khaki`, `yellow`, `amber`, `orange`, `deep-orange`, `blue-grey`, `brown`, `grey`, `dark-grey` & `black`. 

### Code Themes
The panel uses Codemirror for the code editor. The list of themes CodeMirror supports are listed [here](https://codemirror.net/5/demo/theme.html#default)
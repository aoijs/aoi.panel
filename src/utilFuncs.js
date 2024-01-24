const fetch = require("node-fetch");
const {AoiError} = require("aoi.js");
const json = require("../package.json");
async function checkVersion() {
    try {
        const res = await fetch("https://registry.npmjs.com/@akarui/aoi.panel");
        const data = await res.json();
        const c_version = json.version;

        if (c_version.includes("dev")) {
            AoiError.createCustomBoxedMessage(
                [
                    {
                        text: `You are currently on a development version.`,
                        textColor: "yellow",
                    },
                ],
                "white",
                { text: "AoiWarning", textColor: "yellow" }
            );
            return;
        }

        const l_version = data["dist-tags"].latest;

        if (c_version !== l_version) {
            AoiError.createCustomBoxedMessage(
                [
                    {
                        text: `@akarui/aoi.panel is outdated! Update with "npm install @akarui/aoi.panel@latest".`,
                        textColor: "yellow",
                    },
                ],
                "white",
                { text: "@akarui/aoi.panel", textColor: "cyan" }
            );
        }
    } catch (error) {
        AoiError.createCustomBoxedMessage(
            [
                {
                    text: `Failed to check for updates: ${error.message}`,
                    textColor: "white",
                },
            ],
            "red",
            { text: "@akarui/aoi.panel", textColor: "cyan" }
        );
    }
}

function checkPackage() {
    const c_name = json.name;

    if (c_name !== "@akarui/aoi.panel") {
        AoiError.createCustomBoxedMessage(
            [
                {
                    text: `You are using a modified version of @akarui/aoi.panel. Please install the original version.`,
                    textColor: "white",
                },
            ],
            "red",
            { text: "@akarui/aoi.panel", textColor: "cyan" }
        );
  }
}

module.exports = {
    checkVersion,
    checkPackage
};
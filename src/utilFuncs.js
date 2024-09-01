const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
const { AoiError } = require("aoi.js");
const { version: c_version, name: c_name } = require('../package.json');
const AccountsPermissions = ['Admin', 'Startup', 'Readwrite', 'Shell'];

function checkAccounts(accounts) {
  if (accounts.length === 0) throw new Error('Please provide atleast one account in panel accounts');

  let accountHasPerms = false;
  for (let i = 0; i < accounts.length; i++) {
    const account = accounts[i];
    if (!account.username) throw new Error(`Invalid account username at ${i + 1}`);
    if (!account.password) throw new Error(`Invalid account password at ${i + 1}`);
    checkAccountPerms(account.perms);

    if (
      !accountHasPerms &&
      account.perms.filter(perm =>
        firstUpperCase(perm) === 'Admin' ||
        firstUpperCase(perm) === 'Startup'
      )
    ) accountHasPerms = true;
  };

  if (!accountHasPerms) throw new Error('An account must either have "Admin" permission or atleast "Startup" permission');
};

function checkAccountPerms(perms) {
  if (perms.length === 0) throw new Error('Please provide atleast one perm in account');

  for (let i = 0; i < perms.length; i++) {
    const perm = firstUpperCase(perms[i]);
    if (!AccountsPermissions.includes(perm)) throw new Error('Invalid account permission: ' + perm);
  };
};

function firstUpperCase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

async function checkVersion() {
  if (c_version.includes("dev") === true) return console.log("You are using dev version of aoijs/aoi.panel.");

  const data = await fetch('https://registry.npmjs.com/@akarui/aoi.panel').then(r => r.json());
  const l_version = data["dist-tags"].latest;
  if (c_version === l_version && !(c_version >= l_version)) return;
  console.log("\x1b[33m%s\x1b[0m", "You are not using the latest version of @aoijs/aoi.panel!\nCurrent Version:" + c_version + "\nLatest Version:" + l_version);
};

function checkPackage() {
  if (c_name === "@aoijs/aoi.panel") return;
  console.log("\x1b[33m%s\x1b[0m", "You are not using the official version of @aoijs/aoi.panel! The Developers at aoijs are not responsible for anything going wrong with your bot! Install the official panel using: npm i @aoijs/aoi.panel");
};

function checkAuth(params, req, res, next) {
  const auth = params.auth;
  if (!req.params.auth) return res.status(401).json({ "error": "No auth was provided." });
  if (req.params.auth !== auth) return res.status(401).json({ "error": "Invalid auth key!" });
  if (!data.params.client) return res.status(503).json({ "error": "bot has not yet been initialized!" });

  return next();
};

function getAllDirs(dirPath) {
  try {
    const list = [];
    const files = fs.readdirSync(dirPath, { withFileTypes: true });
    for (const file of files) {
      const fullPath = path.join(dirPath, file.name);
      if (file.isDirectory()) {
        list.push({ path: fullPath, type: 'dir' });
        list.push(...getAllDirs(fullPath));
      } else {
        list.push({ path: fullPath, type: 'file' });
      };
    };

    return list;
  } catch (e) {
    return e;
  };
};

function checkPanel(panel) {
  if (panel.app) return;
  AoiError.createConsoleMessage(
    [], "red", {
      text: "Panel is not yet running! Use loadPanel() to do so",
      textColor: "white"
    }
  );
};

module.exports = {
  AccountsPermissions,
  checkAccounts,
  checkVersion,
  checkPackage,
  checkAuth,
  getAllDirs,
  checkPanel
};
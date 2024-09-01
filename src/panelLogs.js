const fs = require('fs');
const path = require('path');

class PanelLogs {
  constructor(data) {
    this.data = data;
    this.folderPath = path.join(__dirname, '/logs/panel');
    this.filePath = path.join(this.folderPath, 'logs.json');

    const oldFolderPath = path.join(__dirname, '/logs/panelLogs');
    if (fs.existsSync(oldFolderPath)) {
      fs.renameSync(oldFolderPath, this.folderPath);
    } else if (!fs.existsSync(this.folderPath)) {
      fs.mkdirSync(this.folderPath, { recursive: true });
    };
  }

  newLog(data, type, ogcode, code) {
    const logs = JSON.parse(fs.readFileSync(this.filePath));
    const newLog = {
      date: Date.now(),
      data,
      ...(type === 'edit' ? {
        type,
        ogcode,
        code
      } : {})
    };

    logs.push(newLog);
    fs.writeFileSync(this.filePath, JSON.stringify(logs));
  }

  getLogs() {
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify([]));
      return [];
    };

    return JSON.parse(fs.readFileSync(this.filePath));
  }

  resetLogs(username) {
    const newLogs = [{
      date: Date.now(),
      data: `${username} cleared the logs.`
    }];

    fs.writeFileSync(this.filePath, JSON.stringify(newLogs));
  }
};

module.exports = {
  PanelLogs
};
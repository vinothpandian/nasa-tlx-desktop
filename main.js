const electron = require('electron');

const { app, BrowserWindow } = electron;

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    height: 768,
    width: 1366,
    frame: false,
  });

  mainWindow.setFullScreen(true);

  mainWindow.loadURL(`file://${__dirname}/dist/index.html`);
});

/* eslint global-require: 0, flowtype-errors/show-errors: 0 */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import { app, BrowserWindow, ipcMain } from 'electron';
import MenuBuilder from './menu';

const fs = require('fs');
const path = require('path');

const appPath = app.getPath('appData');
const dbPath = path.join(appPath, 'db.json');

console.log(dbPath);

if (!fs.existsSync(dbPath)) {
  fs.closeSync(fs.openSync(dbPath, 'w'));
}

const low = require('lowdb');

const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync(dbPath);
const db = low(adapter);

db.defaults({ experiments: [] }).write();

let mainWindow = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
  require('electron-debug')();
  const path = require('path');
  const p = path.join(__dirname, '..', 'app', 'node_modules');
  require('module').globalPaths.push(p);
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = [
    'REACT_DEVELOPER_TOOLS',
    'REDUX_DEVTOOLS'
  ];

  return Promise
    .all(extensions.map(name => installer.default(installer[name], forceDownload)))
    .catch(console.log);
};


/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', async () => {
  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    show: false,
    minWidth: 1024,
    minHeight: 728,
    width: 1024,
    height: 728
  });

  mainWindow.setMenu(null);

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();
});

/* eslint-disable no-param-reassign */

ipcMain.on('addParticipant', (event, payload) => {
  const data = db
    .get('experiments')
    .filter({
      experimentID: payload.expID,
      participantID: payload.partID
    })
    .first()
    .value();

  if (data === undefined) {
    db
      .get('experiments')
      .push({
        id: payload.id,
        experimentID: payload.expID,
        participantID: payload.partID
      })
      .write();
    event.returnValue = true;
  } else {
    event.returnValue = false;
  }
});

ipcMain.on('addData', (event, payload) => {
  const data = db
    .get('experiments')
    .filter({
      experimentID: payload.experimentID,
      participantID: payload.participantID
    })
    .first()
    .value();

  if (data === undefined) {
    event.returnValue = false;
  } else {
    db
      .get('experiments')
      .find({
        experimentID: payload.experimentID,
        participantID: payload.participantID
      })
      .assign(payload)
      .write();
    event.returnValue = true;
  }
});

ipcMain.on('getData', (event, expID, partID) => {
  const data = db
    .get('experiments')
    .filter({
      experimentID: expID,
      participantID: partID
    })
    .first()
    .value();

  if (data === undefined) {
    event.returnValue = 'No data found';
  } else {
    event.returnValue = data;
  }
});

ipcMain.on('getExperimentList', event => {
  const data = db
    .get('experiments')
    .orderBy('id', 'desc')
    .map('experimentID')
    .uniq()
    .value();

  if (data.length === 0 || !data) {
    event.returnValue = 'No data found';
  } else {
    event.returnValue = data;
  }
});

ipcMain.on('getExperiment', (event, expID) => {
  const data = db
    .get('experiments')
    .filter({ experimentID: expID })
    .value();

  if (data.length === 0 || !data) {
    event.returnValue = 'No data found';
  } else {
    event.returnValue = data;
  }
});

ipcMain.on('backup', (event, expID, fileName) => {
  const data = db
    .get('experiments')
    .filter({ experimentID: expID })
    .value();

  if (data.length === 0 || !data) {
    console.log('no data');
    event.returnValue = false;
  } else {
    const content = JSON.stringify(data, null, 2);

    fs.writeFile(fileName, content, err => {
      if (err) {
        event.returnValue = false;
      }

      event.returnValue = true;
    });
  }
});

ipcMain.on('backupAll', (event, fileName) => {
  const data = db.get('experiments').value();

  if (data.length === 0 || !data) {
    console.log('no data');
    event.returnValue = false;
  } else {
    const content = JSON.stringify(data, null, 2);

    fs.writeFile(fileName, content, err => {
      if (err) {
        event.returnValue = false;
      }

      event.returnValue = true;
    });
  }
});

/* eslint-enable */

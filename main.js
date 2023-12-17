const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');

let win = null;

const flashWindow = () => {
  win.setAlwaysOnTop(true);
  win.show();
  win.setAlwaysOnTop(false);
  app.focus();
};

const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  ipcMain.on('taskFinish', (event, payload) => {
    flashWindow();
  });

  win.loadURL('http://localhost:3000/');
};

app.whenReady().then(createWindow);

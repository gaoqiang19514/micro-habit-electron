const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const path = require('node:path');

let win = null;

const flashWindow = () => {
  win.setAlwaysOnTop(true);
  win.show();
  win.setAlwaysOnTop(false);
  app.focus();
};

const createWindow = () => {
  if (app.isPackaged) {
    Menu.setApplicationMenu(null)
  }
  win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, 'icons/icon.ico'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  ipcMain.on('taskFinish', (event, payload) => {
    flashWindow();
  });

  if (app.isPackaged) {
    win.loadFile('build/index.html');
  } else {
    win.loadURL('http://localhost:3000/');
  }
};

app.whenReady().then(createWindow);

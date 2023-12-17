const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');

let win = null;

console.log('process.env.type', process.env.type)

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
    icon: path.join(__dirname, 'icons/icon.ico'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  ipcMain.on('taskFinish', (event, payload) => {
    flashWindow();
  });

  if (process.env.type === 'dev') {
    win.loadURL('http://localhost:3000/');
  } else {
    win.loadFile('build/index.html');
  }
};

app.whenReady().then(createWindow);

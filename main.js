const { updateElectronApp } = require('update-electron-app');
const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const path = require('node:path');

updateElectronApp({
  repo: 'https://github.com/gaoqiang19514/micro-habit-electron',
});

let win = null;

const flashWindow = () => {
  win.setAlwaysOnTop(true);
  win.show();
  win.setAlwaysOnTop(false);
  app.focus();
};

const createWindow = () => {
  let width = 580;
  let height = 430;
  let url = 'http://localhost:3000/';

  if (app.isPackaged) {
    width = 560;
    height = 400;
    url = 'build/index.html'
    Menu.setApplicationMenu(null)
  }

  win = new BrowserWindow({
    width,
    height,
    icon: path.join(__dirname, 'icons/icon.ico'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  ipcMain.on('taskFinish', (event, payload) => {
    flashWindow();
  });

  win.loadFile(url);
};

app.whenReady().then(createWindow);

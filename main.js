const { app, BrowserWindow } = require('electron');
const path = require('node:path');

let win = null;

const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.loadFile('index.html');
};

app.whenReady().then(createWindow);

// 意图不明
// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });

// 意图不明
// app.whenReady().then(() => {
//   createWindow();

//   app.on('activate', () => {
//     if (BrowserWindow.getAllWindows().length === 0) {
//       createWindow();
//     }
//   });
// });

// Function to make the window flash and stay on top
function flashWindow() {
  win.flashFrame(true); // Flash the window
  win.setAlwaysOnTop(true); // Set the window to always be on top
}

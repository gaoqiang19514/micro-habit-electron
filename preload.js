const { contextBridge, ipcRenderer } = require('electron/renderer');

contextBridge.exposeInMainWorld('electronAPI', {
  taskFinish: (payload) => ipcRenderer.send('taskFinish', payload),
});

const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('nexor', {
  ping: () => ipcRenderer.invoke('ping'),
});
